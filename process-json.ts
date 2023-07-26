import { serialize, deserialize } from "@ungap/structured-clone";
import _ from "lodash";
import merge from "deepmerge";
import path from "path";

import rawCatalogData from "./src/dbt-project-data/catalog.json";
import rawManifestData from "./src/dbt-project-data/manifest.json";

import { getQuoteChar } from "./src/app/compat";
import fs from "fs";

const project: any = {
  nodes: {},
};
const tree: any = {
  project: [],
  database: [],
  sources: [],
};
const files: any = {
  manifest: rawManifestData,
  catalog: rawCatalogData,
};

function incorporate_catalog(manifest: any, catalog: any): any {
  // Re-combine sources and nodes
  _.each(catalog.sources, function (source, source_id) {
    catalog.nodes[source_id] = source;
  });

  // later elements are preferred in the merge, but it
  // shouldn't matter, as these two don't clobber each other
  _.each(manifest.nodes, function (node, node_id) {
    const catalog_entry = catalog.nodes[node_id];
    if (!catalog_entry) {
      return;
    }

    const catalog_column_names = _.keys(catalog_entry.columns);
    const manifest_columns = node.columns;

    const new_columns = match_dict_keys(catalog_column_names, manifest_columns);
    node.columns = new_columns;
  });

  return merge(catalog, manifest);
}

function loadProject() {
  // Set node labels
  _.each(files.manifest.nodes, function (node) {
    if (node.resource_type == "model" && node.version != null) {
      node.label = node.name + "_v" + node.version;
    } else {
      node.label = node.name;
    }
  });

  // Add sources back into nodes to make site logic work
  _.each(files.manifest.sources, function (node) {
    node.label = "" + node.source_name + "." + node.name;
    files.manifest.nodes[node.unique_id] = node;
  });

  // Add exposures back into nodes to make site logic work
  _.each(files.manifest.exposures, function (node) {
    // Since label is a new field for exposures we don't want to
    // immediately make docs unusable because the label is empty.
    // This will default the label to be the name when not filled.
    if (!node.label) {
      node.label = node.name;
    }
    files.manifest.nodes[node.unique_id] = node;
  });

  // Add metrics back into nodes to make site logic work
  _.each(files.manifest.metrics, function (node) {
    files.manifest.nodes[node.unique_id] = node;
  });

  const adapter = files.manifest.metadata.adapter_type;
  const macros = clean_project_macros(files.manifest.macros, adapter);
  files.manifest.macros = macros;

  const incorporatedProject = incorporate_catalog(
    files.manifest,
    files.catalog
  );

  const models = incorporatedProject.nodes;
  const model_names = _.keyBy(models, "name");

  const tests = _.filter(incorporatedProject.nodes, {
    resource_type: "test",
  });

  _.each(tests, function (test) {
    if (!test.hasOwnProperty("test_metadata")) {
      return;
    }

    let test_name;
    if (test.test_metadata.namespace) {
      test_name = test.test_metadata.namespace + "." + test.test_metadata.name;
    } else {
      test_name = test.test_metadata.name;
    }

    var test_info: any = {
      test_name: test_name,
    };
    if (test.test_metadata.name == "not_null") {
      test_info.short = "N";
      test_info.label = "Not Null";
    } else if (test.test_metadata.name == "unique") {
      test_info.short = "U";
      test_info.label = "Unique";
    } else if (test.test_metadata.name == "relationships") {
      var rel_model_name = test.refs[0];
      var rel_model = model_names[rel_model_name];
      if (rel_model && test.test_metadata.kwargs.field) {
        // FKs get extra fields
        test_info.fk_field = test.test_metadata.kwargs.field;
        test_info.fk_model = rel_model;
      }

      test_info.short = "F";
      test_info.label = "Foreign Key";
    } else if (test.test_metadata.name == "accepted_values") {
      let values;
      if (Array.isArray(test.test_metadata.kwargs.values)) {
        values = test.test_metadata.kwargs.values.join(", ");
      } else {
        values = JSON.stringify(test.test_metadata.kwargs.values);
      }
      test_info.short = "A";
      test_info.label = "Accepted Values: " + values;
    } else {
      var kwargs = _.omit(test.test_metadata.kwargs, "column_name");
      test_info.short = "+";
      test_info.label = test_name + "(" + JSON.stringify(kwargs) + ")";
    }

    var depends_on = test.depends_on.nodes;
    var test_column =
      test.column_name ||
      test.test_metadata.kwargs.column_name ||
      test.test_metadata.kwargs.arg;
    if (depends_on.length && test_column) {
      let model;
      if (test.test_metadata.name == "relationships") {
        model = depends_on[depends_on.length - 1];
      } else {
        model = depends_on[0];
      }
      var node = incorporatedProject.nodes[model];
      var quote_char = getQuoteChar(incorporatedProject.metadata);
      var column = _.find(node.columns, function (_, col_name) {
        // strip quotes from start and end of test column if present in both locations
        // this is necessary to attach a test to a column when `quote: true` is set for a column
        let test_column_name = test_column;
        if (
          test_column.startsWith(quote_char) &&
          test_column.endsWith(quote_char)
        ) {
          test_column_name = test_column.substring(1, test_column.length - 1);
        }
        return col_name.toLowerCase() == test_column_name.toLowerCase();
      });

      if (column) {
        column.tests = column.tests || [];
        column.tests.push(test_info);
      }
    }
  });

  Object.assign(project, incorporatedProject);

  // performance hack
  var search_macros = _.filter(project.macros, function (macro) {
    return !macro.is_adapter_macro_impl;
  });

  var search_nodes = _.filter(project.nodes, function (node: any) {
    return _.includes(
      ["model", "source", "seed", "snapshot", "analysis", "exposure", "metric"],
      node.resource_type
    );
  });

  project.searchable = _.filter(
    search_nodes.concat(search_macros),
    function (obj) {
      // It should not be possible to search for hidden documentation
      return !obj.docs || obj.docs.show;
    }
  );
}

function match_dict_keys(dest_keys: string[], obj: any) {
  var new_obj: any = {};
  if (obj) {
    _.each(obj, function (value, key) {
      var desired_key = _.find(dest_keys, function (k) {
        return k.toLowerCase() == key.toLowerCase();
      });

      if (!desired_key) {
        new_obj[key] = value;
      } else {
        new_obj[desired_key] = value;
      }
    });
  }

  return new_obj;
}

function clean_project_macros(macros: any, adapter: any) {
  const all_macros = macros || [];

  const package_macros: any = {};
  _.each(all_macros, function (macro) {
    if (!package_macros[macro.package_name]) {
      package_macros[macro.package_name] = {};
    }

    package_macros[macro.package_name][macro.name] = macro;
  });

  let _macros: any = [];
  _.each(package_macros, function (package_macros: any, package_name: any) {
    if (package_name == "dbt" || package_name == "dbt_" + adapter) {
      return;
    }
    var pkg_macros = consolidateAdapterMacros(package_macros, adapter);
    _macros = _macros.concat(pkg_macros);
  });

  return _.keyBy(_macros, "unique_id");
}

function consolidateAdapterMacros(macros: any, adapter: any) {
  const adapter_macros: any = {};
  _.each(macros, function (macro) {
    if (macro.macro_sql.match(/{{\s*adapter_macro\([^)]+\)\s+}}/)) {
      macro.impls = { "Adapter Macro": macro.macro_sql };
      macro.is_adapter_macro = true;
      adapter_macros[macro.name] = macro;
    }
  });

  // ideally we would not need to do this!
  var databases: any = [
    "postgres",
    "redshift",
    "bigquery",
    "snowflake",
    "spark",
    "presto",
    "default",
  ];

  var to_return = _.values(adapter_macros);
  var extras = _.filter(macros, function (macro) {
    var parts = macro.name.split("__");
    var head = parts.shift();

    var macro_name = parts.join("__");
    if (databases.indexOf(head) >= 0 && adapter_macros[macro_name]) {
      adapter_macros[macro_name].impls[head] = macro.macro_sql;
      macro.is_adapter_macro_impl = true;
      return false;
    }
    return true;
  });

  return to_return.concat(extras);
}

loadProject();
Object.values(project.nodes).forEach((node: any) => {
  if (node.columns) {
    Object.values(node.columns).forEach((col: any) => {
      col.display_name = caseColumn(node.name);
    });
  }
});

function caseColumn(col: any) {
  if (
    project.metadata.adapter_type == "snowflake" &&
    col.toUpperCase() == col
  ) {
    return col.toLowerCase();
  } else {
    return col;
  }
}

console.log(__dirname);
fs.writeFileSync(
  path.join(__dirname, "/src/dbt-project-data/processed.json"),
  JSON.stringify(serialize({ project, tree }))
);
