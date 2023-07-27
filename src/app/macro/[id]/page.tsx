import _ from "underscore";
import * as projectService from "@/app/projectService";
import { ReferenceList } from "@/components/ReferenceList";
import { CodeBlock } from "@/components/CodeBlock";
import { getReferences, getParents } from "@/util/dagUtils";
import React from "react";
import { MacroArguments } from "@/components/MacroArguments";

export default async function MacroPage({
  params: { id },
}: {
  params: { id: string };
}) {
  await projectService.loadProject();
  const macro = projectService.project.macros[id];
  const references = getReferences(projectService.project, macro);
  const referencesLength = Object.keys(references).length;
  const parents = getParents(projectService.project, macro);
  const parentsLength = Object.keys(parents).length;
  let versions;
  let defaultVersion;
  // adapter macros
  if (macro.is_adapter_macro) {
    const adapter = projectService.project.metadata.adapter_type;
    versions = macro.impls;
    if (macro.impls[adapter]) {
      defaultVersion = adapter;
    } else if (macro.impls["default"]) {
      defaultVersion = "default";
    } else {
      defaultVersion = _.keys(macro.impls)[0];
    }
  } else {
    defaultVersion = "Source";
    versions = { Source: macro.macro_sql };
  }

  return (
    <div className="app-scroll">
      <div className="app-links app-sticky">
        <div className="app-title">
          <div className="app-frame app-pad app-flush-bottom">
            <h1>
              <span className="break">
                {macro.package_name}.{macro.name}
              </span>
              {macro.is_adapter_macro ? (
                <small>adapter macro</small>
              ) : (
                <small>macro</small>
              )}
            </h1>
          </div>
        </div>
        <div className="app-frame app-pad-h">
          <ul className="nav nav-tabs">
            <li>
              <a href="#description">Description</a>
            </li>
            <li>
              <a href="#arguments">Arguments</a>
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
              <a href="#code">Code</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="app-details">
        <div className="app-frame app-pad">
          <section className="section">
            <div className="section-target" id="description"></div>
            <div className="section-content">
              <h6>Description</h6>
              <div className="panel">
                <div className="panel-body">
                  {macro.description ? (
                    <div className="model-markdown">{macro.description}</div>
                  ) : (
                    <div>
                      This {macro.resource_type} is not currently documented
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-target" id="arguments"></div>
            <div className="section-content">
              <h6>Arguments</h6>
              <MacroArguments macro={macro} />
            </div>
          </section>

          {referencesLength ? (
            <section className="section">
              <div className="section-target" id="referenced_by"></div>
              <div className="section-content">
                <h6>Referenced By</h6>
                <ReferenceList references={references} node={macro} />
              </div>
            </section>
          ) : null}
          {parentsLength ? (
            <section className="section">
              <div className="section-target" id="depends_on"></div>
              <div className="section-content">
                <h6>Depends On</h6>
                <ReferenceList references={parents} node={macro} />
              </div>
            </section>
          ) : null}

          <section className="section">
            <div className="section-target" id="code"></div>
            <div className="section-content">
              <CodeBlock
                versions={versions}
                defaultVersion={defaultVersion}
                language={macro.language}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
