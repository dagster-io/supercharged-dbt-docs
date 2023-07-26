import { deserialize } from "@ungap/structured-clone";
import _ from "lodash";

import processedJSON from "@/dbt-project-data/processed.json";

export const { project, tree } = deserialize(processedJSON as any);

function capitalizeType(type: any) {
  const staticCapitalizations: any = {
    ml: "ML",
  };
  if (staticCapitalizations.hasOwnProperty(type)) {
    return staticCapitalizations[type];
  }
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function find_by_id(uid: string, cb: (node: any) => void) {
  if (uid) {
    cb(node(uid));
  }
}

export function node(unique_id: string) {
  return _.find(project.nodes, { unique_id: unique_id });
}

export function match_dict_keys(dest_keys: string[], obj: any) {
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
