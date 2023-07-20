import { Catalog } from "@/schemas/catalog";
import { Manifest } from "@/schemas/manifest";

interface ModelPageParams {
  id: string;
}

async function getCatalog() {
  const { default: rawData } = await import("@/dbt-project-data/catalog.json");
  return rawData as Catalog;
}

async function getManifest() {
  const { default: rawData } = await import("@/dbt-project-data/manifest.json");
  return rawData as Manifest;
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
  const [catalog, manifest] = await Promise.all([getCatalog(), getManifest()]);
  const catalogNode = catalog.nodes[id];
  const manifestNode = manifest.nodes[id];

  return (
    <main>
      <h1 className="text-xl font-bold">
        {catalogNode.metadata.name} ({catalogNode.metadata.type})
      </h1>
      <section>
        <header className="text-lg font-bold">Details</header>
        <table>
          <tr>
            <th>Tags</th>
            <th>Owner</th>
            <th>Type</th>
            <th>Package</th>
            <th>Relation</th>
          </tr>
          <tr>
            <td>{manifestNode.tags?.join(",")}</td>
            <td>{catalogNode.metadata.owner}</td>
            <td>{catalogNode.metadata.type}</td>
            <td>{manifestNode.package_name}</td>
            <td>{manifestNode.relation_name}</td>
          </tr>
        </table>
      </section>
      <section>
        <header className="text-lg font-bold">Description</header>
        {manifestNode.description || "This model is not currently documented"}
      </section>
      <section>
        <header className="text-lg font-bold">Columns</header>
        <table>
          <tr>
            <th>Column</th>
            <th>Type</th>
            <th>Description</th>
            <th>Tests</th>
          </tr>
          {Object.entries(catalogNode.columns).map(([name, metadata], i) => (
            <tr key={i}>
              <td>{name}</td>
              <td>{metadata.type}</td>
              <td>{metadata.comment}</td>
              <td>TODO</td>
            </tr>
          ))}
        </table>
      </section>
    </main>
  );
}
