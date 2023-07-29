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

export default async function Test({
  params: { id },
}: {
  params: { id: string };
}) {
  await projectService.loadProject();
  const model = projectService.project.nodes[id];
  const parents = getParents(projectService.project, model);
  const parentsLength = Object.keys(parents).length;
  const language = model.language;

  const default_compiled = "\n-- compiled code not found for this model\n";
  const versions = {
    Source: model.raw_code || "",
    Compiled: model.compiled_code || default_compiled,
  };

  return (
    <div className="app-scroll">
      <SetActive uniqueId={id} />
      <div className="app-links app-sticky">
        <div className="app-title">
          <div className="app-frame app-pad app-flush-bottom">
            <h1>
              <span className="break">{model.name}</span>
              <small>test</small>
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
              <a href="#code">SQL</a>
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
                <ReferenceList references={parents} node={model} />
              </div>
            </section>
          ) : null}

          <section className="section">
            <div className="section-target" id="code"></div>
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

const badIds = [
  "test.gitlab_snowflake.accepted_values_zuora_base_mrr_amortized_product_category__GitHost__Other__SaaS_Ultimate__Basic__SaaS_Bronze__Self_Managed_Premium__Self_Managed_Starter__Self_Managed_Ultimate__Support__Plus__SaaS_Premium__Standard__Trueup__Storage__SaaS_Other__Dedicated_Ultimate.b7a4d3e47b",
  "test.gitlab_snowflake.accepted_values_zuora_monthly_recurring_revenue_product_category__GitHost__Other__SaaS_Ultimate__Basic__SaaS_Bronze__Self_Managed_Premium__Self_Managed_Starter__Self_Managed_Ultimate__Support__Plus__SaaS_Premium__Standard__Trueup__Storage__SaaS_Other__Dedicated_Ultimate.e516ff2ad4",
  "test.gitlab_snowflake.accepted_values_zuora_rate_plan_product_category__GitHost__Other__SaaS_Ultimate__Basic__SaaS_Bronze__Self_Managed_Premium__Self_Managed_Starter__Self_Managed_Ultimate__Support__Plus__SaaS_Premium__Standard__Trueup__Storage__SaaS_Other__Dedicated_Ultimate.a7555b1b37",
  "test.gitlab_snowflake.dbt_utils_relationships_where_fct_crm_person_dim_crm_account_id__dim_crm_account_id__GREATEST_IFNULL_lead_created_date_1999_01_01_IFNULL_contact_created_date_1999_01_01_DATEADD_day_2_CURRENT_DATE_DATE__ref_dim_crm_account_.91247632de",
];

export async function generateStaticParams() {
  return await filterNodes("test");
}
