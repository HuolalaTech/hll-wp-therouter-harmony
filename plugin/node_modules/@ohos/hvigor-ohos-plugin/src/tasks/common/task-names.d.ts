import { TaskDetails } from '@ohos/hvigor';
/**
 * plugin任务类型
 */
export declare enum TaskGroupType {
    ARKTS_TASK_GROUP = "ArkTS",
    JS_TASK_GROUP = "JS",
    RESOURCES_TASK_GROUP = "Resources",
    PACKAGE_TASK_GROUP = "Package",
    SIGN_TASK_GROUP = "Sign",
    VERIFICATION_TASK_GROUP = "Verification",
    GENERATE_TASK_GROUP = "Generate",
    HOOK_TASK_GROUP = "Hook",
    CONFIG_TASK_GROUP = "Config",
    NATIVE_TASK_GROUP = "Native"
}
/**
 * 注册的Hvigor-ohos-plugin任务名的统一管理类
 *
 * @since 2022/9/7
 */
export declare namespace TaskNames {
    class LegacyFATask {
        static readonly COMPILE_ARK: TaskDetails;
        static readonly PROCESS_RESOURCE: TaskDetails;
        static readonly PREVIEW_PROCESS_RESOURCE: TaskDetails;
        static readonly PRE_BUILD: TaskDetails;
        static readonly SYSCAP_TRANSFORM: TaskDetails;
        static readonly GENERATE_METADATA: TaskDetails;
        static readonly COMPILE_LITE_NODE: TaskDetails;
        static readonly COMPILE_NODE: TaskDetails;
        static readonly OHOS_TEST_ARK_COMPILE: TaskDetails;
        static readonly OHOS_TEST_COMPILE_NODE: TaskDetails;
        static readonly MERGE_NODE_ASSETS: TaskDetails;
        static readonly GENERATE_LITE_CODE: TaskDetails;
        static readonly SIGN_LITE_BIN: TaskDetails;
        static readonly COMPILE_RESOURCE: TaskDetails;
        static readonly PREVIEW_COMPILE_RESOURCE: TaskDetails;
        static readonly GENERATE_HAR_JS_MANIFEST: TaskDetails;
        static readonly GENERATE_JS_MANIFEST: TaskDetails;
        static readonly MAKE_PACK_INFO: TaskDetails;
        static readonly MERGE_PROFILE: TaskDetails;
        static readonly PACKAGE_HAP: TaskDetails;
        static readonly GENERATE_LOADER_JSON: TaskDetails;
        static readonly GENERATE_HAR_LOADER_JSON: TaskDetails;
        static readonly PROCESS_PROFILE: TaskDetails;
        static readonly PROCESS_HAR_ARTIFACTS: TaskDetails;
        static readonly PACKAGE_HAR: TaskDetails;
        static readonly PROCESS_OH_PACKAGE_JSON: TaskDetails;
    }
    class Task {
        static readonly PREVIEW_UPDATE_ASSETS: TaskDetails;
        static readonly COMPILE_ARK: TaskDetails;
        static readonly PREVIEW_BUILD: TaskDetails;
        static readonly HOT_RELOAD_BUILD: TaskDetails;
        static readonly UNIT_TEST_BUILD: TaskDetails;
        static readonly TEST: TaskDetails;
        static readonly ON_DEVICE_TEST: TaskDetails;
        static readonly GENERATE_UNIT_TEST_TEMPLATE: TaskDetails;
        static readonly GENERATE_OHOS_TEST_TEMPLATE: TaskDetails;
        static readonly GENERATE_UNIT_TEST_RESULT: TaskDetails;
        static readonly BUILD_UNIT_TEST_RES: TaskDetails;
        static readonly REPLACE_SOURCEMAP_IN_COVERAGE_MODE: TaskDetails;
        static readonly PROCESS_RESOURCE: TaskDetails;
        static readonly PREVIEW_PROCESS_RESOURCE: TaskDetails;
        static readonly PRE_BUILD: TaskDetails;
        static readonly COMPILE_NODE: TaskDetails;
        static readonly OHOS_TEST_COMPILE_NODE: TaskDetails;
        static readonly OHOS_TEST_ARK_COMPILE: TaskDetails;
        static readonly COMPILE_RESOURCE: TaskDetails;
        static readonly PREVIEW_COMPILE_RESOURCE: TaskDetails;
        static readonly MAKE_PACK_INFO: TaskDetails;
        static readonly MAKE_PROJECT_PACK_INFO: TaskDetails;
        static readonly MERGE_PROFILE: TaskDetails;
        static readonly BUILD_NATIVE_WITH_CMAKE: TaskDetails;
        static readonly PACKAGE_HAP: TaskDetails;
        static readonly FAST_PACKAGE: TaskDetails;
        static readonly PACKAGE_HSP: TaskDetails;
        static readonly FAST_PACKAGE_HSP: TaskDetails;
        static readonly GENERATE_PKG_MODULE_JSON: TaskDetails;
        static readonly PROCESS_PROFILE: TaskDetails;
        static readonly GeneratePackRes: TaskDetails;
        static readonly PACKAGE_APP: TaskDetails;
        static readonly BUILD_NATIVE_WITH_NINJA: TaskDetails;
        static readonly GENERATE_LOADER_JSON: TaskDetails;
        static readonly MERGE_RESOURCE: TaskDetails;
        static readonly PACKAGE_HAR: TaskDetails;
        static readonly PROCESS_HAR_ARTIFACTS: TaskDetails;
        static readonly PROCESS_PACKAGE_JSON: TaskDetails;
        static readonly PROCESS_OH_PACKAGE_JSON: TaskDetails;
        static readonly PROCESS_LIB: TaskDetails;
        static readonly DO_NATIVE_STRIP: TaskDetails;
        static readonly CACHE_NATIVE_LIBS: TaskDetails;
        static readonly CONFIGURE_CMAKE: TaskDetails;
        static readonly SYSCAP_TRANSFORM: TaskDetails;
        static PACKAGE_SHARED_HAR: TaskDetails;
        static PREPARE_SHARED_HAR_RES: TaskDetails;
        static PACKAGE_SHARED_TGZ: TaskDetails;
        static GENERATE_METADATA: TaskDetails;
        static readonly PREVIEW: TaskDetails;
        static readonly UNIT_TEST: TaskDetails;
        static readonly HOT_RELOAD: TaskDetails;
        static readonly COLD_RELOAD: TaskDetails;
        static readonly HAR_COMPILE: TaskDetails;
        static readonly HAR_BUILD: TaskDetails;
        static readonly OHOS_TEST_COPY_MOCK_CONFIG_JSON: TaskDetails;
        static readonly UNIT_TEST_COPY_MOCK_CONFIG_JSON: TaskDetails;
        static readonly LINT: TaskDetails;
        static readonly PREPARE_QUICKFIX: TaskDetails;
        static readonly PACKAGE_HQF: TaskDetails;
        static readonly SIGN_HQF: TaskDetails;
        static readonly PROCESS_ROUTER_MAP: TaskDetails;
        static readonly PROCESS_STARTUP_CONFIG: TaskDetails;
        static readonly GENERATE_DEVICE_COVERAGE: TaskDetails;
        static readonly BEFORE_GENERATE_DEVICE_COVERAGE: TaskDetails;
        static readonly GENERATE_PKG_CONTEXT_INFO: TaskDetails;
        static readonly COLLECT_DEBUG_SYMBOL: TaskDetails;
    }
    class CommonTask {
        static readonly PRE_BUILD_APP: TaskDetails;
        static readonly DUPLICATE_DEPENDENCY_CHECK: TaskDetails;
        static readonly SIGN_HAP: TaskDetails;
        static readonly SIGN_HSP: TaskDetails;
        static readonly PACKAGE_SIGN_HAR: TaskDetails;
        static readonly SIGN_MODULE_REMOTE_HSP: TaskDetails;
        static readonly PROCESS_INTEGRATED_HSP: TaskDetails;
        static readonly SIGN_PROJECT_REMOTE_HSP: TaskDetails;
        static readonly SIGN_APP: TaskDetails;
        static readonly VALIDATE_SIGNING: TaskDetails;
        static readonly CLEAN: TaskDetails;
        static readonly REPLACE_PREVIEWER_PAGES: TaskDetails;
        static readonly COPY_PREVIEWER_PROFILE: TaskDetails;
        static readonly LEGACY_HOOK_COMPILE_RESOURCE: TaskDetails;
        static readonly PREVIEW_HOOK_COMPILE_RESOURCE: TaskDetails;
        static readonly PRE_CHECK_SYSCAP: TaskDetails;
        static readonly REPLACE_UNIT_TEST_INDEX_FILE: TaskDetails;
        static readonly UNIT_TEST_PROCESS_PROFILE: TaskDetails;
        static readonly CREATE_BUILD_PROFILE: TaskDetails;
        static readonly CREATE_HAR_BUILD_PROFILE: TaskDetails;
        static readonly CREATE_HAR_MODULE_INFO: TaskDetails;
        static readonly CREATE_MODULE_INFO: TaskDetails;
        static readonly COLLECT_COVERAGE: TaskDetails;
    }
    class CommonHookTask {
        static readonly BUILD_PREVIEWER_RES: TaskDetails;
        static readonly BUILD_HOT_RELOAD_RES: TaskDetails;
        static readonly ASSEMBLE_APP: TaskDetails;
        static readonly ASSEMBLE_HAP: TaskDetails;
        static readonly GEN_ON_DEVICE_TEST_HAP: TaskDetails;
        static readonly ASSEMBLE_HSP: TaskDetails;
        static readonly ASSEMBLE_HAR: TaskDetails;
        static readonly ASSEMBLE_HQF: TaskDetails;
        static readonly COMPILE_NATIVE: TaskDetails;
        static readonly GENERATE_BUILD_PROFILE: TaskDetails;
    }
    class SyncTask {
        static syncTaskName(moduleName: string): string;
    }
}
