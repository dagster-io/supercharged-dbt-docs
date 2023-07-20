import "server-only";

import _ from "underscore";
import * as projectService from "@/app/projectService";
import { TableDetails } from "@/components/TableDetails";
import { ColumnDetails } from "@/components/ColumnDetails";
import { ReferenceList } from "@/components/ReferenceList";
import { CodeBlock } from "@/components/CodeBlock";
import { getReferences, getParents } from "@/util/dagUtils";
import { SetActive } from "@/components/SetActive";
import { filterNodes } from "@/util/filterNodes";
import { generateSourceSQL } from "@/util/generateSourceSQL";

export default async function SeedPage({
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

  const versions = {
    "Example SQL": generateSourceSQL(model),
  };

  return (
    <div className="app-scroll">
      <SetActive uniqueId={id} />
      <div className="app-links app-sticky">
        <div className="app-title">
          <div className="app-frame app-pad app-flush-bottom">
            {model.docs.show === false ? (
              <h1>
                <small className="text-bold text-right">
                  <i data-icon="eye"></i>
                  This {model.resource_type} is hidden
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
            {referencesLength ? (
              <li>
                <a href="#referenced_by">Referenced By</a>
              </li>
            ) : null}
            {parentsLength ? (
              <li>
                <a href="#depends_on">Depends On</a>
              </li>
            ) : null}
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
              <ColumnDetails model={model} />
            </div>
          </section>
          {referencesLength ? (
            <section className="section">
              <div className="section-target" id="referenced_by"></div>
              <div className="section-content">
                <h6>Referenced By</h6>
                <ReferenceList references={references} node={model} />
              </div>
            </section>
          ) : null}

          {parentsLength ? (
            <section className="section">
              <div className="section-target" id="depends_on"></div>
              <div className="section-content">
                <h6>Depends On</h6>
                <ReferenceList references={parents} node={model} />
              </div>
            </section>
          ) : null}

          <section className="section">
            <div className="section-target" id="code"></div>
            <div className="section-content">
              <CodeBlock
                versions={versions}
                defaultVersion={"Example SQL"}
                language="sql"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return await filterNodes("seed");
}
