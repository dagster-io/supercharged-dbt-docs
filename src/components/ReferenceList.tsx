"use client";

import React from "react";
import _ from "underscore";
import Link from "next/link";

export const ReferenceList = ({
  references,
  node,
}: {
  references: any;
  node?: any;
}) => {
  const hasReferences = references && _.size(references) > 0;
  const [selectedType, setSelectedType] = React.useState(() => {
    if (hasReferences) {
      return _.keys(references)[0];
    }
    return null;
  });
  const nodes = selectedType ? references[selectedType] : [];

  return (
    <div className="panel">
      {!hasReferences ? (
        <div className="panel-body">
          No resources reference this {node.resource_type}
        </div>
      ) : (
        <div className="panel-body">
          <ul className="nav nav-tabs">
            {Object.keys(references).map((resource_type) => (
              <li
                key={resource_type}
                className={resource_type === selectedType ? "active" : ""}
              >
                <a
                  onClick={() => {
                    setSelectedType(resource_type);
                  }}
                >
                  {mapResourceType(resource_type)}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "15px" }}>
            <ul className="list-unstyled">
              {nodes.map((node: any, index: number) => (
                <li key={index}>
                  <Link href={getNodeUrl(node)}>{node.name}</Link>
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

function getNodeUrl(node: any) {
  return "/" + node.resource_type + "/" + node.unique_id;
}
