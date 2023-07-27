import rawCatalogData from "@/dbt-project-data/catalog.json";
import rawManifestData from "@/dbt-project-data/manifest.json";

export function getCatalog(): any {
  return rawCatalogData;
}

export function getManifest(): any {
  return rawManifestData;
}
