import { getShortID } from "./nodeUrl";

const _ = require("underscore");

export function getReferences(project: any, model: any) {
  let references = _.filter(project.nodes, function (node: any) {
    if (
      node.depends_on &&
      node.depends_on.nodes &&
      node.depends_on.nodes.length
    ) {
      if (_.contains(mapToShortIds(node.depends_on.nodes), model.unique_id)) {
        return true;
      }
    }
    return false;
  });

  return _.groupBy(references, "resource_type");
}

export function getParents(project: any, model: any) {
  let parents = _.filter(project.nodes, function (node: any) {
    if (
      model.depends_on &&
      model.depends_on.nodes &&
      model.depends_on.nodes.length
    ) {
      if (_.contains(mapToShortIds(model.depends_on.nodes), node.unique_id)) {
        return true;
      }
    }
    return false;
  });

  let macroParents = _.filter(project.macros, function (macro: any) {
    if (
      model.depends_on &&
      model.depends_on.macros &&
      model.depends_on.macros.length
    ) {
      if (_.contains(mapToShortIds(model.depends_on.macros), macro.unique_id)) {
        return true;
      }
    }
    return false;
  });

  return _.groupBy(parents.concat(macroParents), "resource_type");
}

export function getMacroReferences(project: any, self: any) {
  let references = _.filter(project.nodes, function (node: any) {
    if (
      node.depends_on &&
      node.depends_on.macros &&
      node.depends_on.macros.length
    ) {
      if (_.contains(mapToShortIds(node.depends_on.macros), self.unique_id)) {
        return true;
      }
    }
    return false;
  });

  let macroReferences = _.filter(project.macros, function (macro: any) {
    if (
      macro.depends_on &&
      macro.depends_on.macros &&
      macro.depends_on.macros.length
    ) {
      if (_.contains(mapToShortIds(macro.depends_on.macros), self.unique_id)) {
        return true;
      }
    }
    return false;
  });

  return _.groupBy(references.concat(macroReferences), "resource_type");
}

export function getMacroParents(project: any, self: any) {
  let macroParents = _.filter(project.macros, function (macro: any) {
    if (
      self.depends_on &&
      self.depends_on.macros &&
      self.depends_on.macros.length
    ) {
      if (_.contains(mapToShortIds(self.depends_on.macros), macro.unique_id)) {
        return true;
      }
    }
    return false;
  });

  return _.groupBy(macroParents, "resource_type");
}

function mapToShortIds(arr: string[]) {
  return arr.map((id) => getShortID(id));
}
