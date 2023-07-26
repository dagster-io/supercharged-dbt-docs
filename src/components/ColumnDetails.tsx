import React from "react";
import _ from "underscore";

import * as projectService from "@/app/service";

export const ColumnDetails = ({ model }: { model: any }) => {
  function has_test(col: any, test_name: any) {
    var test_types = _.pluck(col.tests, "short");
    return test_types.indexOf(test_name) != -1;
  }

  function has_more_info(column: any) {
    var tests = column.tests || [];
    var description = column.description || "";
    var meta = column.meta || {};

    return tests.length || description.length || !_.isEmpty(meta);
  }

  function toggle_column_expanded(column: any) {
    if (has_more_info(column)) {
      column.expanded = !column.expanded;
    }
  }

  function getState(node: any) {
    return "dbt." + node.resource_type;
  }

  function get_col_name(col_name: string) {
    return projectService.caseColumn(col_name);
  }

  function get_columns(model: any) {
    var columns = _.chain(model.columns).values().sortBy("index").value();

    // re-number columns because index comes from the catalog, and index may not always be present
    // this prevents errors with the view's `track by column.index`
    _.each(columns, function (col, i) {
      col.index = i;
    });

    return columns;
  }

  return (
    <div className="panel">
      <div className="panel-body">
        <div ng-if="_.isEmpty(model.columns)">
          Column information is not available for this seed
        </div>
        <div
          className="table-responsive"
          style={{ maxHeight: "800px", overflowY: "scroll" }}
          ng-if="!_.isEmpty(model.columns)"
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
              {get_columns(model).map((column, index) => (
                <React.Fragment key={index}>
                  <tr
                    ng-click="toggle_column_expanded(column)"
                    className={`column-row ${
                      column.expanded ? "column-row-selected" : ""
                    }`}
                    style={{
                      cursor: has_more_info(column) ? "pointer" : "auto",
                    }}
                  >
                    <td>
                      <div>
                        <span className="text-dark">
                          {get_col_name(column.name)}
                        </span>
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
                      <span ng-show="!column.expanded">
                        {column.description}
                      </span>
                    </td>
                    <td>
                      <span className="text-light" ng-show="!column.expanded">
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
                    </td>
                    <td className="text-center">
                      <span
                        className="text-light"
                        ng-show="has_more_info(column)"
                      >
                        <span ng-if="column.expanded">
                          <svg className="icn">
                            <use xlinkHref="#icn-up"></use>
                          </svg>
                        </span>
                        <span ng-if="!column.expanded">
                          <svg className="icn">
                            <use xlinkHref="#icn-right"></use>
                          </svg>
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr
                    ng-repeat-end
                    ng-show="column.expanded"
                    style={{ backgroundColor: "white", padding: "10px" }}
                  >
                    <td colSpan={5} className="column-expanded">
                      <div style={{ padding: "5px 20px" }}>
                        {column.meta ? (
                          <div>
                            <h5>Details</h5>
                            <div
                              className="detail-group"
                              style={{ paddingBottom: "0" }}
                            >
                              <div
                                className="detail-body"
                                style={{ paddingLeft: "0" }}
                              >
                                {Object.entries(column.meta).map(
                                  ([k, v], index) => (
                                    <dl
                                      key={index}
                                      className="detail"
                                      style={{
                                        paddingLeft: index == 0 ? 0 : "auto",
                                      }}
                                    >
                                      <dt className="detail-label">{k}</dt>
                                      <dd className="detail-value">
                                        {v as any}
                                      </dd>
                                    </dl>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {column.description?.length ? (
                          <div style={{ marginBottom: "15px" }}>
                            <h5>Description</h5>
                            <span>{column.description}</span>
                          </div>
                        ) : null}
                        {column.tests && column.tests.length ? (
                          <div style={{ marginBottom: "15px" }}>
                            <h5>Generic Tests</h5>
                            <ul
                              className="list-unstyled"
                              style={{ marginTop: "2px" }}
                            >
                              {column.tests?.map((test: any, index: number) => (
                                <li
                                  key={index}
                                  ng-switch
                                  // on="test.short"
                                  className="text-light"
                                >
                                  <span ng-switch-when="F">
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
                                  <span ng-switch-when="P">Primary Key</span>
                                  <span ng-switch-when="U">Unique</span>
                                  <span ng-switch-when="N">Not Null</span>
                                  <span ng-switch-default>{test.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
