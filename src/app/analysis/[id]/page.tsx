import _ from "underscore";
import * as projectService from "@/app/projectService";
import { ReferenceList } from "@/components/ReferenceList";
import { CodeBlock } from "@/components/CodeBlock";
import { getParents } from "@/util/dagUtils";

export default async function Analysispage({
  params: { id },
}: {
  params: { id: string };
}) {
  await projectService.loadProject();
  const model = projectService.project.nodes[id];
  const parents = getParents(projectService.project, model);
  const parentsLength = Object.keys(parents).length;
  const language = model.language;

  const versions = {
    Source: model.raw_code,
    Compiled: model.compiled_code,
  };

  return (
    <div className="app-scroll">
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
              <small>Analysis</small>
            </h1>
          </div>
        </div>
        <div className="app-frame app-pad-h">
          <ul className="nav nav-tabs">
            <li>
              <a href="#description">Description</a>
            </li>
            {parentsLength ? (
              <li>
                <a href="#depends_on">Depends On</a>
              </li>
            ) : null}
            <li>
              <a href="#sql">SQL</a>
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

          {parentsLength ? (
            <section className="section">
              <div className="section-target" id="depends_on"></div>
              <div className="section-content">
                <h6>Depends On</h6>
                <ReferenceList references={parents} />
              </div>
            </section>
          ) : null}

          <section className="section">
            <div className="section-target" id="sql"></div>
            <div className="section-content">
              <CodeBlock
                versions={versions}
                defaultVersion={"Source"}
                language={language}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
