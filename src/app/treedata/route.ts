import { getModelTree, loadProject } from "@/app/projectService";
import { NextResponse } from "next/server";
import _ from "underscore";

export async function GET() {
  await loadProject();
  const fullTree = await new Promise((res) => {
    getModelTree(null, res);
  });

  // Omit groups data because its huge and also its busted in the original DBT Docs code
  const tree: any = _.omit(fullTree, "groups");
  tree.database = Object.values(tree.database);
  return NextResponse.json(tree);
}
