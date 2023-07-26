import _ from "lodash";
import merge from "deepmerge";
import { Manifest } from "@/schemas/manifest";
import { Catalog } from "@/schemas/catalog";
import { getCatalog, getManifest } from "./data";
import { getQuoteChar } from "./compat";

function capitalizeType(type: any) {
  const staticCapitalizations: any = {
    ml: "ML",
  };
  if (staticCapitalizations.hasOwnProperty(type)) {
    return staticCapitalizations[type];
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export const project: any = {
  nodes: {},
};
export const tree: any = {
  project: [],
  database: [],
  sources: [],
};
export const files = {
  manifest: getManifest(),
  catalog: getCatalog(),
};

export function find_by_id(uid: string, cb: (node: any) => void) {
  if (uid) {
    cb(node(uid));
  }
}

export function node(unique_id: string) {
  return _.find(project.nodes, { unique_id: unique_id });
}

export function match_dict_keys(dest_keys: string[], obj: any) {
  var new_obj: Partial<Record<keyof T, T[keyof T]>> = {};
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

function incorporate_catalog(manifest: Manifest, catalog: Catalog) {
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

export function loadProject() {
  // Set node labels
  _.each(files.manifest.nodes, function (node: any) {
    if (node.resource_type == "model" && node.version != null) {
      node.label = node.name + "_v" + node.version;
    } else {
      node.label = node.name;
    }
  });

  // Add sources back into nodes to make site logic work
  _.each(files.manifest.sources, function (node: any) {
    node.label = "" + node.source_name + "." + node.name;
    files.manifest.nodes[node.unique_id] = node;
  });

  // Add exposures back into nodes to make site logic work
  _.each(files.manifest.exposures, function (node: any) {
    // Since label is a new field for exposures we don't want to
    // immediately make docs unusable because the label is empty.
    // This will default the label to be the name when not filled.
    if (!node.label) {
      node.label = node.name;
    }
    files.manifest.nodes[node.unique_id] = node;
  });

  // Add metrics back into nodes to make site logic work
  _.each(files.manifest.metrics, function (node: any) {
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
  } as any);

  _.each(tests, function (test: any) {
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

  var search_nodes = _.filter(project.nodes, function (node) {
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

function fuzzySearchObj(query: string, obj: any) {
  var objects = [];
  var search_keys: any = {
    name: "string",
    description: "string",
    raw_code: "string",
    columns: "object",
    column_description: "n/a", // special case
    tags: "array",
    arguments: "array",
    label: "string",
  };

  let query_segments = _.words(query.toLowerCase());

  for (const i in search_keys) {
    // column descriptions are a special case because they are not a top-level key
    if (i === "column_description") {
      for (var column_name in obj["columns"]) {
        if (obj["columns"][column_name]["description"] != null) {
          if (
            query_segments.every(
              (segment) =>
                obj["columns"][column_name]["description"]
                  .toLowerCase()
                  .indexOf(segment) != -1
            )
          ) {
            objects.push({ key: i, value: query });
          }
        }
      }
    } else if (!obj[i]) {
      // skip any other cases where the object is missing the key
      continue;
    } else if (
      search_keys[i] === "string" &&
      query_segments.every(
        (segment) => obj[i].toLowerCase().indexOf(segment) != -1
      )
    ) {
      objects.push({ key: i, value: query });
    } else if (search_keys[i] === "object") {
      for (var column_name in obj[i]) {
        // there is a spark bug where columns are missing from the catalog. That needs to be fixed
        // outside of docs but this if != null check will allow docs to continue to function now
        // and also when the bug is fixed.
        // relevant issue: https://github.com/dbt-labs/dbt-spark/issues/295
        if (obj[i][column_name]["name"] != null) {
          if (
            query_segments.every(
              (segment) =>
                obj[i][column_name]["name"].toLowerCase().indexOf(segment) != -1
            )
          ) {
            objects.push({ key: i, value: query });
          }
        }
      }
    } else if (search_keys[i] === "array") {
      for (var tag of obj[i]) {
        if (
          query_segments.every(
            (segment) =>
              JSON.stringify(tag).toLowerCase().indexOf(segment) != -1
          )
        ) {
          objects.push({ key: i, value: query });
        }
      }
    }
  }

  return objects;
}

export function search(q: string) {
  if (q.length == 0) {
    return _.map(project.searchable, function (model) {
      return {
        model: model,
        matches: [],
      };
    });
  }

  const res: any[] = [];
  _.each(project.searchable, function (model) {
    var matches = fuzzySearchObj(q, model);
    if (matches.length) {
      res.push({
        model: model,
        matches: matches,
      });
    }
  });
  return res;
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

  let _macros: any[] = [];
  _.each(package_macros, function (package_macros, package_name) {
    if (package_name == "dbt" || package_name == "dbt_" + adapter) {
      return;
    }
    var pkg_macros = consolidateAdapterMacros(package_macros, adapter);
    _macros = _macros.concat(pkg_macros);
  });

  return _.keyBy(_macros, "unique_id");
}

export function getModelTree(select: any, cb: (model: any) => void) {
  var macros = _.values(project.macros);
  var nodes = _.filter(project.nodes, function (node) {
    // only grab custom singular tests
    if (node.resource_type == "test" && !node.hasOwnProperty("test_metadata")) {
      return true;
    }

    var accepted = [
      "snapshot",
      "source",
      "seed",
      "model",
      "analysis",
      "exposure",
      "metric",
    ];
    return _.includes(accepted, node.resource_type);
  });

  tree.database = buildDatabaseTree(nodes, select);
  tree.groups = buildGroupTree(nodes, select);
  tree.project = buildProjectTree(nodes, macros, select);

  var sources = _.values(project.sources);
  tree.sources = buildSourceTree(sources, select);

  var exposures = _.values(project.exposures);
  tree.exposures = buildExposureTree(exposures, select);

  var metrics = _.values(project.metrics);
  tree.metrics = buildMetricTree(metrics, select);

  cb(tree);
}

export function updateSelectedInTree(select: any, subtrees: any) {
  var is_active = false;
  _.each(subtrees, function (subtree) {
    if (subtree.node && subtree.node.unique_id == select) {
      subtree.active = true;
      is_active = true;
    } else if (subtree.node && subtree.node.unique_id != select) {
      subtree.active = false;
    } else {
      var child_active = updateSelectedInTree(select, subtree.items);
      if (child_active) {
        subtree.active = true;
        is_active = true;
      }
    }
  });
  return is_active;
}

export function updateSelected(select: any) {
  updateSelectedInTree(select, tree.project);
  updateSelectedInTree(select, tree.database);
  updateSelectedInTree(select, tree.groups);
  updateSelectedInTree(select, tree.sources);
  updateSelectedInTree(select, tree.exposures);
  updateSelectedInTree(select, tree.metrics);

  return tree;
}

function recursiveFlattenItems(tree: any) {
  const res: any[] = [];

  var subtrees = _.values(tree);
  _.each(subtrees, function (subtree) {
    if (subtree.items) {
      var flattened = recursiveFlattenItems(subtree.items);
      var sorted = _.sortBy(flattened, "name");
      subtree.items = sorted;
    }
    res.push(subtree);
  });

  return res;
}

function buildSourceTree(nodes: any, select: any) {
  let sources: any = {};

  _.each(nodes, function (node) {
    var source = node.source_name;
    var name = node.name;
    var is_active = node.unique_id == select;

    if (!sources[source]) {
      sources[source] = {
        type: "folder",
        name: source,
        active: is_active,
        items: [],
      };
    } else if (is_active) {
      sources[source].active = true;
    }

    sources[source].items.push({
      type: "file",
      name: name,
      node: node,
      active: is_active,
      unique_id: node.unique_id,
      node_type: "source",
    });
  });

  // sort schemas
  sources = _.sortBy(_.values(sources), "name");

  // sort tables in the schema
  _.each(sources, function (source) {
    source.items = _.sortBy(source.items, "name");
  });

  return sources;
}

function buildExposureTree(nodes: any, select: any) {
  let exposures: any = {};

  _.each(nodes, function (node) {
    var name = node.name;

    var type = node.type || "Uncategorized";
    type = capitalizeType(type);

    var is_active = node.unique_id == select;

    if (!exposures[type]) {
      exposures[type] = {
        type: "folder",
        name: type,
        active: is_active,
        items: [],
      };
    } else if (is_active) {
      exposures[type].active = true;
    }

    exposures[type].items.push({
      type: "file",
      name: node.label,
      node: node,
      active: is_active,
      unique_id: node.unique_id,
      node_type: "exposure",
    });
  });

  // sort exposure types
  exposures = _.sortBy(_.values(exposures), "name");

  // sort entries in the exposure folder
  _.each(exposures, function (exposure) {
    exposure.items = _.sortBy(exposure.items, "name");
  });

  return exposures;
}

function buildMetricTree(nodes: any, select: any) {
  let metrics: any = {};

  _.each(nodes, function (node) {
    const project = node.package_name;
    const is_active = node.unique_id == select;

    if (!metrics[project]) {
      metrics[project] = {
        type: "folder",
        name: project,
        active: is_active,
        items: [],
      };
    } else if (is_active) {
      metrics[project].active = true;
    }

    metrics[project].items.push({
      type: "file",
      name: node.label,
      node: node,
      active: is_active,
      unique_id: node.unique_id,
      node_type: "metric",
    });
  });

  metrics = _.sortBy(_.values(metrics), "name");

  _.each(metrics, function (metric) {
    metrics.items = _.sortBy(metrics.items, "name");
  });

  return metrics;
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
  var databases = [
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

function buildProjectTree(nodes: any, macros: any, select: any) {
  var tree = {};

  var nodes = nodes || [];
  var macros = macros || [];

  _.each(nodes.concat(macros), function (node) {
    var show = _.get(node, ["docs", "show"], true);
    if (
      node.resource_type == "source" ||
      node.resource_type == "exposure" ||
      node.resource_type == "metric"
    ) {
      // no sources in the model tree, sorry
      return;
    } else if (!show) {
      return;
    }

    if (node.original_file_path.indexOf("\\") != -1) {
      var path_parts = node.original_file_path.split("\\");
    } else {
      var path_parts = node.original_file_path.split("/");
    }

    var path = [node.package_name].concat(path_parts);
    var is_active = node.unique_id == select;

    var dirpath = _.initial(path);

    if (node.resource_type == "macro") {
      var fname = node.name;
    } else {
      var fname = _.last(path);
    }

    let display_name;
    if (node.resource_type == "model" && node.version != null) {
      display_name = node.name + "_v" + node.version;
    } else {
      display_name = node.name;
    }

    let cur_dir: any = tree;
    _.each(dirpath, function (dir) {
      if (!cur_dir[dir]) {
        cur_dir[dir] = {
          type: "folder",
          name: dir,
          active: is_active,
          items: {},
        };
      } else if (is_active) {
        cur_dir[dir].active = true;
      }
      cur_dir = cur_dir[dir].items;
    });
    cur_dir[fname] = {
      type: "file",
      name: display_name,
      node: node,
      active: is_active,
      unique_id: node.unique_id,
      node_type: node.resource_type,
    };
  });

  var flat = recursiveFlattenItems(tree);
  return flat;
}

function buildDatabaseTree(nodes: any, select: any) {
  const databases: any = {};
  const tree_nodes = _.filter(nodes, function (node) {
    const show = _.get(node, ["docs", "show"], true);
    if (!show) {
      return false;
    } else if (
      _.indexOf(["source", "snapshot", "seed"], node.resource_type) != -1
    ) {
      return true;
    } else if (node.resource_type == "model") {
      return node.config.materialized != "ephemeral";
    }
  });

  const tree_nodes_sorted = _.sortBy(tree_nodes, function (node) {
    return (
      node.database +
      "." +
      node.schema +
      "." +
      (node.identifier || node.alias || node.name)
    );
  });

  const by_database = _.groupBy(tree_nodes_sorted, "database");
  _.each(by_database, function (db_nodes, db) {
    const database: any = {
      type: "database",
      name: db,
      active: false,
      items: [],
    };
    databases[db] = database;

    var by_schema = _.groupBy(db_nodes, "schema");
    _.each(by_schema, function (schema_nodes, schemaName) {
      const schema: any = {
        type: "schema",
        name: schemaName,
        active: false,
        items: [],
      };

      database.items.push(schema);

      _.each(schema_nodes, function (node) {
        var is_active = node.unique_id == select;
        if (is_active) {
          database.active = true;
          schema.active = true;
        }
        schema.items.push({
          type: "table",
          name: node.identifier || node.alias || node.name,
          node: node,
          active: is_active,
          unique_id: node.unique_id,
          node_type: "model",
        });
      });
    });
  });

  return databases;
}

function buildGroupTree(nodes: any, select: any) {
  let groups: any = {};

  _.each(nodes, function (node) {
    const show = _.get(node, ["docs", "show"], true);
    const excludeNodes = ["source", "exposure", "seed", "macro"];
    if (
      node.resource_type in excludeNodes ||
      !show ||
      node.access === "private"
    ) {
      return;
    }

    let display_name;
    if (node.resource_type == "model" && node.version != null) {
      display_name = node.name + "_v" + node.version;
    } else {
      display_name = node.name;
    }

    const name =
      node.access === "protected"
        ? `${display_name} (protected)`
        : display_name;

    var group = node.group;

    var is_active = node.unique_id == select;

    if (!groups[group]) {
      groups[group] = {
        type: "group",
        name: group,
        active: is_active,
        items: [],
      };
    } else if (is_active) {
      groups[group].active = true;
    }

    groups[group].items.push({
      type: "file",
      name: name,
      node: node,
      active: is_active,
      unique_id: node.unique_id,
      node_type: "model",
    });
  });

  groups = _.sortBy(_.values(groups), "name");

  _.each(groups, function (group) {
    group.items = _.sortBy(group.items, "name");
  });

  return groups;
}

export function caseColumn(col: any) {
  if (
    project.metadata.adapter_type == "snowflake" &&
    col.toUpperCase() == col
  ) {
    return col.toLowerCase();
  } else {
    return col;
  }
}

loadProject();
