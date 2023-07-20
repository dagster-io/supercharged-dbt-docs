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
 * Mapping[str, Union[dbt.contracts.graph.compiled.CompiledAnalysisNode,
 * dbt.contracts.graph.compiled.CompiledSingularTestNode,
 * dbt.contracts.graph.compiled.CompiledModelNode,
 * dbt.contracts.graph.compiled.CompiledHookNode,
 * dbt.contracts.graph.compiled.CompiledRPCNode,
 * dbt.contracts.graph.compiled.CompiledSqlNode,
 * dbt.contracts.graph.compiled.CompiledGenericTestNode,
 * dbt.contracts.graph.compiled.CompiledSeedNode,
 * dbt.contracts.graph.compiled.CompiledSnapshotNode,
 * dbt.contracts.graph.parsed.ParsedAnalysisNode,
 * dbt.contracts.graph.parsed.ParsedSingularTestNode,
 * dbt.contracts.graph.parsed.ParsedHookNode, dbt.contracts.graph.parsed.ParsedModelNode,
 * dbt.contracts.graph.parsed.ParsedRPCNode, dbt.contracts.graph.parsed.ParsedSqlNode,
 * dbt.contracts.graph.parsed.ParsedGenericTestNode,
 * dbt.contracts.graph.parsed.ParsedSeedNode,
 * dbt.contracts.graph.parsed.ParsedSnapshotNode]], sources: Mapping[str,
 * dbt.contracts.graph.parsed.ParsedSourceDefinition], macros: Mapping[str,
 * dbt.contracts.graph.parsed.ParsedMacro], docs: Mapping[str,
 * dbt.contracts.graph.parsed.ParsedDocumentation], exposures: Mapping[str,
 * dbt.contracts.graph.parsed.ParsedExposure], metrics: Mapping[str,
 * dbt.contracts.graph.parsed.ParsedMetric], selectors: Mapping[str, Any], disabled:
 * Optional[Mapping[str, List[Union[dbt.contracts.graph.compiled.CompiledAnalysisNode,
 * dbt.contracts.graph.compiled.CompiledSingularTestNode,
 * dbt.contracts.graph.compiled.CompiledModelNode,
 * dbt.contracts.graph.compiled.CompiledHookNode,
 * dbt.contracts.graph.compiled.CompiledRPCNode,
 * dbt.contracts.graph.compiled.CompiledSqlNode,
 * dbt.contracts.graph.compiled.CompiledGenericTestNode,
 * dbt.contracts.graph.compiled.CompiledSeedNode,
 * dbt.contracts.graph.compiled.CompiledSnapshotNode,
 * dbt.contracts.graph.parsed.ParsedAnalysisNode,
 * dbt.contracts.graph.parsed.ParsedSingularTestNode,
 * dbt.contracts.graph.parsed.ParsedHookNode, dbt.contracts.graph.parsed.ParsedModelNode,
 * dbt.contracts.graph.parsed.ParsedRPCNode, dbt.contracts.graph.parsed.ParsedSqlNode,
 * dbt.contracts.graph.parsed.ParsedGenericTestNode,
 * dbt.contracts.graph.parsed.ParsedSeedNode, dbt.contracts.graph.parsed.ParsedSnapshotNode,
 * dbt.contracts.graph.parsed.ParsedSourceDefinition]]]], parent_map: Optional[Dict[str,
 * List[str]]], child_map: Optional[Dict[str, List[str]]])
 */
export interface Manifest {
    /**
     * A mapping from parent nodes to their dependents
     */
    child_map?: { [key: string]: string[] } | null;
    /**
     * A mapping of the disabled nodes in the target
     */
    disabled?: { [key: string]: CompiledAnalysisNode[] } | null;
    /**
     * The docs defined in the dbt project and its dependencies
     */
    docs: { [key: string]: ParsedDocumentation };
    /**
     * The exposures defined in the dbt project and its dependencies
     */
    exposures: { [key: string]: ParsedExposure };
    /**
     * The macros defined in the dbt project and its dependencies
     */
    macros: { [key: string]: ParsedMacro };
    /**
     * Metadata about the manifest
     */
    metadata: ManifestMetadata;
    /**
     * The metrics defined in the dbt project and its dependencies
     */
    metrics: { [key: string]: ParsedMetric };
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
    sources: { [key: string]: ParsedSourceDefinition };
}

/**
 * CompiledAnalysisNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str,
 * fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledSingularTestNode(raw_sql: str, compiled: bool, database: Optional[str], schema:
 * str, fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledModelNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str,
 * fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledHookNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None, index: Optional[int] = None)
 *
 * CompiledRPCNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledSqlNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledGenericTestNode(raw_sql: str, test_metadata:
 * dbt.contracts.graph.parsed.TestMetadata, compiled: bool, database: Optional[str], schema:
 * str, fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None, column_name: Optional[str] = None,
 * file_key_name: Optional[str] = None)
 *
 * CompiledSeedNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.SeedConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledSnapshotNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str,
 * fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * ParsedAnalysisNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSingularTestNode(raw_sql: str, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedHookNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, index: Optional[int] = None)
 *
 * ParsedModelNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedRPCNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSqlNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedGenericTestNode(raw_sql: str, test_metadata:
 * dbt.contracts.graph.parsed.TestMetadata, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, column_name: Optional[str] =
 * None, file_key_name: Optional[str] = None)
 *
 * ParsedSeedNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.SeedConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSnapshotNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.SnapshotConfig,
 * _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSourceDefinition(fqn: List[str], database: Optional[str], schema: str, unique_id:
 * str, package_name: str, root_path: str, path: str, original_file_path: str, name: str,
 * source_name: str, source_description: str, loader: str, identifier: str, resource_type:
 * dbt.node_types.NodeType, _event_status: Dict[str, Any] = <factory>, quoting:
 * dbt.contracts.graph.unparsed.Quoting = <factory>, loaded_at_field: Optional[str] = None,
 * freshness: Optional[dbt.contracts.graph.unparsed.FreshnessThreshold] = None, external:
 * Optional[dbt.contracts.graph.unparsed.ExternalTable] = None, description: str = '',
 * columns: Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str,
 * Any] = <factory>, source_meta: Dict[str, Any] = <factory>, tags: List[str] = <factory>,
 * config: dbt.contracts.graph.model_config.SourceConfig = <factory>, patch_path:
 * Optional[pathlib.Path] = None, unrendered_config: Dict[str, Any] = <factory>,
 * relation_name: Optional[str] = None, created_at: float = <factory>)
 */
export interface CompiledAnalysisNode {
    alias?:               string;
    build_path?:          null | string;
    checksum?:            FileHash;
    columns?:             { [key: string]: ColumnInfo };
    compiled?:            boolean;
    compiled_path?:       null | string;
    compiled_sql?:        null | string;
    config?:              DisabledConfig;
    config_call_dict?:    { [key: string]: any };
    created_at?:          number;
    database?:            null | string;
    deferred?:            boolean;
    depends_on?:          DependsOn;
    description?:         string;
    docs?:                Docs;
    extra_ctes?:          InjectedCTE[];
    extra_ctes_injected?: boolean;
    fqn:                  string[];
    meta?:                { [key: string]: any };
    metrics?:             Array<string[]>;
    name:                 string;
    original_file_path:   string;
    package_name:         string;
    patch_path?:          null | string;
    path:                 string;
    raw_sql?:             string;
    refs?:                Array<string[]>;
    relation_name?:       null | string;
    resource_type:        DisabledResourceType;
    root_path:            string;
    schema:               string;
    sources?:             Array<string[]>;
    tags?:                string[];
    unique_id:            string;
    unrendered_config?:   { [key: string]: any };
    index?:               number | null;
    column_name?:         null | string;
    file_key_name?:       null | string;
    test_metadata?:       TestMetadata;
    external?:            null | ExternalTable;
    freshness?:           FreshnessThreshold | null;
    identifier?:          string;
    loaded_at_field?:     null | string;
    loader?:              string;
    quoting?:             Quoting;
    source_description?:  string;
    source_meta?:         { [key: string]: any };
    source_name?:         string;
}

/**
 * FileHash(name: str, checksum: str)
 */
export interface FileHash {
    checksum: string;
    name:     string;
}

/**
 * ColumnInfo(name: str, description: str = '', meta: Dict[str, Any] = <factory>, data_type:
 * Optional[str] = None, quote: Optional[bool] = None, tags: List[str] = <factory>, _extra:
 * Dict[str, Any] = <factory>)
 */
export interface ColumnInfo {
    data_type?:   null | string;
    description?: string;
    meta?:        { [key: string]: any };
    name:         string;
    quote?:       boolean | null;
    tags?:        string[];
    [property: string]: any;
}

/**
 * NodeConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'view', persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>)
 *
 * TestConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = 'dbt_test__audit', database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'test', severity: dbt.contracts.graph.model_config.Severity = 'ERROR', store_failures:
 * Optional[bool] = None, where: Optional[str] = None, limit: Optional[int] = None,
 * fail_calc: str = 'count(*)', warn_if: str = '!= 0', error_if: str = '!= 0')
 *
 * SeedConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'seed', persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>, quote_columns: Optional[bool] = None)
 *
 * SnapshotConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias:
 * Optional[str] = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'snapshot', persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Optional[str] = None, on_schema_change: Optional[str] = 'ignore', grants:
 * Dict[str, Any] = <factory>, strategy: Optional[str] = None, target_schema: Optional[str]
 * = None, target_database: Optional[str] = None, updated_at: Optional[str] = None,
 * check_cols: Union[str, List[str], NoneType] = None)
 *
 * SourceConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True)
 */
export interface DisabledConfig {
    alias?:            null | string;
    column_types?:     { [key: string]: any };
    database?:         null | string;
    enabled?:          boolean;
    full_refresh?:     boolean | null;
    grants?:           { [key: string]: any };
    materialized?:     string;
    meta?:             { [key: string]: any };
    on_schema_change?: null | string;
    persist_docs?:     { [key: string]: any };
    "post-hook"?:      Hook[];
    "pre-hook"?:       Hook[];
    quoting?:          { [key: string]: any };
    schema?:           null | string;
    tags?:             string[] | string;
    unique_key?:       string[] | null | string;
    error_if?:         string;
    fail_calc?:        string;
    limit?:            number | null;
    severity?:         string;
    store_failures?:   boolean | null;
    warn_if?:          string;
    where?:            null | string;
    quote_columns?:    boolean | null;
    check_cols?:       string[] | null | string;
    strategy?:         null | string;
    target_database?:  null | string;
    target_schema?:    null | string;
    updated_at?:       null | string;
    [property: string]: any;
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
 * DependsOn(macros: List[str] = <factory>, nodes: List[str] = <factory>)
 */
export interface DependsOn {
    macros?: string[];
    nodes?:  string[];
}

/**
 * Docs(show: bool = True)
 */
export interface Docs {
    show?: boolean;
}

/**
 * ExternalTable(_extra: Dict[str, Any] = <factory>, location: Optional[str] = None,
 * file_format: Optional[str] = None, row_format: Optional[str] = None, tbl_properties:
 * Optional[str] = None, partitions:
 * Optional[List[dbt.contracts.graph.unparsed.ExternalPartition]] = None)
 */
export interface ExternalTable {
    file_format?:    null | string;
    location?:       null | string;
    partitions?:     ExternalPartition[] | null;
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
 * InjectedCTE(id: str, sql: str)
 */
export interface InjectedCTE {
    id:  string;
    sql: string;
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
    period?: Period | null;
}

export enum Period {
    Day = "day",
    Hour = "hour",
    Minute = "minute",
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

export enum DisabledResourceType {
    Analysis = "analysis",
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

/**
 * ParsedDocumentation(unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, block_contents: str)
 */
export interface ParsedDocumentation {
    block_contents:     string;
    name:               string;
    original_file_path: string;
    package_name:       string;
    path:               string;
    root_path:          string;
    unique_id:          string;
}

/**
 * ParsedExposure(fqn: List[str], unique_id: str, package_name: str, root_path: str, path:
 * str, original_file_path: str, name: str, type: dbt.contracts.graph.unparsed.ExposureType,
 * owner: dbt.contracts.graph.unparsed.ExposureOwner, resource_type: dbt.node_types.NodeType
 * = <NodeType.Exposure: 'exposure'>, description: str = '', maturity:
 * Optional[dbt.contracts.graph.unparsed.MaturityType] = None, meta: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, url: Optional[str] = None, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, refs: List[List[str]] = <factory>,
 * sources: List[List[str]] = <factory>, created_at: float = <factory>)
 */
export interface ParsedExposure {
    created_at?:        number;
    depends_on?:        DependsOn;
    description?:       string;
    fqn:                string[];
    maturity?:          Maturity | null;
    meta?:              { [key: string]: any };
    name:               string;
    original_file_path: string;
    owner:              ExposureOwner;
    package_name:       string;
    path:               string;
    refs?:              Array<string[]>;
    resource_type?:     ExposureResourceType;
    root_path:          string;
    sources?:           Array<string[]>;
    tags?:              string[];
    type:               Type;
    unique_id:          string;
    url?:               null | string;
}

export enum Maturity {
    High = "high",
    Low = "low",
    Medium = "medium",
}

/**
 * ExposureOwner(email: str, name: Optional[str] = None)
 */
export interface ExposureOwner {
    email: string;
    name?: null | string;
}

export enum ExposureResourceType {
    Analysis = "analysis",
    DocsBlock = "docs block",
    Exposure = "exposure",
    Macro = "macro",
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

export enum Type {
    Analysis = "analysis",
    Application = "application",
    Dashboard = "dashboard",
    Ml = "ml",
    Notebook = "notebook",
}

/**
 * ParsedMacro(unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, macro_sql: str, resource_type:
 * dbt.node_types.NodeType, tags: List[str] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.MacroDependsOn = <factory>, description: str = '', meta:
 * Dict[str, Any] = <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>,
 * patch_path: Optional[str] = None, arguments:
 * List[dbt.contracts.graph.unparsed.MacroArgument] = <factory>, created_at: float =
 * <factory>)
 */
export interface ParsedMacro {
    arguments?:         MacroArgument[];
    created_at?:        number;
    depends_on?:        MacroDependsOn;
    description?:       string;
    docs?:              Docs;
    macro_sql:          string;
    meta?:              { [key: string]: any };
    name:               string;
    original_file_path: string;
    package_name:       string;
    patch_path?:        null | string;
    path:               string;
    resource_type:      MacroResourceType;
    root_path:          string;
    tags?:              string[];
    unique_id:          string;
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
 * MacroDependsOn(macros: List[str] = <factory>)
 */
export interface MacroDependsOn {
    macros?: string[];
}

export enum MacroResourceType {
    Macro = "macro",
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
 * ParsedMetric(fqn: List[str], unique_id: str, package_name: str, root_path: str, path:
 * str, original_file_path: str, name: str, description: str, label: str, type: str, sql:
 * str, timestamp: Optional[str], filters: List[dbt.contracts.graph.unparsed.MetricFilter],
 * time_grains: List[str], dimensions: List[str], model: Optional[str] = None,
 * model_unique_id: Optional[str] = None, resource_type: dbt.node_types.NodeType =
 * <NodeType.Metric: 'metric'>, meta: Dict[str, Any] = <factory>, tags: List[str] =
 * <factory>, sources: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, refs: List[List[str]] = <factory>,
 * metrics: List[List[str]] = <factory>, created_at: float = <factory>)
 */
export interface ParsedMetric {
    created_at?:        number;
    depends_on?:        DependsOn;
    description:        string;
    dimensions:         string[];
    filters:            MetricFilter[];
    fqn:                string[];
    label:              string;
    meta?:              { [key: string]: any };
    metrics?:           Array<string[]>;
    model?:             null | string;
    model_unique_id?:   null | string;
    name:               string;
    original_file_path: string;
    package_name:       string;
    path:               string;
    refs?:              Array<string[]>;
    resource_type?:     ExposureResourceType;
    root_path:          string;
    sources?:           Array<string[]>;
    sql:                string;
    tags?:              string[];
    time_grains:        string[];
    timestamp?:         null | string;
    type:               string;
    unique_id:          string;
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
 * CompiledAnalysisNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str,
 * fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledSingularTestNode(raw_sql: str, compiled: bool, database: Optional[str], schema:
 * str, fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledModelNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str,
 * fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledHookNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None, index: Optional[int] = None)
 *
 * CompiledRPCNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledSqlNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledGenericTestNode(raw_sql: str, test_metadata:
 * dbt.contracts.graph.parsed.TestMetadata, compiled: bool, database: Optional[str], schema:
 * str, fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None, column_name: Optional[str] = None,
 * file_key_name: Optional[str] = None)
 *
 * CompiledSeedNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.SeedConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * CompiledSnapshotNode(raw_sql: str, compiled: bool, database: Optional[str], schema: str,
 * fqn: List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.NodeConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, compiled_sql: Optional[str] =
 * None, extra_ctes_injected: bool = False, extra_ctes:
 * List[dbt.contracts.graph.compiled.InjectedCTE] = <factory>, relation_name: Optional[str]
 * = None, _pre_injected_sql: Optional[str] = None)
 *
 * ParsedAnalysisNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSingularTestNode(raw_sql: str, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedHookNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>, index: Optional[int] = None)
 *
 * ParsedModelNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedRPCNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSqlNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.NodeConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedGenericTestNode(raw_sql: str, test_metadata:
 * dbt.contracts.graph.parsed.TestMetadata, database: Optional[str], schema: str, fqn:
 * List[str], unique_id: str, package_name: str, root_path: str, path: str,
 * original_file_path: str, name: str, resource_type: dbt.node_types.NodeType, alias: str,
 * checksum: dbt.contracts.files.FileHash, config:
 * dbt.contracts.graph.model_config.TestConfig = <factory>, _event_status: Dict[str, Any] =
 * <factory>, tags: List[str] = <factory>, refs: List[List[str]] = <factory>, sources:
 * List[List[str]] = <factory>, metrics: List[List[str]] = <factory>, depends_on:
 * dbt.contracts.graph.parsed.DependsOn = <factory>, description: str = '', columns:
 * Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] =
 * <factory>, docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str]
 * = None, compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred:
 * bool = False, unrendered_config: Dict[str, Any] = <factory>, created_at: float =
 * <factory>, config_call_dict: Dict[str, Any] = <factory>, column_name: Optional[str] =
 * None, file_key_name: Optional[str] = None)
 *
 * ParsedSeedNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.SeedConfig =
 * <factory>, _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 *
 * ParsedSnapshotNode(raw_sql: str, database: Optional[str], schema: str, fqn: List[str],
 * unique_id: str, package_name: str, root_path: str, path: str, original_file_path: str,
 * name: str, resource_type: dbt.node_types.NodeType, alias: str, checksum:
 * dbt.contracts.files.FileHash, config: dbt.contracts.graph.model_config.SnapshotConfig,
 * _event_status: Dict[str, Any] = <factory>, tags: List[str] = <factory>, refs:
 * List[List[str]] = <factory>, sources: List[List[str]] = <factory>, metrics:
 * List[List[str]] = <factory>, depends_on: dbt.contracts.graph.parsed.DependsOn =
 * <factory>, description: str = '', columns: Dict[str,
 * dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str, Any] = <factory>,
 * docs: dbt.contracts.graph.unparsed.Docs = <factory>, patch_path: Optional[str] = None,
 * compiled_path: Optional[str] = None, build_path: Optional[str] = None, deferred: bool =
 * False, unrendered_config: Dict[str, Any] = <factory>, created_at: float = <factory>,
 * config_call_dict: Dict[str, Any] = <factory>)
 */
export interface Node {
    alias:                string;
    build_path?:          null | string;
    checksum:             FileHash;
    columns?:             { [key: string]: ColumnInfo };
    compiled?:            boolean;
    compiled_path?:       null | string;
    compiled_sql?:        null | string;
    config?:              NodeConfig;
    config_call_dict?:    { [key: string]: any };
    created_at?:          number;
    database?:            null | string;
    deferred?:            boolean;
    depends_on?:          DependsOn;
    description?:         string;
    docs?:                Docs;
    extra_ctes?:          InjectedCTE[];
    extra_ctes_injected?: boolean;
    fqn:                  string[];
    meta?:                { [key: string]: any };
    metrics?:             Array<string[]>;
    name:                 string;
    original_file_path:   string;
    package_name:         string;
    patch_path?:          null | string;
    path:                 string;
    raw_sql:              string;
    refs?:                Array<string[]>;
    relation_name?:       null | string;
    resource_type:        NodeResourceType;
    root_path:            string;
    schema:               string;
    sources?:             Array<string[]>;
    tags?:                string[];
    unique_id:            string;
    unrendered_config?:   { [key: string]: any };
    index?:               number | null;
    column_name?:         null | string;
    file_key_name?:       null | string;
    test_metadata?:       TestMetadata;
}

/**
 * NodeConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'view', persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>)
 *
 * TestConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = 'dbt_test__audit', database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'test', severity: dbt.contracts.graph.model_config.Severity = 'ERROR', store_failures:
 * Optional[bool] = None, where: Optional[str] = None, limit: Optional[int] = None,
 * fail_calc: str = 'count(*)', warn_if: str = '!= 0', error_if: str = '!= 0')
 *
 * SeedConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias: Optional[str]
 * = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'seed', persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Union[str, List[str], NoneType] = None, on_schema_change: Optional[str] =
 * 'ignore', grants: Dict[str, Any] = <factory>, quote_columns: Optional[bool] = None)
 *
 * SnapshotConfig(_extra: Dict[str, Any] = <factory>, enabled: bool = True, alias:
 * Optional[str] = None, schema: Optional[str] = None, database: Optional[str] = None, tags:
 * Union[List[str], str] = <factory>, meta: Dict[str, Any] = <factory>, materialized: str =
 * 'snapshot', persist_docs: Dict[str, Any] = <factory>, post_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, pre_hook:
 * List[dbt.contracts.graph.model_config.Hook] = <factory>, quoting: Dict[str, Any] =
 * <factory>, column_types: Dict[str, Any] = <factory>, full_refresh: Optional[bool] = None,
 * unique_key: Optional[str] = None, on_schema_change: Optional[str] = 'ignore', grants:
 * Dict[str, Any] = <factory>, strategy: Optional[str] = None, target_schema: Optional[str]
 * = None, target_database: Optional[str] = None, updated_at: Optional[str] = None,
 * check_cols: Union[str, List[str], NoneType] = None)
 */
export interface NodeConfig {
    alias?:            null | string;
    column_types?:     { [key: string]: any };
    database?:         null | string;
    enabled?:          boolean;
    full_refresh?:     boolean | null;
    grants?:           { [key: string]: any };
    materialized?:     string;
    meta?:             { [key: string]: any };
    on_schema_change?: null | string;
    persist_docs?:     { [key: string]: any };
    "post-hook"?:      Hook[];
    "pre-hook"?:       Hook[];
    quoting?:          { [key: string]: any };
    schema?:           null | string;
    tags?:             string[] | string;
    unique_key?:       string[] | null | string;
    error_if?:         string;
    fail_calc?:        string;
    limit?:            number | null;
    severity?:         string;
    store_failures?:   boolean | null;
    warn_if?:          string;
    where?:            null | string;
    quote_columns?:    boolean | null;
    check_cols?:       string[] | null | string;
    strategy?:         null | string;
    target_database?:  null | string;
    target_schema?:    null | string;
    updated_at?:       null | string;
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
 * ParsedSourceDefinition(fqn: List[str], database: Optional[str], schema: str, unique_id:
 * str, package_name: str, root_path: str, path: str, original_file_path: str, name: str,
 * source_name: str, source_description: str, loader: str, identifier: str, resource_type:
 * dbt.node_types.NodeType, _event_status: Dict[str, Any] = <factory>, quoting:
 * dbt.contracts.graph.unparsed.Quoting = <factory>, loaded_at_field: Optional[str] = None,
 * freshness: Optional[dbt.contracts.graph.unparsed.FreshnessThreshold] = None, external:
 * Optional[dbt.contracts.graph.unparsed.ExternalTable] = None, description: str = '',
 * columns: Dict[str, dbt.contracts.graph.parsed.ColumnInfo] = <factory>, meta: Dict[str,
 * Any] = <factory>, source_meta: Dict[str, Any] = <factory>, tags: List[str] = <factory>,
 * config: dbt.contracts.graph.model_config.SourceConfig = <factory>, patch_path:
 * Optional[pathlib.Path] = None, unrendered_config: Dict[str, Any] = <factory>,
 * relation_name: Optional[str] = None, created_at: float = <factory>)
 */
export interface ParsedSourceDefinition {
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
    root_path:          string;
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
        { json: "disabled", js: "disabled", typ: u(undefined, u(m(a(r("CompiledAnalysisNode"))), null)) },
        { json: "docs", js: "docs", typ: m(r("ParsedDocumentation")) },
        { json: "exposures", js: "exposures", typ: m(r("ParsedExposure")) },
        { json: "macros", js: "macros", typ: m(r("ParsedMacro")) },
        { json: "metadata", js: "metadata", typ: r("ManifestMetadata") },
        { json: "metrics", js: "metrics", typ: m(r("ParsedMetric")) },
        { json: "nodes", js: "nodes", typ: m(r("Node")) },
        { json: "parent_map", js: "parent_map", typ: u(undefined, u(m(a("")), null)) },
        { json: "selectors", js: "selectors", typ: m("any") },
        { json: "sources", js: "sources", typ: m(r("ParsedSourceDefinition")) },
    ], false),
    "CompiledAnalysisNode": o([
        { json: "alias", js: "alias", typ: u(undefined, "") },
        { json: "build_path", js: "build_path", typ: u(undefined, u(null, "")) },
        { json: "checksum", js: "checksum", typ: u(undefined, r("FileHash")) },
        { json: "columns", js: "columns", typ: u(undefined, m(r("ColumnInfo"))) },
        { json: "compiled", js: "compiled", typ: u(undefined, true) },
        { json: "compiled_path", js: "compiled_path", typ: u(undefined, u(null, "")) },
        { json: "compiled_sql", js: "compiled_sql", typ: u(undefined, u(null, "")) },
        { json: "config", js: "config", typ: u(undefined, r("DisabledConfig")) },
        { json: "config_call_dict", js: "config_call_dict", typ: u(undefined, m("any")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "deferred", js: "deferred", typ: u(undefined, true) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("DependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "extra_ctes", js: "extra_ctes", typ: u(undefined, a(r("InjectedCTE"))) },
        { json: "extra_ctes_injected", js: "extra_ctes_injected", typ: u(undefined, true) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "patch_path", js: "patch_path", typ: u(undefined, u(null, "")) },
        { json: "path", js: "path", typ: "" },
        { json: "raw_sql", js: "raw_sql", typ: u(undefined, "") },
        { json: "refs", js: "refs", typ: u(undefined, a(a(""))) },
        { json: "relation_name", js: "relation_name", typ: u(undefined, u(null, "")) },
        { json: "resource_type", js: "resource_type", typ: r("DisabledResourceType") },
        { json: "root_path", js: "root_path", typ: "" },
        { json: "schema", js: "schema", typ: "" },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
        { json: "index", js: "index", typ: u(undefined, u(0, null)) },
        { json: "column_name", js: "column_name", typ: u(undefined, u(null, "")) },
        { json: "file_key_name", js: "file_key_name", typ: u(undefined, u(null, "")) },
        { json: "test_metadata", js: "test_metadata", typ: u(undefined, r("TestMetadata")) },
        { json: "external", js: "external", typ: u(undefined, u(null, r("ExternalTable"))) },
        { json: "freshness", js: "freshness", typ: u(undefined, u(r("FreshnessThreshold"), null)) },
        { json: "identifier", js: "identifier", typ: u(undefined, "") },
        { json: "loaded_at_field", js: "loaded_at_field", typ: u(undefined, u(null, "")) },
        { json: "loader", js: "loader", typ: u(undefined, "") },
        { json: "quoting", js: "quoting", typ: u(undefined, r("Quoting")) },
        { json: "source_description", js: "source_description", typ: u(undefined, "") },
        { json: "source_meta", js: "source_meta", typ: u(undefined, m("any")) },
        { json: "source_name", js: "source_name", typ: u(undefined, "") },
    ], false),
    "FileHash": o([
        { json: "checksum", js: "checksum", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "ColumnInfo": o([
        { json: "data_type", js: "data_type", typ: u(undefined, u(null, "")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "quote", js: "quote", typ: u(undefined, u(true, null)) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
    ], "any"),
    "DisabledConfig": o([
        { json: "alias", js: "alias", typ: u(undefined, u(null, "")) },
        { json: "column_types", js: "column_types", typ: u(undefined, m("any")) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "full_refresh", js: "full_refresh", typ: u(undefined, u(true, null)) },
        { json: "grants", js: "grants", typ: u(undefined, m("any")) },
        { json: "materialized", js: "materialized", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "on_schema_change", js: "on_schema_change", typ: u(undefined, u(null, "")) },
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
        { json: "quote_columns", js: "quote_columns", typ: u(undefined, u(true, null)) },
        { json: "check_cols", js: "check_cols", typ: u(undefined, u(a(""), null, "")) },
        { json: "strategy", js: "strategy", typ: u(undefined, u(null, "")) },
        { json: "target_database", js: "target_database", typ: u(undefined, u(null, "")) },
        { json: "target_schema", js: "target_schema", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: u(undefined, u(null, "")) },
    ], "any"),
    "Hook": o([
        { json: "index", js: "index", typ: u(undefined, u(0, null)) },
        { json: "sql", js: "sql", typ: "" },
        { json: "transaction", js: "transaction", typ: u(undefined, true) },
    ], false),
    "DependsOn": o([
        { json: "macros", js: "macros", typ: u(undefined, a("")) },
        { json: "nodes", js: "nodes", typ: u(undefined, a("")) },
    ], false),
    "Docs": o([
        { json: "show", js: "show", typ: u(undefined, true) },
    ], false),
    "ExternalTable": o([
        { json: "file_format", js: "file_format", typ: u(undefined, u(null, "")) },
        { json: "location", js: "location", typ: u(undefined, u(null, "")) },
        { json: "partitions", js: "partitions", typ: u(undefined, u(a(r("ExternalPartition")), null)) },
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
    "FreshnessThreshold": o([
        { json: "error_after", js: "error_after", typ: u(undefined, u(r("Time"), null)) },
        { json: "filter", js: "filter", typ: u(undefined, u(null, "")) },
        { json: "warn_after", js: "warn_after", typ: u(undefined, u(r("Time"), null)) },
    ], false),
    "Time": o([
        { json: "count", js: "count", typ: u(undefined, u(0, null)) },
        { json: "period", js: "period", typ: u(undefined, u(r("Period"), null)) },
    ], false),
    "Quoting": o([
        { json: "column", js: "column", typ: u(undefined, u(true, null)) },
        { json: "database", js: "database", typ: u(undefined, u(true, null)) },
        { json: "identifier", js: "identifier", typ: u(undefined, u(true, null)) },
        { json: "schema", js: "schema", typ: u(undefined, u(true, null)) },
    ], false),
    "TestMetadata": o([
        { json: "kwargs", js: "kwargs", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "namespace", js: "namespace", typ: u(undefined, u(null, "")) },
    ], false),
    "ParsedDocumentation": o([
        { json: "block_contents", js: "block_contents", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "root_path", js: "root_path", typ: "" },
        { json: "unique_id", js: "unique_id", typ: "" },
    ], false),
    "ParsedExposure": o([
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("DependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "maturity", js: "maturity", typ: u(undefined, u(r("Maturity"), null)) },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "owner", js: "owner", typ: r("ExposureOwner") },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "refs", js: "refs", typ: u(undefined, a(a(""))) },
        { json: "resource_type", js: "resource_type", typ: u(undefined, r("ExposureResourceType")) },
        { json: "root_path", js: "root_path", typ: "" },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "type", js: "type", typ: r("Type") },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "url", js: "url", typ: u(undefined, u(null, "")) },
    ], false),
    "ExposureOwner": o([
        { json: "email", js: "email", typ: "" },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
    ], false),
    "ParsedMacro": o([
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
        { json: "root_path", js: "root_path", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
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
    "ParsedMetric": o([
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("DependsOn")) },
        { json: "description", js: "description", typ: "" },
        { json: "dimensions", js: "dimensions", typ: a("") },
        { json: "filters", js: "filters", typ: a(r("MetricFilter")) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "label", js: "label", typ: "" },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "model", js: "model", typ: u(undefined, u(null, "")) },
        { json: "model_unique_id", js: "model_unique_id", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "path", js: "path", typ: "" },
        { json: "refs", js: "refs", typ: u(undefined, a(a(""))) },
        { json: "resource_type", js: "resource_type", typ: u(undefined, r("ExposureResourceType")) },
        { json: "root_path", js: "root_path", typ: "" },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "sql", js: "sql", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "time_grains", js: "time_grains", typ: a("") },
        { json: "timestamp", js: "timestamp", typ: u(undefined, u(null, "")) },
        { json: "type", js: "type", typ: "" },
        { json: "unique_id", js: "unique_id", typ: "" },
    ], false),
    "MetricFilter": o([
        { json: "field", js: "field", typ: "" },
        { json: "operator", js: "operator", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "Node": o([
        { json: "alias", js: "alias", typ: "" },
        { json: "build_path", js: "build_path", typ: u(undefined, u(null, "")) },
        { json: "checksum", js: "checksum", typ: r("FileHash") },
        { json: "columns", js: "columns", typ: u(undefined, m(r("ColumnInfo"))) },
        { json: "compiled", js: "compiled", typ: u(undefined, true) },
        { json: "compiled_path", js: "compiled_path", typ: u(undefined, u(null, "")) },
        { json: "compiled_sql", js: "compiled_sql", typ: u(undefined, u(null, "")) },
        { json: "config", js: "config", typ: u(undefined, r("NodeConfig")) },
        { json: "config_call_dict", js: "config_call_dict", typ: u(undefined, m("any")) },
        { json: "created_at", js: "created_at", typ: u(undefined, 3.14) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "deferred", js: "deferred", typ: u(undefined, true) },
        { json: "depends_on", js: "depends_on", typ: u(undefined, r("DependsOn")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "docs", js: "docs", typ: u(undefined, r("Docs")) },
        { json: "extra_ctes", js: "extra_ctes", typ: u(undefined, a(r("InjectedCTE"))) },
        { json: "extra_ctes_injected", js: "extra_ctes_injected", typ: u(undefined, true) },
        { json: "fqn", js: "fqn", typ: a("") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "metrics", js: "metrics", typ: u(undefined, a(a(""))) },
        { json: "name", js: "name", typ: "" },
        { json: "original_file_path", js: "original_file_path", typ: "" },
        { json: "package_name", js: "package_name", typ: "" },
        { json: "patch_path", js: "patch_path", typ: u(undefined, u(null, "")) },
        { json: "path", js: "path", typ: "" },
        { json: "raw_sql", js: "raw_sql", typ: "" },
        { json: "refs", js: "refs", typ: u(undefined, a(a(""))) },
        { json: "relation_name", js: "relation_name", typ: u(undefined, u(null, "")) },
        { json: "resource_type", js: "resource_type", typ: r("NodeResourceType") },
        { json: "root_path", js: "root_path", typ: "" },
        { json: "schema", js: "schema", typ: "" },
        { json: "sources", js: "sources", typ: u(undefined, a(a(""))) },
        { json: "tags", js: "tags", typ: u(undefined, a("")) },
        { json: "unique_id", js: "unique_id", typ: "" },
        { json: "unrendered_config", js: "unrendered_config", typ: u(undefined, m("any")) },
        { json: "index", js: "index", typ: u(undefined, u(0, null)) },
        { json: "column_name", js: "column_name", typ: u(undefined, u(null, "")) },
        { json: "file_key_name", js: "file_key_name", typ: u(undefined, u(null, "")) },
        { json: "test_metadata", js: "test_metadata", typ: u(undefined, r("TestMetadata")) },
    ], false),
    "NodeConfig": o([
        { json: "alias", js: "alias", typ: u(undefined, u(null, "")) },
        { json: "column_types", js: "column_types", typ: u(undefined, m("any")) },
        { json: "database", js: "database", typ: u(undefined, u(null, "")) },
        { json: "enabled", js: "enabled", typ: u(undefined, true) },
        { json: "full_refresh", js: "full_refresh", typ: u(undefined, u(true, null)) },
        { json: "grants", js: "grants", typ: u(undefined, m("any")) },
        { json: "materialized", js: "materialized", typ: u(undefined, "") },
        { json: "meta", js: "meta", typ: u(undefined, m("any")) },
        { json: "on_schema_change", js: "on_schema_change", typ: u(undefined, u(null, "")) },
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
        { json: "quote_columns", js: "quote_columns", typ: u(undefined, u(true, null)) },
        { json: "check_cols", js: "check_cols", typ: u(undefined, u(a(""), null, "")) },
        { json: "strategy", js: "strategy", typ: u(undefined, u(null, "")) },
        { json: "target_database", js: "target_database", typ: u(undefined, u(null, "")) },
        { json: "target_schema", js: "target_schema", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: u(undefined, u(null, "")) },
    ], "any"),
    "ParsedSourceDefinition": o([
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
        { json: "root_path", js: "root_path", typ: "" },
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
    "Period": [
        "day",
        "hour",
        "minute",
    ],
    "DisabledResourceType": [
        "analysis",
        "model",
        "operation",
        "rpc",
        "sql operation",
        "seed",
        "snapshot",
        "source",
        "test",
    ],
    "Maturity": [
        "high",
        "low",
        "medium",
    ],
    "ExposureResourceType": [
        "analysis",
        "docs block",
        "exposure",
        "macro",
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
    "Type": [
        "analysis",
        "application",
        "dashboard",
        "ml",
        "notebook",
    ],
    "MacroResourceType": [
        "macro",
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
