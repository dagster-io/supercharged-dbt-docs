import rawCatalogData from "@/dbt-project-data/catalog.json";
import rawManifestData from "@/dbt-project-data/manifest.json";

export function getCatalog() {
  return rawCatalogData;
}

export function getManifest() {
  return rawManifestData;
}
