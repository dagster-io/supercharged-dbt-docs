import React from "react";
import _ from "underscore";

export const ReferenceList = ({
  references,
  node,
}: {
  references: any;
  node: any;
}) => {
  let selected_type;
  let has_references = false;
  let nodes;

  if (node && _.size(node) > 0) {
    selected_type = _.keys(node)[0];
    has_references = true;
    nodes = references[selected_type];
  } else {
    has_references = false;
  }
  return (
    <div className="panel">
      {!has_references ? (
        <div className="panel-body">
          No resources reference this {node.resource_type}
        </div>
      ) : (
        <div className="panel-body">
          <ul className="nav nav-tabs">
            <li
              ng-repeat="(resource_type, nodes) in references"
              ng-class="{active: resource_type == selected_type}"
            >
              <a ng-click="setType(resource_type)">
                {mapResourceType(node.resource_type)}
              </a>
            </li>
          </ul>
          <div style={{ marginTop: "15px" }}>
            <ul className="list-unstyled">
              {nodes.map((node: any, index: number) => (
                <li key={index}>
                  <a ng-href="{{ getNodeUrl(node) }}">{node.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

function mapResourceType(type: string) {
  if (type == "model") {
    return "Models";
  } else if (type == "seed") {
    return "Seeds";
  } else if (type == "test") {
    return "Tests";
  } else if (type == "snapshot") {
    return "Snapshots";
  } else if (type == "analysis") {
    return "Analyses";
  } else if (type == "macro") {
    return "Macros";
  } else if (type == "exposure") {
    return "Exposures";
  } else if (type == "metric") {
    return "Metrics";
  } else if (type == "operation") {
    return "Operations";
  } else {
    return "Nodes";
  }
}
