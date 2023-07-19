from sqlglot import parse_one
from sqlglot.lineage import lineage
import json

manifest = json.load(open("./src/dbt-project-data/manifest.json"))
entry = manifest["nodes"][
    "model.gitlab_snowflake.snowflake_warehouse_metering_history_source"
]
# print(list(entry.keys()))
# print(entry["columns"])

# sql = manifest["nodes"][
#     "model.gitlab_snowflake.snowflake_warehouse_metering_history_source"
# ]["compiled_sql"]
# print(sql)

import traceback

sources = {}
for name, node in manifest["nodes"].items():
    # TODO: fix names
    name = name.replace("model.gitlab_snowflake.", "")
    try:
        sources[name] = parse_one(node["compiled_sql"], read="snowflake")
    except:
        traceback.print_exc()

sql = """
WITH source AS (

  SELECT *
  FROM snowflake.account_usage.warehouse_metering_history, barcelona

),

renamed AS (

  SELECT
    start_time::TIMESTAMP               AS warehouse_metering_start_at,
    end_time::TIMESTAMP                 AS warehouse_metering_end_at,
    warehouse_id::INT                   AS warehouse_id,
    warehouse_name::VARCHAR             AS warehouse_name,
    credits_used::NUMBER                AS credits_used_total,
    credits_used_compute::NUMBER        AS credits_used_compute,
    credits_used_cloud_services::NUMBER AS credits_used_cloud_services
  FROM source

)

SELECT *
FROM renamed
"""

columns = list(entry["columns"].keys())


print("got", list(sources.keys()))
root = lineage(
    columns[0],
    parse_one(sql),
    sources=sources,
)  # .downstream[0].downstream[0]

cur = root
while True:
    # no dots = root (must be first) or error if last
    # 1 dot = inner
    # more than 1 dot = public
    print(cur.name)
    if len(cur.downstream) == 0:
        # print(cur.source.find("Table"))
        break
    cur = cur.downstream[0]

# first = root.downstream[0]
# second = first.downstream[0]
# print(second)
# print(second.downstream[0])
# # print(first.source)
# # print(dir(second.source.select().from_))
# # print()
# # print(second.name)
# # print(second.source)
# # print(root.downstream)
# # print(root.alias)
# # print(root.expression)
# # print(root.source)
# # print(root)
