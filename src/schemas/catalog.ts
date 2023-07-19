// To parse this data:
//
//   import { Convert, Catalog } from "./file";
//
//   const catalog = Convert.toCatalog(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * CatalogArtifact(metadata: dbt.contracts.results.CatalogMetadata, nodes: Dict[str,
 * dbt.contracts.results.CatalogTable], sources: Dict[str,
 * dbt.contracts.results.CatalogTable], errors: Union[List[str], NoneType] = None,
 * _compile_results: Union[Any, NoneType] = None)
 */
export interface Catalog {
    errors?:  string[] | null;
    metadata: CatalogMetadata;
    nodes:    { [key: string]: CatalogTable };
    sources:  { [key: string]: CatalogTable };
}

/**
 * CatalogMetadata(dbt_schema_version: str = <factory>, dbt_version: str = '0.20.0rc1',
 * generated_at: datetime.datetime = <factory>, invocation_id: Union[str, NoneType] =
 * <factory>, env: Dict[str, str] = <factory>)
 */
export interface CatalogMetadata {
    dbt_schema_version?: string;
    dbt_version?:        string;
    env?:                { [key: string]: string };
    generated_at?:       Date;
    invocation_id?:      null | string;
}

/**
 * CatalogTable(metadata: dbt.contracts.results.TableMetadata, columns: Dict[str,
 * dbt.contracts.results.ColumnMetadata], stats: Dict[str, dbt.contracts.results.StatsItem],
 * unique_id: Union[str, NoneType] = None)
 */
export interface CatalogTable {
    columns:    { [key: string]: ColumnMetadata };
    metadata:   TableMetadata;
    stats:      { [key: string]: StatsItem };
    unique_id?: null | string;
}

/**
 * ColumnMetadata(type: str, index: int, name: str, comment: Union[str, NoneType] = None)
 */
export interface ColumnMetadata {
    comment?: null | string;
    index:    number;
    name:     string;
    type:     string;
}

/**
 * TableMetadata(type: str, schema: str, name: str, database: Union[str, NoneType] = None,
 * comment: Union[str, NoneType] = None, owner: Union[str, NoneType] = None)
 */
export interface TableMetadata {
    comment?:  null | string;
    database?: null | string;
    name:      string;
    owner?:    null | string;
    schema:    string;
    type:      string;
}

/**
 * StatsItem(id: str, label: str, value: Union[bool, str, float, NoneType], include: bool,
 * description: Union[str, NoneType] = None)
 */
export interface StatsItem {
    description?: null | string;
    id:           string;
    include:      boolean;
    label:        string;
    value?:       boolean | number | null | string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCatalog(json: string): Catalog {
        return cast(JSON.parse(json), r("Catalog"));
    }

    public static catalogToJson(value: Catalog): string {
        return JSON.stringify(uncast(value, r("Catalog")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Catalog": o([
        { json: "errors", js: "errors", typ: u(undefined, u(a(""), null)) },
        { json: "metadata", js: "metadata", typ: r("CatalogMetadata") },
        { json: "nodes", js: "nodes", typ: m(r("CatalogTable")) },
        { json: "sources", js: "sources", typ: m(r("CatalogTable")) },
    ], false),
    "CatalogMetadata": o([
        { json: "dbt_schema_version", js: "dbt_schema_version", typ: u(undefined, "") },
        { json: "dbt_version", js: "dbt_version", typ: u(undefined, "") },
        { json: "env", js: "env", typ: u(undefined, m("")) },
        { json: "generated_at", js: "generated_at", typ: u(undefined, Date) },
        { json: "invocation_id", js: "invocation_id", typ: u(undefined, u(null, "")) },
    ], false),
    "CatalogTable": o([
        { json: "columns", js: "columns", typ: m(r("ColumnMetadata")) },
        { json: "metadata", js: "metadata", typ: r("TableMetadata") },
        { json: "stats", js: "stats", typ: m(r("StatsItem")) },
        { json: "unique_id", js: "unique_id", typ: u(undefined, u(null, "")) },
    ], false),
    "ColumnMetadata": o([
        { json: "comment", js: "comment", typ: u(undefined, u(null, "")) },
        { json: "index", js: "index", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: "" },
    ], false),
    "TableMetadata": o([
        { json: "comment", js: "comment", typ: u(undefined, u(null, "")) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "owner", js: "owner", typ: u(undefined, u(null, "")) },
        { json: "schema", js: "schema", typ: "" },
        { json: "type", js: "type", typ: "" },
    ], false),
    "StatsItem": o([
        { json: "description", js: "description", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: "" },
        { json: "include", js: "include", typ: true },
        { json: "label", js: "label", typ: "" },
        { json: "value", js: "value", typ: u(undefined, u(true, 3.14, null, "")) },
    ], false),
};
