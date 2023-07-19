// To parse this data:
//
//   import { Convert, Manifest } from "./file";
//
//   const manifest = Convert.toManifest(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

/**
 * WritableManifest(metadata: dbt.contracts.graph.manifest.ManifestMetadata, nodes:
 * Mapping[str, Union[dbt.contracts.graph.nodes.AnalysisNode,
 * dbt.contracts.graph.nodes.SingularTestNode, dbt.contracts.graph.nodes.HookNode,
 * dbt.contracts.graph.nodes.ModelNode, dbt.contracts.graph.nodes.RPCNode,
 * dbt.contracts.graph.nodes.SqlNode, dbt.contracts.graph.nodes.GenericTestNode,
 * dbt.contracts.graph.nodes.SnapshotNode, dbt.contracts.graph.nodes.SeedNode]], sources:
 * Mapping[str, dbt.contracts.graph.nodes.SourceDefinition], macros: Mapping[str,
 * dbt.contracts.graph.nodes.Macro], docs: Mapping[str,
 * dbt.contracts.graph.nodes.Documentation], exposures: Mapping[str,
 * dbt.contracts.graph.nodes.Exposure], metrics: Mapping[str,
 * dbt.contracts.graph.nodes.Metric], groups: Mapping[str, dbt.contracts.graph.nodes.Group],
 * selectors: Mapping[str, Any], disabled: Optional[Mapping[str,
 * List[Union[dbt.contracts.graph.nodes.AnalysisNode,
 * dbt.contracts.graph.nodes.SingularTestNode, dbt.contracts.graph.nodes.HookNode,
 * dbt.contracts.graph.nodes.ModelNode, dbt.contracts.graph.nodes.RPCNode,
 * dbt.contracts.graph.nodes.SqlNode, dbt.contracts.graph.nodes.GenericTestNode,
 * dbt.contracts.graph.nodes.SnapshotNode, dbt.contracts.graph.nodes.SeedNode,
 * dbt.contracts.graph.nodes.SourceDefinition, dbt.contracts.graph.nodes.Exposure,
 * dbt.contracts.graph.nodes.Metric]]]], parent_map: Optional[Dict[str, List[str]]],
 * child_map: Optional[Dict[str, List[str]]], group_map: Optional[Dict[str, List[str]]])
 */
export interface Manifest {
    /**
     * A mapping from parent nodes to their dependents
     */
    child_map?: { [key: string]: string[] } | null;
    /**
     * A mapping of the disabled nodes in the target
     */
    disabled?: { [key: string]: AnalysisNode[] } | null;
    /**
     * The docs defined in the dbt project and its dependencies
     */
    docs: { [key: string]: Documentation };
    /**
     * The exposures defined in the dbt project and its dependencies
     */
    exposures: { [key: string]: Exposure };
    /**
     * A mapping from group names to their nodes
     */
    group_map?: { [key: string]: string[] } | null;
    /**
     * The groups defined in the dbt project
     */
    groups: { [key: string]: Group };
    /**
     * The macros defined in the dbt project and its dependencies
     */
    macros: { [key: string]: Macro };
    /**
     * Metadata about the manifest
     */
    metadata: ManifestMetadata;
    /**
     * The metrics defined in the dbt project and its dependencies
     */
    metrics: { [key: string]: Metric };
    /**
     * The nodes defined in the dbt project and its dependencies
     */
    nodes: { [key: string]: Node };
    /**
     * A mapping from child nodes to their dependencies
     */
    parent_map?: { [key: string]: string[] } | null;
    /**
     * The selectors defined in selectors.yml
     */
    selectors: { [key: string]: any };
    /**
     * The sources defined in the dbt project and its dependencies
     */
    sources: { [key: string]: SourceDefinition };
}

/**
 * AnalysisNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * SingularTestNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * HookNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>, index: Optional[int] = None)
 *
 * ModelNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>, access: dbt.node_types.AccessType = <AccessType.Protected: 'protected'>,
 * constraints: List[dbt.contracts.graph.nodes.ModelLevelConstraint] = <factory>, version:
 * Union[str, float, NoneType] = None, latest_version: Union[str, float, NoneType] = None)
 *
 * RPCNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * SqlNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * GenericTestNode(test_metadata: dbt.contracts.graph.nodes.TestMetadata, database:
 * Optional[str], schema: str, name: str, resource_type: dbt.node_types.NodeType,
 * package_name: str, path: str, original_file_path: str, unique_id: str, fqn: List[str],
 * alias: str, checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>, column_name: Optional[str] = None, file_key_name: Optional[str] = None,
 * attached_node: Optional[str] = None)
 *
 * SnapshotNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.SnapshotConfig, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * SeedNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.SeedConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', root_path: Optional[str] = None, depends_on:
 * dbt.contracts.graph.nodes.MacroDependsOn = <factory>)
 *
 * SourceDefinition(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], source_name: str, source_description: str, loader: str,
 * identifier: str, _event_status: Dict[str, Any] = <factory>, quoting:
 * dbt.contracts.graph.unparsed.Quoting = <factory>, loaded_at_field: Optional[str] = None,
 * freshness: Optional[dbt.contracts.graph.unparsed.FreshnessThreshold] = None, external:
 * Optional[dbt.contracts.graph.unparsed.ExternalTable] = None, description: str = '',
 * columns: Dict[str, dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str,
 * Any] = <factory>, source_meta: Dict[str, Any] = <factory>, tags: List[str] = <factory>,
 * config: dbt.contracts.graph.model_config.SourceConfig = <factory>, patch_path:
 * Optional[str] = None, unrendered_config: Dict[str, Any] = <factory>, relation_name:
 * Optional[str] = None, created_at: float = <factory>)
 *
 * Exposure(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path: str,
 * original_file_path: str, unique_id: str, fqn: List[str], type:
 * dbt.contracts.graph.unparsed.ExposureType, owner: dbt.contracts.graph.unparsed.Owner,
 * description: str = '', label: Optional[str] = None, maturity:
 * Optional[dbt.contracts.graph.unparsed.MaturityType] = None, meta: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, config:
 * dbt.contracts.graph.model_config.ExposureConfig = <factory>, unrendered_config: Dict[str,
 * Any] = <factory>, url: Optional[str] = None, depends_on:
 * dbt.contracts.graph.nodes.DependsOn = <factory>, refs:
 * List[dbt.contracts.graph.nodes.RefArgs] = <factory>, sources: List[List[str]] =
 * <factory>, metrics: List[List[str]] = <factory>, created_at: float = <factory>)
 *
 * Metric(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path: str,
 * original_file_path: str, unique_id: str, fqn: List[str], description: str, label: str,
 * calculation_method: str, expression: str, filters:
 * List[dbt.contracts.graph.unparsed.MetricFilter], time_grains: List[str], dimensions:
 * List[str], timestamp: Optional[str] = None, window:
 * Optional[dbt.contracts.graph.unparsed.MetricTime] = None, model: Optional[str] = None,
 * model_unique_id: Optional[str] = None, meta: Dict[str, Any] = <factory>, tags: List[str]
 * = <factory>, config: dbt.contracts.graph.model_config.MetricConfig = <factory>,
 * unrendered_config: Dict[str, Any] = <factory>, sources: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, refs:
 * List[dbt.contracts.graph.nodes.RefArgs] = <factory>, metrics: List[List[str]] =
 * <factory>, created_at: float = <factory>, group: Optional[str] = None)
 */
export interface AnalysisNode {
    alias?:               string;
    build_path?:          null | string;
    checksum?:            FileHash;
    columns?:             { [key: string]: ColumnInfo };
    compiled?:            boolean;
    compiled_code?:       null | string;
    compiled_path?:       null | string;
    config?:              DisabledConfig;
    config_call_dict?:    { [key: string]: any };
    contract?:            Contract;
    created_at?:          number;
    database?:            null | string;
    deferred?:            boolean;
    depends_on?:          DependsOn;
    description?:         string;
    docs?:                Docs;
    extra_ctes?:          InjectedCTE[];
    extra_ctes_injected?: boolean;
    fqn:                  string[];
    group?:               null | string;
    language?:            string;
    meta?:                { [key: string]: any };
    metrics?:             Array<string[]>;
    name:                 string;
    original_file_path:   string;
    package_name:         string;
    patch_path?:          null | string;
    path:                 string;
    raw_code?:            string;
    refs?:                RefArgs[];
    relation_name?:       null | string;
    resource_type:        DisabledResourceType;
    schema?:              string;
    sources?:             Array<string[]>;
    tags?:                string[];
    unique_id:            string;
    unrendered_config?:   { [key: string]: any };
    index?:               number | null;
    access?:              Access;
    constraints?:         ModelLevelConstraint[];
    latest_version?:      number | null | string;
    version?:             number | null | string;
    attached_node?:       null | string;
    column_name?:         null | string;
    file_key_name?:       null | string;
    test_metadata?:       TestMetadata;
    root_path?:           null | string;
    external?:            null | ExternalTable;
    freshness?:           FreshnessThreshold | null;
    identifier?:          string;
    loaded_at_field?:     null | string;
    loader?:              string;
    quoting?:             Quoting;
    source_description?:  string;
    source_meta?:         { [key: string]: any };
    source_name?:         string;
    label?:               null | string;
    maturity?:            Maturity | null;
    owner?:               Owner;
    type?:                DisabledType;
    url?:                 null | string;
    calculation_method?:  string;
    dimensions?:          string[];
    expression?:          string;
    filters?:             MetricFilter[];
    model?:               null | string;
    model_unique_id?:     null | string;
    time_grains?:         string[];
    timestamp?:           null | string;
    window?:              MetricTime | null;
}

export enum Access {
    Private = "private",
    Protected = "protected",
    Public = "public",
}

/**
 * FileHash(name: str, checksum: str)
 */
export interface FileHash {
    checksum: string;
    name:     string;
}

/**
 * Used in all ManifestNodes and SourceDefinition
 */
export interface ColumnInfo {
    constraints?: ColumnLevelConstraint[];
    data_type?:   null | string;
    description?: string;
    meta?:        { [key: string]: any };
    name:         string;
    quote?:       boolean | null;
    tags?:        string[];
    [property: string]: any;
}

/**
 * ColumnLevelConstraint(type: dbt.contracts.graph.nodes.ConstraintType, name: Optional[str]
 * = None, expression: Optional[str] = None, warn_unenforced: bool = True, warn_unsupported:
 * bool = True)
 */
export interface ColumnLevelConstraint {
    expression?:       null | string;
    name?:             null | string;
    type:              ConstraintType;
    warn_unenforced?:  boolean;
    warn_unsupported?: boolean;
}

export enum ConstraintType {
    Check = "check",
    Custom = "custom",
    ForeignKey = "foreign_key",
    NotNull = "not_null",
    PrimaryKey = "primary_key",
    Unique = "unique",
}

/**
 * NodeConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'view', incremental_strategy: Optional[str] = None,
 * persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>, packages: List[str] = <factory>, docs:
 * dbt.contracts.graph.unparsed.Docs = <factory>, contract:
 * dbt.contracts.graph.model_config.ContractConfig = <factory>)
 *
 * TestConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = 'dbt_test__audit', database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'test', severity: dbt.contracts.graph.model_config.Severity =
 * 'ERROR', store_failures: Optional[bool] = None, where: Optional[str] = None, limit:
 * Optional[int] = None, fail_calc: str = 'count(*)', warn_if: str = '!= 0', error_if: str =
 * '!= 0')
 *
 * SnapshotConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias:
 * Optional[str] = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'snapshot', incremental_strategy: Optional[str] = None,
 * persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Optional[str] = None, on_schema_change: Optional[str] = 'ignore', grants:
 * Dict[str, Any] = <factory>, packages: List[str] = <factory>, docs:
 * dbt.contracts.graph.unparsed.Docs = <factory>, contract:
 * dbt.contracts.graph.model_config.ContractConfig = <factory>, strategy: Optional[str] =
 * None, target_schema: Optional[str] = None, target_database: Optional[str] = None,
 * updated_at: Optional[str] = None, check_cols: Union[str, List[str], NoneType] = None)
 *
 * SeedConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'seed', incremental_strategy: Optional[str] = None,
 * persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>, packages: List[str] = <factory>, docs:
 * dbt.contracts.graph.unparsed.Docs = <factory>, contract:
 * dbt.contracts.graph.model_config.ContractConfig = <factory>, quote_columns:
 * Optional[bool] = None)
 *
 * SourceConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True)
 *
 * ExposureConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True)
 *
 * MetricConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, group:
 * Optional[str] = None)
 */
export interface DisabledConfig {
    alias?:                null | string;
    column_types?:         { [key: string]: any };
    contract?:             ContractConfig;
    database?:             null | string;
    docs?:                 Docs;
    enabled?:              boolean;
    full_refresh?:         boolean | null;
    grants?:               { [key: string]: any };
    group?:                null | string;
    incremental_strategy?: null | string;
    materialized?:         string;
    meta?:                 { [key: string]: any };
    on_schema_change?:     null | string;
    packages?:             string[];
    persist_docs?:         { [key: string]: any };
    "post-hook"?:          Hook[];
    "pre-hook"?:           Hook[];
    quoting?:              { [key: string]: any };
    schema?:               null | string;
    tags?:                 string[] | string;
    unique_key?:           string[] | null | string;
    error_if?:             string;
    fail_calc?:            string;
    limit?:                number | null;
    severity?:             string;
    store_failures?:       boolean | null;
    warn_if?:              string;
    where?:                null | string;
    check_cols?:           string[] | null | string;
    strategy?:             null | string;
    target_database?:      null | string;
    target_schema?:        null | string;
    updated_at?:           null | string;
    quote_columns?:        boolean | null;
    [property: string]: any;
}

/**
 * ContractConfig(enforced: bool = False)
 */
export interface ContractConfig {
    enforced?: boolean;
}

/**
 * Docs(show: bool = True, node_color: Optional[str] = None)
 */
export interface Docs {
    node_color?: null | string;
    show?:       boolean;
}

/**
 * Hook(sql: str, transaction: bool = True, index: Optional[int] = None)
 */
export interface Hook {
    index?:       number | null;
    sql:          string;
    transaction?: boolean;
}

/**
 * ModelLevelConstraint(type: dbt.contracts.graph.nodes.ConstraintType, name: Optional[str]
 * = None, expression: Optional[str] = None, warn_unenforced: bool = True, warn_unsupported:
 * bool = True, columns: List[str] = <factory>)
 */
export interface ModelLevelConstraint {
    columns?:          string[];
    expression?:       null | string;
    name?:             null | string;
    type:              ConstraintType;
    warn_unenforced?:  boolean;
    warn_unsupported?: boolean;
}

/**
 * Contract(enforced: bool = False, checksum: Optional[str] = None)
 */
export interface Contract {
    checksum?: null | string;
    enforced?: boolean;
}

/**
 * DependsOn(macros: List[str] = <factory>, nodes: List[str] = <factory>)
 *
 * Used only in the Macro class
 */
export interface DependsOn {
    macros?: string[];
    nodes?:  string[];
}

/**
 * ExternalTable(_extra: Dict[str, Any] = <factory>, location: Optional[str] = None,
 * file_format: Optional[str] = None, row_format: Optional[str] = None, tbl_properties:
 * Optional[str] = None, partitions: Union[List[str],
 * List[dbt.contracts.graph.unparsed.ExternalPartition], NoneType] = None)
 */
export interface ExternalTable {
    file_format?:    null | string;
    location?:       null | string;
    partitions?:     Array<ExternalPartition | string> | null;
    row_format?:     null | string;
    tbl_properties?: null | string;
    [property: string]: any;
}

/**
 * ExternalPartition(_extra: Dict[str, Any] = <factory>, name: str = '', description: str =
 * '', data_type: str = '', meta: Dict[str, Any] = <factory>)
 */
export interface ExternalPartition {
    data_type?:   string;
    description?: string;
    meta?:        { [key: string]: any };
    name?:        string;
    [property: string]: any;
}

/**
 * Used in CompiledNodes as part of ephemeral model processing
 */
export interface InjectedCTE {
    id:  string;
    sql: string;
}

/**
 * MetricFilter(field: str, operator: str, value: str)
 */
export interface MetricFilter {
    field:    string;
    operator: string;
    value:    string;
}

/**
 * FreshnessThreshold(warn_after: Optional[dbt.contracts.graph.unparsed.Time] = <factory>,
 * error_after: Optional[dbt.contracts.graph.unparsed.Time] = <factory>, filter:
 * Optional[str] = None)
 */
export interface FreshnessThreshold {
    error_after?: Time | null;
    filter?:      null | string;
    warn_after?:  Time | null;
}

/**
 * Time(count: Optional[int] = None, period:
 * Optional[dbt.contracts.graph.unparsed.TimePeriod] = None)
 */
export interface Time {
    count?:  number | null;
    period?: TimePeriod | null;
}

export enum TimePeriod {
    Day = "day",
    Hour = "hour",
    Minute = "minute",
}

export enum Maturity {
    High = "high",
    Low = "low",
    Medium = "medium",
}

/**
 * Owner(_extra: Dict[str, Any] = <factory>, email: Optional[str] = None, name:
 * Optional[str] = None)
 */
export interface Owner {
    email?: null | string;
    name?:  null | string;
    [property: string]: any;
}

/**
 * Quoting(database: Optional[bool] = None, schema: Optional[bool] = None, identifier:
 * Optional[bool] = None, column: Optional[bool] = None)
 */
export interface Quoting {
    column?:     boolean | null;
    database?:   boolean | null;
    identifier?: boolean | null;
    schema?:     boolean | null;
}

/**
 * RefArgs(name: str, package: Optional[str] = None, version: Union[str, float, NoneType] =
 * None)
 */
export interface RefArgs {
    name:     string;
    package?: null | string;
    version?: number | null | string;
}

export enum DisabledResourceType {
    Analysis = "analysis",
    Exposure = "exposure",
    Metric = "metric",
    Model = "model",
    Operation = "operation",
    RPC = "rpc",
    SQLOperation = "sql operation",
    Seed = "seed",
    Snapshot = "snapshot",
    Source = "source",
    Test = "test",
}

/**
 * TestMetadata(name: str, kwargs: Dict[str, Any] = <factory>, namespace: Optional[str] =
 * None)
 */
export interface TestMetadata {
    kwargs?:    { [key: string]: any };
    name:       string;
    namespace?: null | string;
}

export enum DisabledType {
    Analysis = "analysis",
    Application = "application",
    Dashboard = "dashboard",
    Ml = "ml",
    Notebook = "notebook",
}

/**
 * MetricTime(count: Optional[int] = None, period:
 * Optional[dbt.contracts.graph.unparsed.MetricTimePeriod] = None)
 */
export interface MetricTime {
    count?:  number | null;
    period?: MetricTimePeriod | null;
}

export enum MetricTimePeriod {
    Day = "day",
    Month = "month",
    Week = "week",
    Year = "year",
}

/**
 * Documentation(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path:
 * str, original_file_path: str, unique_id: str, block_contents: str)
 */
export interface Documentation {
    block_contents:     string;
    name:               string;
    original_file_path: string;
    package_name:       string;
    path:               string;
    resource_type:      DocResourceType;
    unique_id:          string;
}

export enum DocResourceType {
    Doc = "doc",
}

/**
 * Exposure(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path: str,
 * original_file_path: str, unique_id: str, fqn: List[str], type:
 * dbt.contracts.graph.unparsed.ExposureType, owner: dbt.contracts.graph.unparsed.Owner,
 * description: str = '', label: Optional[str] = None, maturity:
 * Optional[dbt.contracts.graph.unparsed.MaturityType] = None, meta: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, config:
 * dbt.contracts.graph.model_config.ExposureConfig = <factory>, unrendered_config: Dict[str,
 * Any] = <factory>, url: Optional[str] = None, depends_on:
 * dbt.contracts.graph.nodes.DependsOn = <factory>, refs:
 * List[dbt.contracts.graph.nodes.RefArgs] = <factory>, sources: List[List[str]] =
 * <factory>, metrics: List[List[str]] = <factory>, created_at: float = <factory>)
 */
export interface Exposure {
    config?:            ExposureConfig;
    created_at?:        number;
    depends_on?:        ExposureDependsOn;
    description?:       string;
    fqn:                string[];
    label?:             null | string;
    maturity?:          Maturity | null;
    meta?:              { [key: string]: any };
    metrics?:           Array<string[]>;
    name:               string;
    original_file_path: string;
    owner:              Owner;
    package_name:       string;
    path:               string;
    refs?:              RefArgs[];
    resource_type:      ExposureResourceType;
    sources?:           Array<string[]>;
    tags?:              string[];
    type:               DisabledType;
    unique_id:          string;
    unrendered_config?: { [key: string]: any };
    url?:               null | string;
}

/**
 * ExposureConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True)
 */
export interface ExposureConfig {
    enabled?: boolean;
    [property: string]: any;
}

/**
 * DependsOn(macros: List[str] = <factory>, nodes: List[str] = <factory>)
 */
export interface ExposureDependsOn {
    macros?: string[];
    nodes?:  string[];
}

export enum ExposureResourceType {
    Exposure = "exposure",
}

/**
 * Group(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path: str,
 * original_file_path: str, unique_id: str, owner: dbt.contracts.graph.unparsed.Owner)
 */
export interface Group {
    name:               string;
    original_file_path: string;
    owner:              Owner;
    package_name:       string;
    path:               string;
    resource_type:      GroupResourceType;
    unique_id:          string;
}

export enum GroupResourceType {
    Group = "group",
}

/**
 * Macro(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path: str,
 * original_file_path: str, unique_id: str, macro_sql: str, depends_on:
 * dbt.contracts.graph.nodes.MacroDependsOn = <factory>, description: str = '', meta:
 * Dict[str, Any] = <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, arguments:
 * List[dbt.contracts.graph.unparsed.MacroArgument] = <factory>, created_at: float =
 * <factory>, supported_languages: Optional[List[dbt.node_types.ModelLanguage]] = None)
 */
export interface Macro {
    arguments?:           MacroArgument[];
    created_at?:          number;
    depends_on?:          MacroDependsOn;
    description?:         string;
    docs?:                Docs;
    macro_sql:            string;
    meta?:                { [key: string]: any };
    name:                 string;
    original_file_path:   string;
    package_name:         string;
    patch_path?:          null | string;
    path:                 string;
    resource_type:        MacroResourceType;
    supported_languages?: SupportedLanguage[] | null;
    unique_id:            string;
}

/**
 * MacroArgument(name: str, type: Optional[str] = None, description: str = '')
 */
export interface MacroArgument {
    description?: string;
    name:         string;
    type?:        null | string;
}

/**
 * Used only in the Macro class
 */
export interface MacroDependsOn {
    macros?: string[];
}

export enum MacroResourceType {
    Macro = "macro",
}

export enum SupportedLanguage {
    Python = "python",
    SQL = "sql",
}

/**
 * Metadata about the manifest
 *
 * Metadata for the manifest.
 */
export interface ManifestMetadata {
    /**
     * The type name of the adapter
     */
    adapter_type?:       null | string;
    dbt_schema_version?: string;
    dbt_version?:        string;
    env?:                { [key: string]: string };
    generated_at?:       Date;
    invocation_id?:      null | string;
    /**
     * A unique identifier for the project
     */
    project_id?: null | string;
    /**
     * Whether dbt is configured to send anonymous usage statistics
     */
    send_anonymous_usage_stats?: boolean | null;
    /**
     * A unique identifier for the user
     */
    user_id?: null | string;
}

/**
 * Metric(name: str, resource_type: dbt.node_types.NodeType, package_name: str, path: str,
 * original_file_path: str, unique_id: str, fqn: List[str], description: str, label: str,
 * calculation_method: str, expression: str, filters:
 * List[dbt.contracts.graph.unparsed.MetricFilter], time_grains: List[str], dimensions:
 * List[str], timestamp: Optional[str] = None, window:
 * Optional[dbt.contracts.graph.unparsed.MetricTime] = None, model: Optional[str] = None,
 * model_unique_id: Optional[str] = None, meta: Dict[str, Any] = <factory>, tags: List[str]
 * = <factory>, config: dbt.contracts.graph.model_config.MetricConfig = <factory>,
 * unrendered_config: Dict[str, Any] = <factory>, sources: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, refs:
 * List[dbt.contracts.graph.nodes.RefArgs] = <factory>, metrics: List[List[str]] =
 * <factory>, created_at: float = <factory>, group: Optional[str] = None)
 */
export interface Metric {
    calculation_method: string;
    config?:            MetricConfig;
    created_at?:        number;
    depends_on?:        ExposureDependsOn;
    description:        string;
    dimensions:         string[];
    expression:         string;
    filters:            MetricFilter[];
    fqn:                string[];
    group?:             null | string;
    label:              string;
    meta?:              { [key: string]: any };
    metrics?:           Array<string[]>;
    model?:             null | string;
    model_unique_id?:   null | string;
    name:               string;
    original_file_path: string;
    package_name:       string;
    path:               string;
    refs?:              RefArgs[];
    resource_type:      MetricResourceType;
    sources?:           Array<string[]>;
    tags?:              string[];
    time_grains:        string[];
    timestamp?:         null | string;
    unique_id:          string;
    unrendered_config?: { [key: string]: any };
    window?:            MetricTime | null;
}

/**
 * MetricConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, group:
 * Optional[str] = None)
 */
export interface MetricConfig {
    enabled?: boolean;
    group?:   null | string;
    [property: string]: any;
}

export enum MetricResourceType {
    Metric = "metric",
}

/**
 * AnalysisNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * SingularTestNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * HookNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>, index: Optional[int] = None)
 *
 * ModelNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>, access: dbt.node_types.AccessType = <AccessType.Protected: 'protected'>,
 * constraints: List[dbt.contracts.graph.nodes.ModelLevelConstraint] = <factory>, version:
 * Union[str, float, NoneType] = None, latest_version: Union[str, float, NoneType] = None)
 *
 * RPCNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * SqlNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * GenericTestNode(test_metadata: dbt.contracts.graph.nodes.TestMetadata, database:
 * Optional[str], schema: str, name: str, resource_type: dbt.node_types.NodeType,
 * package_name: str, path: str, original_file_path: str, unique_id: str, fqn: List[str],
 * alias: str, checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>, column_name: Optional[str] = None, file_key_name: Optional[str] = None,
 * attached_node: Optional[str] = None)
 *
 * SnapshotNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.SnapshotConfig, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', language: str = 'sql', refs: List[dbt.contracts.graph.nodes.RefArgs]
 * = <factory>, sources: List[List[str]] = <factory>, metrics: List[List[str]] = <factory>,
 * depends_on: dbt.contracts.graph.nodes.DependsOn = <factory>, compiled_path: Optional[str]
 * = None, compiled: bool = False, compiled_code: Optional[str] = None, extra_ctes_injected:
 * bool = False, extra_ctes: List[dbt.contracts.graph.nodes.InjectedCTE] = <factory>,
 * _pre_injected_sql: Optional[str] = None, contract: dbt.contracts.graph.nodes.Contract =
 * <factory>)
 *
 * SeedNode(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], alias: str, checksum: dbt.contracts.files.FileHash,
 * config: dbt.contracts.graph.model_config.SeedConfig = <factory>, _event_status: Dict[str,
 * Any] = <factory>, tags: List[str] = <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * group: Optional[str] = None, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, relation_name: Optional[str] = None,
 * raw_code: str = '', root_path: Optional[str] = None, depends_on:
 * dbt.contracts.graph.nodes.MacroDependsOn = <factory>)
 */
export interface Node {
    alias:                string;
    build_path?:          null | string;
    checksum:             FileHash;
    columns?:             { [key: string]: ColumnInfo };
    compiled?:            boolean;
    compiled_code?:       null | string;
    compiled_path?:       null | string;
    config?:              NodeConfig;
    config_call_dict?:    { [key: string]: any };
    contract?:            Contract;
    created_at?:          number;
    database?:            null | string;
    deferred?:            boolean;
    depends_on?:          DependsOn;
    description?:         string;
    docs?:                Docs;
    extra_ctes?:          InjectedCTE[];
    extra_ctes_injected?: boolean;
    fqn:                  string[];
    group?:               null | string;
    language?:            string;
    meta?:                { [key: string]: any };
    metrics?:             Array<string[]>;
    name:                 string;
    original_file_path:   string;
    package_name:         string;
    patch_path?:          null | string;
    path:                 string;
    raw_code?:            string;
    refs?:                RefArgs[];
    relation_name?:       null | string;
    resource_type:        NodeResourceType;
    schema:               string;
    sources?:             Array<string[]>;
    tags?:                string[];
    unique_id:            string;
    unrendered_config?:   { [key: string]: any };
    index?:               number | null;
    access?:              Access;
    constraints?:         ModelLevelConstraint[];
    latest_version?:      number | null | string;
    version?:             number | null | string;
    attached_node?:       null | string;
    column_name?:         null | string;
    file_key_name?:       null | string;
    test_metadata?:       TestMetadata;
    root_path?:           null | string;
}

/**
 * NodeConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'view', incremental_strategy: Optional[str] = None,
 * persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>, packages: List[str] = <factory>, docs:
 * dbt.contracts.graph.unparsed.Docs = <factory>, contract:
 * dbt.contracts.graph.model_config.ContractConfig = <factory>)
 *
 * TestConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = 'dbt_test__audit', database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'test', severity: dbt.contracts.graph.model_config.Severity =
 * 'ERROR', store_failures: Optional[bool] = None, where: Optional[str] = None, limit:
 * Optional[int] = None, fail_calc: str = 'count(*)', warn_if: str = '!= 0', error_if: str =
 * '!= 0')
 *
 * SnapshotConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias:
 * Optional[str] = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'snapshot', incremental_strategy: Optional[str] = None,
 * persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Optional[str] = None, on_schema_change: Optional[str] = 'ignore', grants:
 * Dict[str, Any] = <factory>, packages: List[str] = <factory>, docs:
 * dbt.contracts.graph.unparsed.Docs = <factory>, contract:
 * dbt.contracts.graph.model_config.ContractConfig = <factory>, strategy: Optional[str] =
 * None, target_schema: Optional[str] = None, target_database: Optional[str] = None,
 * updated_at: Optional[str] = None, check_cols: Union[str, List[str], NoneType] = None)
 *
 * SeedConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, group: Optional[str]
 * = None, materialized: str = 'seed', incremental_strategy: Optional[str] = None,
 * persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>, packages: List[str] = <factory>, docs:
 * dbt.contracts.graph.unparsed.Docs = <factory>, contract:
 * dbt.contracts.graph.model_config.ContractConfig = <factory>, quote_columns:
 * Optional[bool] = None)
 */
export interface NodeConfig {
    alias?:                null | string;
    column_types?:         { [key: string]: any };
    contract?:             ContractConfig;
    database?:             null | string;
    docs?:                 Docs;
    enabled?:              boolean;
    full_refresh?:         boolean | null;
    grants?:               { [key: string]: any };
    group?:                null | string;
    incremental_strategy?: null | string;
    materialized?:         string;
    meta?:                 { [key: string]: any };
    on_schema_change?:     null | string;
    packages?:             string[];
    persist_docs?:         { [key: string]: any };
    "post-hook"?:          Hook[];
    "pre-hook"?:           Hook[];
    quoting?:              { [key: string]: any };
    schema?:               null | string;
    tags?:                 string[] | string;
    unique_key?:           string[] | null | string;
    error_if?:             string;
    fail_calc?:            string;
    limit?:                number | null;
    severity?:             string;
    store_failures?:       boolean | null;
    warn_if?:              string;
    where?:                null | string;
    check_cols?:           string[] | null | string;
    strategy?:             null | string;
    target_database?:      null | string;
    target_schema?:        null | string;
    updated_at?:           null | string;
    quote_columns?:        boolean | null;
    [property: string]: any;
}

export enum NodeResourceType {
    Analysis = "analysis",
    Model = "model",
    Operation = "operation",
    RPC = "rpc",
    SQLOperation = "sql operation",
    Seed = "seed",
    Snapshot = "snapshot",
    Test = "test",
}

/**
 * SourceDefinition(database: Optional[str], schema: str, name: str, resource_type:
 * dbt.node_types.NodeType, package_name: str, path: str, original_file_path: str,
 * unique_id: str, fqn: List[str], source_name: str, source_description: str, loader: str,
 * identifier: str, _event_status: Dict[str, Any] = <factory>, quoting:
 * dbt.contracts.graph.unparsed.Quoting = <factory>, loaded_at_field: Optional[str] = None,
 * freshness: Optional[dbt.contracts.graph.unparsed.FreshnessThreshold] = None, external:
 * Optional[dbt.contracts.graph.unparsed.ExternalTable] = None, description: str = '',
 * columns: Dict[str, dbt.contracts.graph.nodes.ColumnInfo] = <factory>, meta: Dict[str,
 * Any] = <factory>, source_meta: Dict[str, Any] = <factory>, tags: List[str] = <factory>,
 * config: dbt.contracts.graph.model_config.SourceConfig = <factory>, patch_path:
 * Optional[str] = None, unrendered_config: Dict[str, Any] = <factory>, relation_name:
 * Optional[str] = None, created_at: float = <factory>)
 */
export interface SourceDefinition {
    columns?:           { [key: string]: ColumnInfo };
    config?:            SourceConfig;
    created_at?:        number;
    database?:          null | string;
    description?:       string;
    external?:          null | ExternalTable;
    fqn:                string[];
    freshness?:         FreshnessThreshold | null;
    identifier:         string;
    loaded_at_field?:   null | string;
    loader:             string;
    meta?:              { [key: string]: any };
    name:               string;
    original_file_path: string;
    package_name:       string;
    patch_path?:        null | string;
    path:               string;
    quoting?:           Quoting;
    relation_name?:     null | string;
    resource_type:      SourceResourceType;
    schema:             string;
    source_description: string;
    source_meta?:       { [key: string]: any };
    source_name:        string;
    tags?:              string[];
    unique_id:          string;
    unrendered_config?: { [key: string]: any };
}

/**
 * SourceConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True)
 */
export interface SourceConfig {
    enabled?: boolean;
    [property: string]: any;
}

export enum SourceResourceType {
    Source = "source",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toManifest(json: string): Manifest {
        return cast(JSON.parse(json), r("Manifest"));
    }

    public static manifestToJson(value: Manifest): string {
        return JSON.stringify(uncast(value, r("Manifest")), null, 2);
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
    "Manifest": o([
        { json: "child_map", js: "child_map", typ: u(undefined, u(m(a("")), null)) },
        { json: "disabled", js: "disabled", typ: u(undefined, u(m(a(r("AnalysisNode"))), null)) },
        { json: "docs", js: "docs", typ: m(r("Documentation")) },
        { json: "exposures", js: "exposures", typ: m(r("Exposure")) },
        { json: "group_map", js: "group_map", typ: u(undefined, u(m(a("")), null)) },
        { json: "groups", js: "groups", typ: m(r("Group")) },
        { json: "macros", js: "macros", typ: m(r("Macro")) },
        { json: "metadata", js: "metadata", typ: r("ManifestMetadata") },
        { json: "metrics", js: "metrics", typ: m(r("Metric")) },
        { json: "nodes", js: "nodes", typ: m(r("Node")) },
        { json: "parent_map", js: "parent_map", typ: u(undefined, u(m(a("")), null)) },
        { json: "selectors", js: "selectors", typ: m("any") },
        { json: "sources", js: "sources", typ: m(r("SourceDefinition")) },
    ], false),
    "AnalysisNode": o([
        { json: "alias", js: "alias", typ: u(undefined, "") },
        { json: "build_path", js: "build_path", typ: u(undefined, u(null, "")) },
        { json: "checksum", js: "checksum", typ: u(undefined, r("FileHash")) },
        { json: "columns", js: "columns", typ: u(undefined, m(r("ColumnInfo"))) },
        { json: "compiled", js: "compiled", typ: u(undefined, true) },
        { json: "compiled_code", js: "compiled_code", typ: u(undefined, u(null, "")) },
        { json: "compiled_path", js: "compiled_path", typ: u(undefined, u(null, "")) },
        { json: "config", js: "config", typ: u(undefined, r("DisabledConfig")) },
        { json: "config_call_dict", js: "config_call_dict", typ: u(undefined, m("any")) },
        { json: "contract", js: "contract", typ: u(undefined, r("Contract")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "deferred", js: "deferred", typ: u(undefined, true) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("DependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "extra_ctes", js: "extra_ctes", typ: u(undefined, a(r("InjectedCTE"))) },
        { json: "extra_ctes_injected", js: "extra_ctes_injected", typ: u(undefined, true) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "group", js: "group", typ: u(undefined, u(null, "")) },
        { json: "language", js: "language", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "patch_path", js: "patch_path", typ: u(undefined, u(null, "")) },
        { json: "path", js: "path", typ: "" },
        { json: "raw_code", js: "raw_code", typ: u(undefined, "") },
        { json: "refs", js: "refs", typ: u(undefined, a(r("RefArgs"))) },
        { json: "relation_name", js: "relation_name", typ: u(undefined, u(null, "")) },
        { json: "resource_type", js: "resource_type", typ: r("DisabledResourceType") },
        { json: "schema", js: "schema", typ: u(undefined, "") },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
        { json: "index", js: "index", typ: u(undefined, u(0, null)) },
        { json: "access", js: "access", typ: u(undefined, r("Access")) },
        { json: "constraints", js: "constraints", typ: u(undefined, a(r("ModelLevelConstraint"))) },
        { json: "latest_version", js: "latest_version", typ: u(undefined, u(3.14, null, "")) },
        { json: "version", js: "version", typ: u(undefined, u(3.14, null, "")) },
        { json: "attached_node", js: "attached_node", typ: u(undefined, u(null, "")) },
        { json: "column_name", js: "column_name", typ: u(undefined, u(null, "")) },
        { json: "file_key_name", js: "file_key_name", typ: u(undefined, u(null, "")) },
        { json: "test_metadata", js: "test_metadata", typ: u(undefined, r("TestMetadata")) },
        { json: "root_path", js: "root_path", typ: u(undefined, u(null, "")) },
        { json: "external", js: "external", typ: u(undefined, u(null, r("ExternalTable"))) },
        { json: "freshness", js: "freshness", typ: u(undefined, u(r("FreshnessThreshold"), null)) },
        { json: "identifier", js: "identifier", typ: u(undefined, "") },
        { json: "loaded_at_field", js: "loaded_at_field", typ: u(undefined, u(null, "")) },
        { json: "loader", js: "loader", typ: u(undefined, "") },
        { json: "quoting", js: "quoting", typ: u(undefined, r("Quoting")) },
        { json: "source_description", js: "source_description", typ: u(undefined, "") },
        { json: "source_meta", js: "source_meta", typ: u(undefined, m("any")) },
        { json: "source_name", js: "source_name", typ: u(undefined, "") },
        { json: "label", js: "label", typ: u(undefined, u(null, "")) },
        { json: "maturity", js: "maturity", typ: u(undefined, u(r("Maturity"), null)) },
        { json: "owner", js: "owner", typ: u(undefined, r("Owner")) },
        { json: "type", js: "type", typ: u(undefined, r("DisabledType")) },
        { json: "url", js: "url", typ: u(undefined, u(null, "")) },
        { json: "calculation_method", js: "calculation_method", typ: u(undefined, "") },
        { json: "dimensions", js: "dimensions", typ: u(undefined, a("")) },
        { json: "expression", js: "expression", typ: u(undefined, "") },
        { json: "filters", js: "filters", typ: u(undefined, a(r("MetricFilter"))) },
        { json: "model", js: "model", typ: u(undefined, u(null, "")) },
        { json: "model_unique_id", js: "model_unique_id", typ: u(undefined, u(null, "")) },
        { json: "time_grains", js: "time_grains", typ: u(undefined, a("")) },
        { json: "timestamp", js: "timestamp", typ: u(undefined, u(null, "")) },
        { json: "window", js: "window", typ: u(undefined, u(r("MetricTime"), null)) },
    ], false),
    "FileHash": o([
        { json: "checksum", js: "checksum", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "ColumnInfo": o([
        { json: "constraints", js: "constraints", typ: u(undefined, a(r("ColumnLevelConstraint"))) },
        { json: "data_type", js: "data_type", typ: u(undefined, u(null, "")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "quote", js: "quote", typ: u(undefined, u(true, null)) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
    ], "any"),
    "ColumnLevelConstraint": o([
        { json: "expression", js: "expression", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
        { json: "type", js: "type", typ: r("ConstraintType") },
        { json: "warn_unenforced", js: "warn_unenforced", typ: u(undefined, true) },
        { json: "warn_unsupported", js: "warn_unsupported", typ: u(undefined, true) },
    ], false),
    "DisabledConfig": o([
        { json: "alias", js: "alias", typ: u(undefined, u(null, "")) },
        { json: "column_types", js: "column_types", typ: u(undefined, m("any")) },
        { json: "contract", js: "contract", typ: u(undefined, r("ContractConfig")) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "full_refresh", js: "full_refresh", typ: u(undefined, u(true, null)) },
        { json: "grants", js: "grants", typ: u(undefined, m("any")) },
        { json: "group", js: "group", typ: u(undefined, u(null, "")) },
        { json: "incremental_strategy", js: "incremental_strategy", typ: u(undefined, u(null, "")) },
        { json: "materialized", js: "materialized", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "on_schema_change", js: "on_schema_change", typ: u(undefined, u(null, "")) },
        { json: "packages", js: "packages", typ: u(undefined, a("")) },
        { json: "persist_docs", js: "persist_docs", typ: u(undefined, m("any")) },
        { json: "post-hook", js: "post-hook", typ: u(undefined, a(r("Hook"))) },
        { json: "pre-hook", js: "pre-hook", typ: u(undefined, a(r("Hook"))) },
        { json: "quoting", js: "quoting", typ: u(undefined, m("any")) },
        { json: "schema", js: "schema", typ: u(undefined, u(null, "")) },
        { json: "tags", js: "tags", typ: u(undefined, u(a(""), "")) },
        { json: "unique_key", js: "unique_key", typ: u(undefined, u(a(""), null, "")) },
        { json: "error_if", js: "error_if", typ: u(undefined, "") },
        { json: "fail_calc", js: "fail_calc", typ: u(undefined, "") },
        { json: "limit", js: "limit", typ: u(undefined, u(0, null)) },
        { json: "severity", js: "severity", typ: u(undefined, "") },
        { json: "store_failures", js: "store_failures", typ: u(undefined, u(true, null)) },
        { json: "warn_if", js: "warn_if", typ: u(undefined, "") },
        { json: "where", js: "where", typ: u(undefined, u(null, "")) },
        { json: "check_cols", js: "check_cols", typ: u(undefined, u(a(""), null, "")) },
        { json: "strategy", js: "strategy", typ: u(undefined, u(null, "")) },
        { json: "target_database", js: "target_database", typ: u(undefined, u(null, "")) },
        { json: "target_schema", js: "target_schema", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: u(undefined, u(null, "")) },
        { json: "quote_columns", js: "quote_columns", typ: u(undefined, u(true, null)) },
    ], "any"),
    "ContractConfig": o([
        { json: "enforced", js: "enforced", typ: u(undefined, true) },
    ], false),
    "Docs": o([
        { json: "node_color", js: "node_color", typ: u(undefined, u(null, "")) },
        { json: "show", js: "show", typ: u(undefined, true) },
    ], false),
    "Hook": o([
        { json: "index", js: "index", typ: u(undefined, u(0, null)) },
        { json: "sql", js: "sql", typ: "" },
        { json: "transaction", js: "transaction", typ: u(undefined, true) },
    ], false),
    "ModelLevelConstraint": o([
        { json: "columns", js: "columns", typ: u(undefined, a("")) },
        { json: "expression", js: "expression", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
        { json: "type", js: "type", typ: r("ConstraintType") },
        { json: "warn_unenforced", js: "warn_unenforced", typ: u(undefined, true) },
        { json: "warn_unsupported", js: "warn_unsupported", typ: u(undefined, true) },
    ], false),
    "Contract": o([
        { json: "checksum", js: "checksum", typ: u(undefined, u(null, "")) },
        { json: "enforced", js: "enforced", typ: u(undefined, true) },
    ], false),
    "DependsOn": o([
        { json: "macros", js: "macros", typ: u(undefined, a("")) },
        { json: "nodes", js: "nodes", typ: u(undefined, a("")) },
    ], false),
    "ExternalTable": o([
        { json: "file_format", js: "file_format", typ: u(undefined, u(null, "")) },
        { json: "location", js: "location", typ: u(undefined, u(null, "")) },
        { json: "partitions", js: "partitions", typ: u(undefined, u(a(u(r("ExternalPartition"), "")), null)) },
        { json: "row_format", js: "row_format", typ: u(undefined, u(null, "")) },
        { json: "tbl_properties", js: "tbl_properties", typ: u(undefined, u(null, "")) },
    ], "any"),
    "ExternalPartition": o([
        { json: "data_type", js: "data_type", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: u(undefined, "") },
    ], "any"),
    "InjectedCTE": o([
        { json: "id", js: "id", typ: "" },
        { json: "sql", js: "sql", typ: "" },
    ], false),
    "MetricFilter": o([
        { json: "field", js: "field", typ: "" },
        { json: "operator", js: "operator", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "FreshnessThreshold": o([
        { json: "error_after", js: "error_after", typ: u(undefined, u(r("Time"), null)) },
        { json: "filter", js: "filter", typ: u(undefined, u(null, "")) },
        { json: "warn_after", js: "warn_after", typ: u(undefined, u(r("Time"), null)) },
    ], false),
    "Time": o([
        { json: "count", js: "count", typ: u(undefined, u(0, null)) },
        { json: "period", js: "period", typ: u(undefined, u(r("TimePeriod"), null)) },
    ], false),
    "Owner": o([
        { json: "email", js: "email", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
    ], "any"),
    "Quoting": o([
        { json: "column", js: "column", typ: u(undefined, u(true, null)) },
        { json: "database", js: "database", typ: u(undefined, u(true, null)) },
        { json: "identifier", js: "identifier", typ: u(undefined, u(true, null)) },
        { json: "schema", js: "schema", typ: u(undefined, u(true, null)) },
    ], false),
    "RefArgs": o([
        { json: "name", js: "name", typ: "" },
        { json: "package", js: "package", typ: u(undefined, u(null, "")) },
        { json: "version", js: "version", typ: u(undefined, u(3.14, null, "")) },
    ], false),
    "TestMetadata": o([
        { json: "kwargs", js: "kwargs", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "namespace", js: "namespace", typ: u(undefined, u(null, "")) },
    ], false),
    "MetricTime": o([
        { json: "count", js: "count", typ: u(undefined, u(0, null)) },
        { json: "period", js: "period", typ: u(undefined, u(r("MetricTimePeriod"), null)) },
    ], false),
    "Documentation": o([
        { json: "block_contents", js: "block_contents", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "resource_type", js: "resource_type", typ: r("DocResourceType") },
        { json: "unique_id", js: "unique_id", typ: "" },
    ], false),
    "Exposure": o([
        { json: "config", js: "config", typ: u(undefined, r("ExposureConfig")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("ExposureDependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "label", js: "label", typ: u(undefined, u(null, "")) },
        { json: "maturity", js: "maturity", typ: u(undefined, u(r("Maturity"), null)) },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "owner", js: "owner", typ: r("Owner") },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "refs", js: "refs", typ: u(undefined, a(r("RefArgs"))) },
        { json: "resource_type", js: "resource_type", typ: r("ExposureResourceType") },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "type", js: "type", typ: r("DisabledType") },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
        { json: "url", js: "url", typ: u(undefined, u(null, "")) },
    ], false),
    "ExposureConfig": o([
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
    ], "any"),
    "ExposureDependsOn": o([
        { json: "macros", js: "macros", typ: u(undefined, a("")) },
        { json: "nodes", js: "nodes", typ: u(undefined, a("")) },
    ], false),
    "Group": o([
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "owner", js: "owner", typ: r("Owner") },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "resource_type", js: "resource_type", typ: r("GroupResourceType") },
        { json: "unique_id", js: "unique_id", typ: "" },
    ], false),
    "Macro": o([
        { json: "arguments", js: "arguments", typ: u(undefined, a(r("MacroArgument"))) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("MacroDependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "macro_sql", js: "macro_sql", typ: "" },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "patch_path", js: "patch_path", typ: u(undefined, u(null, "")) },
        { json: "path", js: "path", typ: "" },
        { json: "resource_type", js: "resource_type", typ: r("MacroResourceType") },
        { json: "supported_languages", js: "supported_languages", typ: u(undefined, u(a(r("SupportedLanguage")), null)) },
        { json: "unique_id", js: "unique_id", typ: "" },
    ], false),
    "MacroArgument": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: u(undefined, u(null, "")) },
    ], false),
    "MacroDependsOn": o([
        { json: "macros", js: "macros", typ: u(undefined, a("")) },
    ], false),
    "ManifestMetadata": o([
        { json: "adapter_type", js: "adapter_type", typ: u(undefined, u(null, "")) },
        { json: "dbt_schema_version", js: "dbt_schema_version", typ: u(undefined, "") },
        { json: "dbt_version", js: "dbt_version", typ: u(undefined, "") },
        { json: "env", js: "env", typ: u(undefined, m("")) },
        { json: "generated_at", js: "generated_at", typ: u(undefined, Date) },
        { json: "invocation_id", js: "invocation_id", typ: u(undefined, u(null, "")) },
        { json: "project_id", js: "project_id", typ: u(undefined, u(null, "")) },
        { json: "send_anonymous_usage_stats", js: "send_anonymous_usage_stats", typ: u(undefined, u(true, null)) },
        { json: "user_id", js: "user_id", typ: u(undefined, u(null, "")) },
    ], false),
    "Metric": o([
        { json: "calculation_method", js: "calculation_method", typ: "" },
        { json: "config", js: "config", typ: u(undefined, r("MetricConfig")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("ExposureDependsOn")) },
        { json: "description", js: "description", typ: "" },
        { json: "dimensions", js: "dimensions", typ: a("") },
        { json: "expression", js: "expression", typ: "" },
        { json: "filters", js: "filters", typ: a(r("MetricFilter")) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "group", js: "group", typ: u(undefined, u(null, "")) },
        { json: "label", js: "label", typ: "" },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "model", js: "model", typ: u(undefined, u(null, "")) },
        { json: "model_unique_id", js: "model_unique_id", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "refs", js: "refs", typ: u(undefined, a(r("RefArgs"))) },
        { json: "resource_type", js: "resource_type", typ: r("MetricResourceType") },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "time_grains", js: "time_grains", typ: a("") },
        { json: "timestamp", js: "timestamp", typ: u(undefined, u(null, "")) },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
        { json: "window", js: "window", typ: u(undefined, u(r("MetricTime"), null)) },
    ], false),
    "MetricConfig": o([
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "group", js: "group", typ: u(undefined, u(null, "")) },
    ], "any"),
    "Node": o([
        { json: "alias", js: "alias", typ: "" },
        { json: "build_path", js: "build_path", typ: u(undefined, u(null, "")) },
        { json: "checksum", js: "checksum", typ: r("FileHash") },
        { json: "columns", js: "columns", typ: u(undefined, m(r("ColumnInfo"))) },
        { json: "compiled", js: "compiled", typ: u(undefined, true) },
        { json: "compiled_code", js: "compiled_code", typ: u(undefined, u(null, "")) },
        { json: "compiled_path", js: "compiled_path", typ: u(undefined, u(null, "")) },
        { json: "config", js: "config", typ: u(undefined, r("NodeConfig")) },
        { json: "config_call_dict", js: "config_call_dict", typ: u(undefined, m("any")) },
        { json: "contract", js: "contract", typ: u(undefined, r("Contract")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "deferred", js: "deferred", typ: u(undefined, true) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("DependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "extra_ctes", js: "extra_ctes", typ: u(undefined, a(r("InjectedCTE"))) },
        { json: "extra_ctes_injected", js: "extra_ctes_injected", typ: u(undefined, true) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "group", js: "group", typ: u(undefined, u(null, "")) },
        { json: "language", js: "language", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "patch_path", js: "patch_path", typ: u(undefined, u(null, "")) },
        { json: "path", js: "path", typ: "" },
        { json: "raw_code", js: "raw_code", typ: u(undefined, "") },
        { json: "refs", js: "refs", typ: u(undefined, a(r("RefArgs"))) },
        { json: "relation_name", js: "relation_name", typ: u(undefined, u(null, "")) },
        { json: "resource_type", js: "resource_type", typ: r("NodeResourceType") },
        { json: "schema", js: "schema", typ: "" },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
        { json: "index", js: "index", typ: u(undefined, u(0, null)) },
        { json: "access", js: "access", typ: u(undefined, r("Access")) },
        { json: "constraints", js: "constraints", typ: u(undefined, a(r("ModelLevelConstraint"))) },
        { json: "latest_version", js: "latest_version", typ: u(undefined, u(3.14, null, "")) },
        { json: "version", js: "version", typ: u(undefined, u(3.14, null, "")) },
        { json: "attached_node", js: "attached_node", typ: u(undefined, u(null, "")) },
        { json: "column_name", js: "column_name", typ: u(undefined, u(null, "")) },
        { json: "file_key_name", js: "file_key_name", typ: u(undefined, u(null, "")) },
        { json: "test_metadata", js: "test_metadata", typ: u(undefined, r("TestMetadata")) },
        { json: "root_path", js: "root_path", typ: u(undefined, u(null, "")) },
    ], false),
    "NodeConfig": o([
        { json: "alias", js: "alias", typ: u(undefined, u(null, "")) },
        { json: "column_types", js: "column_types", typ: u(undefined, m("any")) },
        { json: "contract", js: "contract", typ: u(undefined, r("ContractConfig")) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "full_refresh", js: "full_refresh", typ: u(undefined, u(true, null)) },
        { json: "grants", js: "grants", typ: u(undefined, m("any")) },
        { json: "group", js: "group", typ: u(undefined, u(null, "")) },
        { json: "incremental_strategy", js: "incremental_strategy", typ: u(undefined, u(null, "")) },
        { json: "materialized", js: "materialized", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "on_schema_change", js: "on_schema_change", typ: u(undefined, u(null, "")) },
        { json: "packages", js: "packages", typ: u(undefined, a("")) },
        { json: "persist_docs", js: "persist_docs", typ: u(undefined, m("any")) },
        { json: "post-hook", js: "post-hook", typ: u(undefined, a(r("Hook"))) },
        { json: "pre-hook", js: "pre-hook", typ: u(undefined, a(r("Hook"))) },
        { json: "quoting", js: "quoting", typ: u(undefined, m("any")) },
        { json: "schema", js: "schema", typ: u(undefined, u(null, "")) },
        { json: "tags", js: "tags", typ: u(undefined, u(a(""), "")) },
        { json: "unique_key", js: "unique_key", typ: u(undefined, u(a(""), null, "")) },
        { json: "error_if", js: "error_if", typ: u(undefined, "") },
        { json: "fail_calc", js: "fail_calc", typ: u(undefined, "") },
        { json: "limit", js: "limit", typ: u(undefined, u(0, null)) },
        { json: "severity", js: "severity", typ: u(undefined, "") },
        { json: "store_failures", js: "store_failures", typ: u(undefined, u(true, null)) },
        { json: "warn_if", js: "warn_if", typ: u(undefined, "") },
        { json: "where", js: "where", typ: u(undefined, u(null, "")) },
        { json: "check_cols", js: "check_cols", typ: u(undefined, u(a(""), null, "")) },
        { json: "strategy", js: "strategy", typ: u(undefined, u(null, "")) },
        { json: "target_database", js: "target_database", typ: u(undefined, u(null, "")) },
        { json: "target_schema", js: "target_schema", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: u(undefined, u(null, "")) },
        { json: "quote_columns", js: "quote_columns", typ: u(undefined, u(true, null)) },
    ], "any"),
    "SourceDefinition": o([
        { json: "columns", js: "columns", typ: u(undefined, m(r("ColumnInfo"))) },
        { json: "config", js: "config", typ: u(undefined, r("SourceConfig")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "external", js: "external", typ: u(undefined, u(null, r("ExternalTable"))) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "freshness", js: "freshness", typ: u(undefined, u(r("FreshnessThreshold"), null)) },
        { json: "identifier", js: "identifier", typ: "" },
        { json: "loaded_at_field", js: "loaded_at_field", typ: u(undefined, u(null, "")) },
        { json: "loader", js: "loader", typ: "" },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "patch_path", js: "patch_path", typ: u(undefined, u(null, "")) },
        { json: "path", js: "path", typ: "" },
        { json: "quoting", js: "quoting", typ: u(undefined, r("Quoting")) },
        { json: "relation_name", js: "relation_name", typ: u(undefined, u(null, "")) },
        { json: "resource_type", js: "resource_type", typ: r("SourceResourceType") },
        { json: "schema", js: "schema", typ: "" },
        { json: "source_description", js: "source_description", typ: "" },
        { json: "source_meta", js: "source_meta", typ: u(undefined, m("any")) },
        { json: "source_name", js: "source_name", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
    ], false),
    "SourceConfig": o([
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
    ], "any"),
    "Access": [
        "private",
        "protected",
        "public",
    ],
    "ConstraintType": [
        "check",
        "custom",
        "foreign_key",
        "not_null",
        "primary_key",
        "unique",
    ],
    "TimePeriod": [
        "day",
        "hour",
        "minute",
    ],
    "Maturity": [
        "high",
        "low",
        "medium",
    ],
    "DisabledResourceType": [
        "analysis",
        "exposure",
        "metric",
        "model",
        "operation",
        "rpc",
        "sql operation",
        "seed",
        "snapshot",
        "source",
        "test",
    ],
    "DisabledType": [
        "analysis",
        "application",
        "dashboard",
        "ml",
        "notebook",
    ],
    "MetricTimePeriod": [
        "day",
        "month",
        "week",
        "year",
    ],
    "DocResourceType": [
        "doc",
    ],
    "ExposureResourceType": [
        "exposure",
    ],
    "GroupResourceType": [
        "group",
    ],
    "MacroResourceType": [
        "macro",
    ],
    "SupportedLanguage": [
        "python",
        "sql",
    ],
    "MetricResourceType": [
        "metric",
    ],
    "NodeResourceType": [
        "analysis",
        "model",
        "operation",
        "rpc",
        "sql operation",
        "seed",
        "snapshot",
        "test",
    ],
    "SourceResourceType": [
        "source",
    ],
};
