import { NextResponse } from "next/server";
import { loadProject, project } from "../projectService";

export async function GET(request: Request) {
  await loadProject();
  return NextResponse.json(
    project.searchable.map(
      ({
        name,
        description,
        columns,
        tags,
        unique_id,
        resource_type,
        source_name,
        package_name,
        label,
        version,
      }: any) => ({
        name,
        description,
        unique_id,
        resource_type,
        source_name,
        package_name,
        label,
        version,
        columns: Object.fromEntries(
          Object.values(columns || {}).map(({ name, description }: any) => [
            name,
            {
              name,
              description,
            },
          ])
        ),
        tags,
      })
    )
  );
}

export const revalidate = Infinity;
