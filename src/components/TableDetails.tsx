"use strict";

import _ from "underscore";
import React from "react";
import * as projectService from "@/app/service";

export const TableDetails = ({
  model,
  exclude = [],
  extras = [],
}: {
  model: any;
  exclude?: any[];
  extras?: any[];
}) => {
  const extended = getExtendedStats(model.stats);
  const showExtended = _.where(extended, { include: true }).length > 0;

  const get_type = _.property(["metadata", "type"]);
  const rel_type = get_type(model);

  var sources_meta = model.hasOwnProperty("sources")
    ? model.sources[0] != undefined
      ? model.sources[0].source_meta
      : null
    : null;
  const meta = model.meta || sources_meta;

  let details = getBaseStats(model);

  if (extras) {
    var extrasToAdd = _.filter(extras, function (extra) {
      return extra.value !== undefined && extra.value !== null;
    });
    details = details.concat(extrasToAdd);
  }

  function queryTag(tag: string) {
    // TODO
  }

  function hasData(data: any) {
    if (!data || _.isEmpty(data)) {
      return false;
    } else if (data.length == 1 && data[0].include == false) {
      return false;
    }
    return true;
  }

  return (
    <div className="section-content">
      <h6>Details</h6>
      <div className="panel">
        <div className="panel-body">
          <div className="details">
            <div className="details-content">
              {hasData(meta) ? (
                <div className="detail-group">
                  <div className="detail-body">
                    {Object.entries(meta).map(([k, v]) => (
                      <dl className="detail" key={k}>
                        <dt className="detail-label">{k}</dt>
                        <dd className="detail-value">{v as any}</dd>
                      </dl>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="detail-group">
                <div className="detail-body">
                  {model.tags != undefined && exclude.indexOf("tags") == -1 ? (
                    <dl className="detail">
                      <dt className="detail-label">Tags</dt>
                      {model.tags.length > 0 ? (
                        <dd className="detail-value">
                          {model.tags.map((tag: any) => (
                            <span key={tag}>
                              <code>
                                <a>{tag}</a>
                              </code>
                              &nbsp;
                            </span>
                          ))}
                        </dd>
                      ) : null}
                      {model.tags.length == 0 ? (
                        <dd className="detail-value">untagged</dd>
                      ) : null}
                    </dl>
                  ) : null}
                  {details.map((item) => (
                    <dl className="detail" key={item.name}>
                      <dt className="detail-label">{item.name}</dt>
                      <dd className="detail-value">{item.value}</dd>
                    </dl>
                  ))}
                </div>
              </div>
              {hasData(extended) ? (
                <div className="detail-group">
                  <div className="detail-body">
                    {extended.map((item, index) =>
                      item.include ? (
                        <dl className="detail" key={index}>
                          <dt
                            data-toggle="tooltip"
                            title={item.description}
                            className="detail-label"
                          >
                            {item.label}
                          </dt>
                          <dd className="detail-value">{item.value}</dd>
                        </dl>
                      ) : null
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function asBytes(bytes: any, precision: number) {
  if (bytes == 0) {
    return "0 bytes";
  } else if (bytes < 1) {
    // errantly reported in MBs
    bytes = bytes * 1000000;
  }
  if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return "-";
  if (typeof precision === "undefined") precision = 0;
  var units = ["bytes", "KB", "MB", "GB", "TB", "PB"],
    number = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +
    " " +
    units[number]
  );
}

function asPercent(input: any, decimals: number = 2) {
  return round(input * 100, decimals) + "%";
}

function round(value: number, decimals: number) {
  return Number(Math.round((value + "e" + decimals) as any) + "e-" + decimals);
}

function asNumber(input: any, decimals: number = 0) {
  return round(input, decimals);
}

function translateRelationType(type: string) {
  if (type == "BASE TABLE") {
    return { type: "table", name: "table" };
  } else if (type == "LATE BINDING VIEW") {
    return { type: "view", name: "late binding view" };
  } else {
    return { type: type.toLowerCase(), name: type.toLowerCase() };
  }
}

function retrieveOwner(group: any) {
  const { name, email } = projectService.project.groups[group].owner;
  const result = [];
  if (name) result.push(name);
  if (email) {
    const toPush = result.length > 0 ? `<${email}>` : email;
    result.push(toPush);
  }
  return result.join(" ");
}

function getBaseStats(model: any) {
  var is_ephemeral = !model.metadata;
  var metadata = model.metadata || {};

  var database;
  if (!model.database) {
    database = "";
  } else {
    database = model.database + ".";
  }

  var relation;
  if (is_ephemeral) {
    relation = undefined;
  } else if (model.resource_type == "source") {
    relation = database + model.schema + "." + model.identifier;
  } else {
    relation = database + model.schema + "." + model.alias;
  }

  const owner_identifier = model.group
    ? retrieveOwner(`group.${model.package_name}.${model.group}`)
    : metadata.owner;

  var stats = [
    {
      name: "Owner",
      value: owner_identifier,
    },
    {
      name: "Type",
      value: is_ephemeral
        ? undefined
        : translateRelationType(metadata.type).name,
    },
    {
      name: "Package",
      value: model.package_name,
    },
    {
      name: "Language",
      value: model.language,
    },
    {
      name: "Relation",
      value: relation,
    },
    {
      name: "Access",
      value: model.access,
    },
    {
      name: "Version",
      value: model.version,
    },
  ];

  return _.filter(stats, function (s) {
    return s.value !== undefined;
  });
}

function getExtendedStats(stats: any) {
  // TODO : This logic should be pushed into dbt's catalog generation
  var format: any = {
    rows: asNumber, // Redshift
    row_count: asNumber, // Snowflake
    num_rows: asNumber, // BigQuery
    max_varchar: asNumber,
    pct_used: asPercent,
    size: asBytes, // Redshift
    bytes: asBytes, // Snowflake
    num_bytes: asBytes, // BigQuery
  };

  var sorted_stats = _.sortBy(_.values(stats), "label");
  var mapped = _.map(sorted_stats, function (stat) {
    var copy = _.clone(stat);
    var transform = format[stat.id];
    if (transform) {
      copy.value = transform(stat.value);
      copy.label = stat.label.replace("Approximate", "~");
      copy.label = stat.label.replace("Utilization", "Used");
    }
    return copy;
  });

  return mapped;
}
