import _ from "lodash";
import OverviewPage from "../OverviewPage";
import { getModelTree, loadProject } from "@/app/projectService";

export default async function OverviewProjectPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <OverviewPage id={id} />;
}

function getFolders(treeElements: any[]): string[] {
  const folders: string[] = [];
  const next: any[] = [];
  treeElements.forEach((element) => {
    folders.push(element.name);
    if (element.items) {
      next.push(...element.items);
    }
  });
  return [...folders, ...(next.length ? getFolders(next) : [])];
}

export async function generateStaticParams() {
  await loadProject();
  const tree: any = await new Promise((res) => {
    getModelTree(null, res);
  });
  const allFolders = [
    ...getFolders(tree.project),
    ...getFolders(tree.exposures),
    ...getFolders(tree.metrics),
  ];
  return allFolders
    .filter((id, idx, arr) => arr.indexOf(id) === idx)
    .map((folder) => ({ id: folder.toLowerCase() }));
}
