"use client";
import React from "react";
import _ from "underscore";
import { MarkdownBlock } from "./MarkdownBlock";

export const ColumnDetailsClient = ({ model }: { model: any }) => {
  function get_columns(model: any) {
    var columns = _.chain(model.columns).values().sortBy("index").value();

    // re-number columns because index comes from the catalog, and index may not always be present
    // this prevents errors with the view's `track by column.index`
    _.each(columns, function (col: any, i: number) {
      col.index = i;
    });

    return columns;
  }

  return (
    <div className="panel">
      <div className="panel-body">
        {_.isEmpty(model.columns) ? (
          <div>Column information is not available for this seed</div>
        ) : (
          <div
            className="table-responsive"
            style={{ maxHeight: "800px", overflowY: "scroll" }}
          >
            <table className="table table-borderless table-hover">
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Column
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                      width: "1px",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Tests
                  </th>
                  <th
                    style={{
                      backgroundColor: "white",
                      width: "1px",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                    className="text-center"
                  >
                    More?
                  </th>
                </tr>
              </thead>
              <tbody>
                {get_columns(model).map((column: any, index: number) => (
                  <ColumnRow column={column} key={index} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

function ColumnRow({ column }: { column: any }) {
  const [expanded, setExpanded] = React.useState(false);
  function has_test(col: any, test_name: any) {
    var test_types = _.pluck(col.tests, "short");
    return test_types.indexOf(test_name) != -1;
  }
  function has_more_info(column: any) {
    var tests = column.tests || [];
    var description = column.description || "";
    var meta = column.meta || {};

    return tests.length || description.length || Object.keys(meta).length;
  }
  return (
    <>
      <tr
        onClick={() => {
          setExpanded(true);
        }}
        className={`column-row ${expanded ? "column-row-selected" : ""}`}
        style={{
          cursor: has_more_info(column) ? "pointer" : "auto",
        }}
      >
        <td>
          <div>
            <span className="text-dark">{column.display_name}</span>
          </div>
        </td>
        <td>
          <span className="text-dark">{column.type}</span>
        </td>
        <td
          style={{
            textOverflow: "ellipsis",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "1px",
          }}
        >
          {!expanded ? <span>{column.description}</span> : null}
        </td>
        <td>
          {!expanded ? (
            <span className="text-light">
              {has_test(column, "U") ? (
                <span data-toggle="tooltip" title="Unique">
                  U
                </span>
              ) : null}
              {has_test(column, "N") ? (
                <span data-toggle="tooltip" title="Not Null">
                  N
                </span>
              ) : null}
              {has_test(column, "F") ? (
                <span data-toggle="tooltip" title="Foreign Key">
                  F
                </span>
              ) : null}
              {has_test(column, "A") ? (
                <span data-toggle="tooltip" title="Accepted Values">
                  A
                </span>
              ) : null}
              {has_test(column, "+") ? (
                <span data-toggle="tooltip" title="Custom Test">
                  +
                </span>
              ) : null}
            </span>
          ) : null}
        </td>
        <td className="text-center">
          {has_more_info(column) ? (
            <span className="text-light">
              {expanded ? (
                <span>
                  <svg className="icn">
                    <use xlinkHref="#icn-up"></use>
                  </svg>
                </span>
              ) : (
                <span>
                  <svg className="icn">
                    <use xlinkHref="#icn-right"></use>
                  </svg>
                </span>
              )}
            </span>
          ) : null}
        </td>
      </tr>
      {expanded ? (
        <tr style={{ backgroundColor: "white", padding: "10px" }}>
          <td colSpan={5} className="column-expanded">
            <div style={{ padding: "5px 20px" }}>
              {_.size(column.meta) > 0 ? (
                <div>
                  <h5>Details</h5>
                  <div className="detail-group" style={{ paddingBottom: "0" }}>
                    <div className="detail-body" style={{ paddingLeft: "0" }}>
                      {Object.entries(column.meta).map(([k, v], index) => (
                        <dl
                          key={index}
                          className="detail"
                          style={{
                            paddingLeft: index == 0 ? 0 : "auto",
                          }}
                        >
                          <dt className="detail-label">{k}</dt>
                          <dd className="detail-value">{v as any}</dd>
                        </dl>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
              {column.description?.length ? (
                <div style={{ marginBottom: "15px" }}>
                  <h5>Description</h5>
                  <span>
                    <MarkdownBlock markdown={column.description} />
                  </span>
                </div>
              ) : null}
              {column.tests && column.tests.length ? (
                <div style={{ marginBottom: "15px" }}>
                  <h5>Generic Tests</h5>
                  <ul className="list-unstyled" style={{ marginTop: "2px" }}>
                    {column.tests?.map((test: any, index: number) => (
                      <li key={index} className="text-light">
                        {(() => {
                          switch (test.short) {
                            case "F": {
                              return (
                                <span>
                                  Foreign Key
                                  {test.fk_model?.uniqueId ? (
                                    <span>
                                      <a
                                        data-ui-state="getState(test.fk_model)"
                                        data-ui-state-params="{unique_id: test.fk_model.unique_id}"
                                      >
                                        to {test.fk_model.name}
                                      </a>{" "}
                                      on <code>{test.fk_field}</code>
                                    </span>
                                  ) : null}
                                </span>
                              );
                            }
                            case "P": {
                              return <span>Primary Key</span>;
                            }
                            case "U": {
                              return <span>Unique</span>;
                            }
                            case "N": {
                              return <span>Not Null</span>;
                            }
                            default: {
                              return <span>{test.label}</span>;
                            }
                          }
                        })()}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
