import _ from "underscore";
import * as projectService from "@/app/service";
import { TableDetails } from "@/components/TableDetails";
import { ColumnDetails } from "@/components/ColumnDetails";

interface ModelPageParams {
  id: string;
}

export default async function ModelPage({
  params: { id },
}: {
  params: ModelPageParams;
}) {
  const model = projectService.project.nodes[id];
  // TODO
  const references = {}; //dag_utils.getReferences(projectService, model);
  const referencesLength = Object.keys(references).length;
  // TODO
  const parents = {}; //dag_utils.getParents(projectService, model);
  const parentsLength = Object.keys(parents).length;
  const language = model.language;

  const default_compiled = "\n-- compiled code not found for this model\n";
  const versions = {
    Source: model.raw_code,
    Compiled: model.compiled_code || default_compiled,
  };

  return (
    <>
      <div className="app-scroll">
        <div className="app-links app-sticky">
          <div className="app-title">
            <div className="app-frame app-pad app-flush-bottom">
              {model.docs.show === false ? (
                <h1>
                  <small className="text-bold text-right">
                    <i data-icon="eye"></i>
                    This model is hidden
                  </small>
                </h1>
              ) : null}
              <h1>
                <span className="break">{model.name}</span>
                <small>{model.config.materialized}</small>
              </h1>
            </div>
          </div>
          <div className="app-frame app-pad-h">
            <ul className="nav nav-tabs">
              <li>
                <a href="#details">Details</a>
              </li>
              <li>
                <a href="#description">Description</a>
              </li>
              <li>
                <a href="#columns">Columns</a>
              </li>
              {referencesLength != 0 ? (
                <li>
                  <a href="#referenced_by">Referenced By</a>
                </li>
              ) : null}
              {parentsLength != 0 ? (
                <li>
                  <a href="#depends_on">Depends On</a>
                </li>
              ) : null}
              <li>
                <a href="#code">Code</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="app-details">
          <div className="app-frame app-pad">
            <section className="section">
              <div className="section-target" id="details"></div>
              <TableDetails model={model} />
            </section>

            <section className="section">
              <div className="section-target" id="description"></div>
              <div className="section-content">
                <h6>Description</h6>
                <div className="panel">
                  <div className="panel-body">
                    {model.description ? (
                      <div className="model-markdown">{model.description}</div>
                    ) : (
                      <div>
                        This {model.resource_type} is not currently documented
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="section">
              <div className="section-target" id="columns"></div>
              <div className="section-content">
                <h6>Columns</h6>
                <ColumnDetails />
              </div>
            </section>
            {referencesLength != 0 ? (
              <section className="section">
                <div className="section-target" id="referenced_by"></div>
                <div className="section-content">
                  <h6>Referenced By</h6>
                  {/* <reference-list references="references" node="model" /> */}
                </div>
              </section>
            ) : null}
            {parentsLength != 0 ? (
              <section className="section">
                <div className="section-target" id="depends_on"></div>
                <div className="section-content">
                  <h6>Depends On</h6>
                  {/* <reference-list references="parents" node="model" /> */}
                </div>
              </section>
            ) : null}
            <section className="section">
              <div className="section-target" id="code"></div>
              <div className="section-content">
                {/* <code-block versions="versions" default="default_version" language="language"></code-block> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

function has_test(col: any, test_name: string) {
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
