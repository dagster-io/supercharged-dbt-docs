import * as projectService from "@/app/projectService";

// Filter out these id's due to build issues :(
const badIds: any = {
  // Models have circular references somehow and client components are being SSRd and the props theyre passing to other client components are being serialized.
  "model.gitlab_snowflake.netsuite_accounts": true,
  "model.gitlab_snowflake.netsuite_budget": true,
  "model.gitlab_snowflake.netsuite_customers": true,
  "model.gitlab_snowflake.netsuite_departments": true,
  "model.gitlab_snowflake.netsuite_transaction_lines": true,
  "model.gitlab_snowflake.netsuite_transaction_lines_xf": true,

  // Names are too long:
  "test.gitlab_snowflake.accepted_values_zuora_base_mrr_amortized_product_category__GitHost__Other__SaaS_Ultimate__Basic__SaaS_Bronze__Self_Managed_Premium__Self_Managed_Starter__Self_Managed_Ultimate__Support__Plus__SaaS_Premium__Standard__Trueup__Storage__SaaS_Other__Dedicated_Ultimate.b7a4d3e47b":
    true,
  "test.gitlab_snowflake.accepted_values_zuora_monthly_recurring_revenue_product_category__GitHost__Other__SaaS_Ultimate__Basic__SaaS_Bronze__Self_Managed_Premium__Self_Managed_Starter__Self_Managed_Ultimate__Support__Plus__SaaS_Premium__Standard__Trueup__Storage__SaaS_Other__Dedicated_Ultimate.e516ff2ad4":
    true,
  "test.gitlab_snowflake.accepted_values_zuora_rate_plan_product_category__GitHost__Other__SaaS_Ultimate__Basic__SaaS_Bronze__Self_Managed_Premium__Self_Managed_Starter__Self_Managed_Ultimate__Support__Plus__SaaS_Premium__Standard__Trueup__Storage__SaaS_Other__Dedicated_Ultimate.a7555b1b37":
    true,
  "test.gitlab_snowflake.dbt_utils_relationships_where_fct_crm_person_dim_crm_account_id__dim_crm_account_id__GREATEST_IFNULL_lead_created_date_1999_01_01_IFNULL_contact_created_date_1999_01_01_DATEADD_day_2_CURRENT_DATE_DATE__ref_dim_crm_account_.91247632de":
    true,
};

export async function filterNodes(type: string) {
  await projectService.loadProject();
  const nodes = projectService.project.nodes;
  return Object.keys(nodes)
    .filter((id) => nodes[id].resource_type === type && !badIds[id])
    .map((id) => ({ id }));
}
