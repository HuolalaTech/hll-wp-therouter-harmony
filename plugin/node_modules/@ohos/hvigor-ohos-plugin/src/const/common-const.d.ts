/**
 * 工程中的常用变量
 *
 * @since 2021/12/29
 */
export declare class CommonConst {
    static readonly HARMONY_OS: string;
    static readonly BUILD_FILE_NAME: string;
    static readonly PACKAGE_JSON: string;
    static readonly OH_PACKAGE_JSON5: string;
    static readonly DEPENDENCYMAP: string;
    static readonly COMPILE_COMMANDS_JSON: string;
    static readonly OH_MODULES: string;
    static readonly OHPM: string;
    static readonly LOCK_JSON5: string;
    static readonly PKG_MODULES: string;
    static readonly CACHE: string;
    static readonly BUILD: string;
    static readonly REMOTE_HSP: string;
    static readonly BUILD_PROFILE_FIELDS: string;
    static readonly BUILD_MODE: string;
    static readonly BUILD_MODE_NAME: string;
    static readonly LOCAL_PROPERTIES: string;
    static readonly PROFILE_JSON5: string;
    static readonly MODULE_JSON: string;
    static readonly ARK_MODULE_JSON: string;
    static readonly APP_SCHEMA_JSON: string;
    static readonly CONFIGURATION_JSON: string;
    static readonly FORM_SCHEMA_JSON: string;
    static readonly PAGE_SCHEMA_JSON: string;
    static readonly START_WINDOW_SCHEMA_JSON: string;
    static readonly SYSTEM_THEME_JSON: string;
    static readonly PKG_CONTEXT_INFO_JSON: string;
    static readonly LOADER_JSON: string;
    static readonly ROUTER_MAP_SCHEMA_JSON: string;
    static readonly SHORTCUTS_SCHEMA_JSON: string;
    static readonly APP_STARTUP_SCHEMA_JSON: string;
    static readonly HSP_STARTUP_SCHEMA_JSON: string;
    static readonly HAR_STARTUP_SCHEMA_JSON: string;
    static readonly SYS_CAP_SCHEMA_JSON: string;
    static readonly MODULE_JSON5: string;
    static readonly CONFIG_JSON: string;
    static readonly APP_CONFIG: string;
    static readonly APP_SCOPE: string;
    static readonly ETS_WEBPACK_FILE: string;
    static readonly ACE_RICH_WEBPACK_FILE: string;
    static readonly ACE_LITE_WEBPACK_FILE: string;
    static readonly DEBUGGABLE: string;
    static readonly HOT_RELOAD: string;
    static readonly DEBUG_LINE: string;
    static readonly PREVIEW_MODE: string;
    static readonly UNIT_TEST_MODE: string;
    static readonly OHOS_TEST_COVERAGE_SCOPE: string;
    static readonly OHOS_TEST_COVERAGE_ALIAS: string;
    static readonly OHOS_TEST_COVERAGE: string;
    static readonly RPCID_JSON: string;
    static readonly RPCID_SC: string;
    static readonly PCID_SC: string;
    static readonly SYSCAP_JSON: string;
    static readonly DEVICES_GENERAL: string;
    static readonly DEVICES_CUSTOM: string;
    static readonly RES_CONFIG_FILE: string;
    static readonly OPT_COMPRESSION_FILE: string;
    static readonly WARM_UP_SCRIPT: string;
    static readonly ADDED_SYSCAPS: string;
    static readonly REMOVED_SYSCAPS: string;
    static readonly SYSTEM_CAPABILITY: string;
    static readonly DEVICE_TYPE: string;
    static readonly DEVICE_TYPES: string;
    static readonly COMPILE_CONFIG: string;
    static readonly PATCH_CONFIG: string;
    static readonly FRAMEWORK_CONFIGURATION: string;
    static readonly SINGLE_FRAMEWORK: string;
    static readonly DOUBLE_FRAMEWORK: string;
    static readonly OPEN_HARMONY: string;
    static readonly BASE_PROFILE: string;
    static readonly SRC_MAIN: string;
    static readonly SRC_MAIN_RESOURCES = "src/main/resources";
    static readonly ASSEMBLE_APP: string;
    static readonly ASSEMBLE_HAP: string;
    static readonly DEFAULT_PACKAGE_NAME: string;
    static readonly DEFAULT_MODULE_NAME: string;
    static readonly DEFAULT_DESIGN_WIDTH: number;
    static readonly OBFUSCATION_TXT: string;
    static readonly DISTRO_FILTER: string;
    static readonly OHOS_SDK_COMPONENT_DEFINITION: string;
    static readonly HMS_SDK_COMPONENT_DEFINITION: string;
    static readonly OBFUSCATION_FILES_HASH: string;
    static readonly OBFUSCATION_ENABLE: string;
    static readonly COMPILE_SDK_VERSION: string;
    static readonly COMPATIBLE_SDK_VERSION: string;
    static readonly TARGET_SDK_VERSION: string;
    static readonly INSIGHT_INTENT_SCHEMA_JSON: string;
    static readonly UTD_SCHEMA_JSON: string;
    static readonly ARK_DATA_SCHEMA_JSON: string;
    static readonly ENABLE_SIGN_TASK: string;
    static readonly OHOS_PROCESSLIB_OPTIMIZATION: string;
    static readonly KEEP_DEPENDENCY: string;
    static readonly SKIP_NATIVE_INCREMENTAL: string;
    static readonly UNIT_TEST: string;
    static readonly OHOS_TEST: string;
    static readonly COVERAGE_PATH_FILTER: string;
    static readonly COVERAGE_MODE: string;
    static readonly MOCK_CONFIG_JSON5: string;
    static readonly BUILD_DIR_KEY = "ohos.buildDir";
    static readonly HAR_VERSION: string;
    static readonly IS_LOCAL_TEST: string;
    static readonly IS_OHOS_TEST: string;
    static readonly API_VERSION: string;
    static readonly NO_EXTERNAL_IMPORT_BY_PATH: string;
    static readonly PARAMETER_FILE: string;
    static readonly ETS: string;
    static readonly RESOURCES_PATH: string;
    static readonly PAGES: string;
    static readonly ON_DEVICE_TEST: string;
    static readonly ICON: string;
    static readonly LABEL: string;
    static readonly REMOTE_HSP_CACHE = "remoteHspCache.json";
    static readonly BUILD_CACHE_DIR = "build-cache-dir";
    static readonly REQUIRED_DEVICE_TYPE: string;
    static readonly USE_NORMALIZED_OHM_URL: string;
    static readonly ROUTER_MAP: string;
    static readonly SHORTCUTS_FIELD_NAME: string;
    static readonly APP_STARTUP: string;
    static readonly CHANGED_FILE_LIST: 'changedFileList.json';
    static readonly BISHENG: string;
    static readonly ORIGINAL_COMPILER: string;
    static readonly USE_TS_HAR: string;
    static readonly GLOB_MATCH_ALL_FILES: string;
    static readonly SUB_DIR_PREFIX: string;
    static readonly USE_NATIVE_RESOLVER = "ohos.nativeResolver";
    static readonly NO_EMIT_JS = "ohos.arkCompile.noEmitJs";
    static readonly USE_TSC_RESOLVE = "ohos.arkCompile.useTscResolve";
    static readonly USE_COLLECT_DEBUG_SYMBOL = "ohos.collect.debugSymbol";
    static readonly LOCAL_DEPENDENCY_PREFIX = "file:";
    static readonly EMPTY_BUNDLENAME = "ohos.arkCompile.emptyBundleName";
    static readonly HAR_EXCLUDE_HSP_DEPENDENCIES = "ohos.har.excludeHspDependencies";
    static readonly TSC_MAX_FLOW_DEPTH = "maxFlowDepth";
    static readonly HYPIUM_PACKAGE_NAME = "@ohos/hypium";
    static readonly SINGLE_FILE_EMIT = "ohos.arkCompile.singleFileEmit";
    static readonly DEFAULT_ENTITY = "entity.system.home";
    static readonly DEFAULT_ACTION = "action.system.home";
    static readonly COPY_CODE_RESOURCE_ENABLE = "copyCodeResourceEnable";
    static readonly COPY_CODE_RESOURCE_EXCLUDES = "copyCodeResourceExcludes";
    static readonly OHOS_UI_TRANSFORM_OPTIMIZATION = "ohos.uiTransform.Optimization";
}
/**
 * Node环境中的常量
 */
export declare class CommonNodeConst {
    static readonly NODE_EXE: string;
    static readonly NODE: string;
    static readonly NODE_MODULES: string;
}
/**
 * module默认包含的target
 */
export declare class DefaultTargetConst {
    static readonly DEFAULT_TARGET: string;
    static readonly OHOS_TEST_TARGET: string;
    static readonly ALL_TARGET: string;
    static readonly FALLBACK_TARGET: string;
}
export declare class BuildProfileSchemaFileConst {
    static readonly HAP_MODULE_BUILD_PROFILE_SCHEMA_PATH: string;
    static readonly HAR_MODULE_BUILD_PROFILE_SCHEMA_PATH: string;
    static readonly PROJECT_BUILD_PROFILE_SCHEMA_PATH: string;
    static readonly ARKUI_X_CONFIG_SCHEMA_PATH: string;
    static readonly HVIGOR_CONFIG_SCHEMA_PATH: string;
}
export declare class ConfigSchemaFileConst {
    static readonly MODULE_SCHEMA_PATH: string;
    static readonly HAR_MODULE_SCHEMA_PATH: string;
    static readonly PROJECT_SCHEMA_PATH: string;
}
export declare class ArkPackConst {
    static readonly COMPILE_TOOL: string;
    static readonly MAX_ARK_COMPILE_NUM: number;
}
export declare enum PageType {
    PAGE = "page",
    CARD = "card"
}
export declare enum BundleType {
    APP = "app",
    ATOMIC_SERVICE = "atomicService",
    SHARED = "shared",
    APP_PLUGIN = "appPlugin"
}
export declare class CustomTypesConst {
    static readonly CUSTOM_TYPES_SUFFIX: string[];
    static readonly CUSTOM_TYPES_INDEX: string[];
}
export declare class UnitTestConst {
    static readonly TEST_BUILD_ROOT = ".test";
    static readonly TEST_ABILITY = "TestAbility";
    static readonly TEST_DEFAULT_MODE = "module";
    static readonly TEST_DEFAULT_REPLACE_PAGE = "../../../.test/testability/pages/Index";
    static readonly TEST_ABILITY_ETS_PATH = "testability/TestAbility.ets";
    static readonly ENTRY_TEST_ABILITY_PATH = "../../.test/testability/TestAbility.ets";
}
export declare class ArktSTaskConst {
    static readonly LEGACY_UNIT_TEST_ARKTS = "LegacyUnitTestArkTS";
    static readonly UNIT_TEST_ARKTS = "UnitTestArkTS";
    static readonly LINT_ARKTS = "LintArkTS";
}
export declare class NativeConst {
    static readonly SHARED_STL_LIBRARY = "libc++_shared.so";
    static readonly PACKAGE_SUMMARY_FILE = "summary.cmake";
    static readonly PACKAGE_NAME_REGEX: RegExp;
    static readonly INCLUDE_DIR = "include";
    static readonly LIBRARY_FILE_REGEXP = ".*\\.so(.*[0-9])?$";
    static readonly LIBRARY_FILE_PATTERN = "**/*.so*(.*[0-9])";
    static readonly LIBRARY_ALL_FILE_PATTERN = "**/*";
}
export declare class ValidateRegExp {
    static RELATIVE_PATH_REG_EXP: RegExp;
    static DYNAMIC_IMPORT_FILE_SUFFIX_REG_EXP: RegExp;
    static SO_DEPENDENCY_REG_EXP: RegExp;
    static JS_FILE_SUFFIX_REG_EXP: RegExp;
    static STARTUP_TASK_SRC_ENTRY_REG_EXP: RegExp;
    static PRELOAD_STARTUP_TASK_SRC_ENTRY_REG_EXP: RegExp;
    static PAGE_SOURCE_FILE_REG_EXP: RegExp;
}
export declare class HvigorConfigConst {
    static readonly OHOS_PACK_COMPRESS_LEVEL = "ohos.pack.compressLevel";
    static readonly OHOS_COMPILE_LIB_ENTRY = "ohos.compile.lib.entryfile";
    static readonly OHOS_SIGN_HAR = "ohos.sign.har";
    static readonly OHOS_BYTE_CODE_HAR_OPTIMIZE = "ohos.byteCodeHar.integratedOptimization";
    static readonly OHOS_PACK_COMPRESS_LEVEL_MAP: Map<string, string>;
}
/**
 * ability类型常量
 */
export declare class AbilityConst {
    static readonly UI_ABILITY = "abilities";
    static readonly EXTENSION_ABILITY = "extensionAbilities";
}
/**
 * 本地依赖参数化功能使用到的常量
 */
export declare const ParameterizationConst: {
    readonly PREFIX: "@param:";
    readonly REGEX: RegExp;
};
