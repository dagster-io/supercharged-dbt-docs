import _ from "underscore";
import * as projectService from "@/app/projectService";
import { TableDetails } from "@/components/TableDetails";
import { ReferenceList } from "@/components/ReferenceList";
import { getParents } from "@/util/dagUtils";
import { SetActive } from "@/components/SetActive";
import { filterNodes } from "@/util/filterNodes";

export default async function ExposurePage({
  params: { id },
}: {
  params: { id: string };
}) {
  await projectService.loadProject();
  const exposure = projectService.project.nodes[id];
  const parents = getParents(projectService.project, exposure);
  const parentsLength = Object.keys(parents).length;

  let owner_identifier;
  if (exposure.owner.name && exposure.owner.email) {
    owner_identifier = `${exposure.owner.name} <${exposure.owner.email}>`;
  } else if (exposure.owner.name) {
    owner_identifier = `${exposure.owner.name}`;
  } else if (exposure.owner.email) {
    owner_identifier = `${exposure.owner.email}`;
  }

  const extra_table_fields = [
    {
      name: "Maturity",
      value: exposure.maturity,
    },
    {
      name: "Owner",
      value: owner_identifier,
    },
    {
      name: "Exposure name",
      value: exposure.name,
    },
  ];
  return (
    <div className="app-scroll">
      <SetActive uniqueId={id} />
      <div className="app-links app-sticky">
        <div className="app-title">
          <div className="app-frame app-pad app-flush-bottom">
            <h1>
              <span className="break">{exposure.label}</span>
              <small>exposure</small>

              <div className="pull-right" ng-show="exposure.url">
                <a
                  className="btn text-white btn-primary btn-sm"
                  ng-href="{exposure.url}"
                  target="_blank"
                >
                  View this exposure
                </a>
              </div>

              <div className="clearfix"></div>
            </h1>
          </div>
        </div>
        <div className="app-frame app-pad-h">
          <ul className="nav nav-tabs">
            <li ui-sref-active="active">
              <a ui-sref="dbt.exposure({'#': 'details'})">Details</a>
            </li>
            <li ui-sref-active="active">
              <a ui-sref="dbt.exposure({'#': 'description'})">Description</a>
            </li>
            <li ui-sref-active="active" ng-show="parentsLength != 0">
              <a ui-sref="dbt.exposure({'#': 'depends_on'})">Depends On</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="app-details">
        <div className="app-frame app-pad">
          <section className="section">
            <div className="section-target" id="details"></div>
            <TableDetails model={exposure} extras={extra_table_fields} />
          </section>

          <section className="section">
            <div className="section-target" id="description"></div>
            <div className="section-content">
              <h6>Description</h6>
              <div className="panel">
                <div className="panel-body">
                  {exposure.description ? (
                    <div className="model-markdown">{exposure.description}</div>
                  ) : (
                    <div>
                      This {exposure.resource_type} is not currently documented
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {parentsLength ? (
            <section className="section" ng-show="parentsLength != 0">
              <div className="section-target" id="depends_on"></div>
              <div className="section-content">
                <h6>Depends On</h6>
                <ReferenceList references={parents} node={exposure} />
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return await filterNodes("exposure");
}
