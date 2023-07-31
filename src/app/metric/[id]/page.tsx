import "server-only";

import _ from "underscore";
import * as projectService from "@/app/projectService";
import { TableDetails } from "@/components/TableDetails";
import { ColumnDetails } from "@/components/ColumnDetails";
import { ReferenceList } from "@/components/ReferenceList";
import { CodeBlock } from "@/components/CodeBlock";
import { getReferences, getParents } from "@/util/dagUtils";
import Link from "next/link";
import { SetActive } from "@/components/SetActive";
import { filterNodes } from "@/util/filterNodes";
import { MarkdownBlock } from "@/components/MarkdownBlock";

export default async function MetricPage({
  params: { id },
}: {
  params: { id: string };
}) {
  await projectService.loadProject();
  const metric = projectService.project.nodes[id];
  const parents = getParents(projectService.project, metric);
  const parentsLength = Object.keys(parents).length;

  const metric_type =
    metric.type === "expression" ? "Expression metric" : "Aggregate metric";

  const extra_table_fields = [
    {
      name: "Metric Type",
      value: metric_type,
    },
    {
      name: "Metric name",
      value: metric.name,
    },
  ];

  return (
    <div className="app-scroll">
      <SetActive uniqueId={id} />
      <div className="app-links app-sticky">
        <div className="app-title">
          <div className="app-frame app-pad app-flush-bottom">
            <h1>
              <span className="break">{metric.label}</span>
              <small>metric</small>

              <div className="clearfix"></div>
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
            {parentsLength ? (
              <li>
                <a href="#depends_on">Depends On</a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="app-details">
        <div className="app-frame app-pad">
          <section className="section">
            <div className="section-target" id="details"></div>
            <TableDetails model={metric} extras={extra_table_fields} />
          </section>

          <section className="section">
            <div className="section-target" id="description"></div>
            <div className="section-content">
              <h6>Description</h6>
              <div className="panel">
                <div className="panel-body">
                  {metric.description ? (
                    <div className="model-markdown">
                      <MarkdownBlock markdown={metric.description} />
                    </div>
                  ) : (
                    <div>
                      This {metric.resource_type} is not currently documented
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
                <ReferenceList references={parents} node={metric} />
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export const revalidate = Infinity;

export async function generateStaticParams() {
  return await filterNodes("metric");
}
