import { Catalog, Convert as CatalogConvert } from "@/schemas/catalog";
import { Manifest, Convert as ManifestConvert } from "@/schemas/manifest";
import rawCatalogData from "@/dbt-project-data/catalog.json";
import rawManifestData from "@/dbt-project-data/manifest.json";

let _catalog: Catalog;
export function getCatalog() {
  if (!_catalog) {
    _catalog = CatalogConvert.toCatalog(JSON.stringify(rawCatalogData));
  }
  return _catalog;
}

let _manifest: Manifest;
export function getManifest() {
  if (!_manifest) {
    _manifest = ManifestConvert.toManifest(JSON.stringify(rawManifestData));
  }
  return _manifest;
}

let _project: any;
export function getProject() {
  if (!_project) {
  }
  return _project;
}
