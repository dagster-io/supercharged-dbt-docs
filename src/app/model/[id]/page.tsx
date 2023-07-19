import { Convert } from "@/schemas/catalog";

interface ModelPageParams {
  id: string;
}

async function getCatalog() {
  const { default: rawData } = await import("@/dbt-project-data/catalog.json");
  return Convert.toCatalog(JSON.stringify(rawData));
}

export async function generateStaticParams(): Promise<ModelPageParams[]> {
  const catalog = await getCatalog();
  return Object.keys(catalog.nodes).map((id) => ({ id }));
}

export default async function ModelPage({
  params: { id },
}: {
  params: ModelPageParams;
}) {
  const catalog = await getCatalog();
  return <div>hello world: {JSON.stringify(catalog.nodes[id])}</div>;
}
