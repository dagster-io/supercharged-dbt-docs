import { NextResponse } from "next/server";
import { loadProject, project } from "../projectService";

export async function GET(request: Request) {
  await loadProject();
  return NextResponse.json(
    project.searchable.map(({ name, description, columns, tags }: any) => ({
      name,
      description,
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
    }))
  );
}
