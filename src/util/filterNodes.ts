import * as projectService from "@/app/projectService";
import { getShortID } from "./nodeUrl";

export async function filterNodes(type: string) {
  await projectService.loadProject();
  const nodes = projectService.project.nodes;
  return Object.keys(nodes)
    .filter((id) => nodes[id].resource_type === type)
    .map((id) => ({ id: getShortID(id) }));
}
