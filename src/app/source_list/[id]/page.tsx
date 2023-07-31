import { MarkdownBlock } from "@/components/MarkdownBlock";
import { TableDetails } from "@/components/TableDetails";
import { SourceRow } from "./SourceRow";
import { loadProject, project } from "@/app/projectService";
import _ from "underscore";

export default async function SourceListPage({
  params: { id },
}: {
  params: { id: string };
}) {
  await loadProject();
  const sources = _.filter(project.nodes, function (node) {
    return node.source_name == id;
  });

  // sort sources by sources.name
  sources.sort((a, b) => a.name.localeCompare(b.name));

  const source = sources[0];

  const model = {
    name: id,
    source_description: source.source_description,
    sources: sources,
  };

  const owners = _.uniq(_.map(sources, "metadata.owner"));
  const databases = _.uniq(_.map(sources, "database"));
  const schemas = _.uniq(_.map(sources, "schema"));

  const extra_table_fields = [
    {
      name: "Loader",
      value: source.loader,
    },
    {
      name: owners.length == 1 ? "Owner" : "Owners",
      value: owners.join(", "),
    },
    {
      name: databases.length == 1 ? "Database" : "Databases",
      value: databases.join(", "),
    },
    {
      name: schemas.length == 1 ? "Schema" : "Schemas",
      value: schemas.join(", "),
    },
    {
      name: "Tables",
      value: sources.length,
    },
  ];
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      .section-target {
        top: -8em;
      }

      .noflex {
        flex: 0 0 160px !important;
      }

      .highlight {
        color: #24292e;
        background-color: white;
      }
      `,
        }}
      />
      <div className="app-scroll">
        <div className="app-links app-sticky">
          <div className="app-title">
            <div className="app-frame app-pad app-flush-bottom">
              <h1>
                <span className="break">{model.name}</span>
                <small>source</small>
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
                <a href="#sources">Sources</a>
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
                    {model.source_description ? (
                      <div className="model-markdown">
                        <MarkdownBlock markdown={model.source_description} />
                      </div>
                    ) : (
                      <div>This source is not currently documented</div>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="section-target" id="sources"></div>
              <div className="section-content">
                <h6>Source Tables</h6>
                <div className="panel">
                  <div className="panel-body">
                    {!_.isEmpty(model.sources) ? (
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
                                Source
                              </th>
                              <th
                                style={{
                                  backgroundColor: "white",
                                  position: "sticky",
                                  top: 0,
                                  zIndex: 1,
                                }}
                              >
                                Table
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
                                  position: "sticky",
                                  top: 0,
                                  zIndex: 1,
                                }}
                              >
                                Link
                              </th>
                              <th
                                style={{
                                  width: "1px",
                                  backgroundColor: "white",
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
                            {model.sources.map((source, index) => (
                              <SourceRow key={index} source={source} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
