import _ from "underscore";
import * as projectService from "@/app/projectService";
import { TableDetails } from "@/components/TableDetails";
import { ColumnDetails } from "@/components/ColumnDetails";
import { ReferenceList } from "@/components/ReferenceList";
import { CodeBlock } from "@/components/CodeBlock";
import { getReferences, getParents } from "@/util/dagUtils";
import React from "react";

export default async function SourcePage({
  params: { id },
}: {
  params: { id: string };
}) {
  await projectService.loadProject();
  const model = projectService.project.nodes[id];
  const references = getReferences(projectService.project, model);
  const referencesLength = Object.keys(references).length;
  const parents = getParents(projectService.project, model);
  const parentsLength = Object.keys(parents).length;
  const language = model.language;

  const versions = {
    "Sample SQL": "TODO", // TODO: codeService.generateSourceSQL($scope.model)
  };

  const extra_table_fields = [
    {
      name: "Loader",
      value: model.loader,
    },
    {
      name: "Source",
      value: model.source_name,
    },
  ];

  return (
    <div className="app-scroll">
      <div className="app-links app-sticky">
        <div className="app-title">
          <div className="app-frame app-pad app-flush-bottom">
            <h1>
              <span className="break">
                {model.source_name}.{model.name}
              </span>
              <small>source table</small>
            </h1>
          </div>
        </div>
        <div className="app-frame app-pad-h">
          <ul className="nav nav-tabs">
            {/* Todo make nav links active or not */}
            <li>
              <a href="#details">Details</a>
            </li>
            <li>
              <a href="#description">Description</a>
            </li>
            <li>
              <a href="#columns">Columns</a>
            </li>
            <li ng-show="referencesLength != 0">
              <a href="#referenced_by">Referenced By</a>
            </li>
            <li>
              <a href="#code">SQL</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="app-details">
        <div className="app-frame app-pad">
          <section className="section">
            <div className="section-target" id="details"></div>
            <TableDetails model={model} extras={extra_table_fields} />
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
                    <div ng-if="!model.description">
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
              <ColumnDetails model={model} />
            </div>
          </section>

          <section className="section" ng-show="referencesLength != 0">
            <div className="section-target" id="referenced_by"></div>
            <div className="section-content">
              <h6>Referenced By</h6>
              <ReferenceList references={references} node={model} />
            </div>
          </section>

          <section className="section">
            <div className="section-target" id="code"></div>
            <div className="section-content">
              <CodeBlock
                versions={versions}
                defaultVersion={"Sample SQL"}
                language={language}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
