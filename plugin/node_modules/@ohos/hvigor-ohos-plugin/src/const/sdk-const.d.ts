import { ComponentPath } from '@ohos/sdkmanager-common';
/**
 * Sdk中的工具的常用变量
 *
 * @since 2021/12/29
 */
export declare class ToolChainsConst {
    static readonly SIGN_TOOL: string;
    static readonly NEW_SIGN_TOOL: string;
    static readonly SDK_SIGN_TOOL_FULL: string;
    static readonly APP_PACKING_TOOL_JAR: string;
    static readonly HMOS_APP_PACKING_TOOL_JAR: string;
    static readonly HAP_TO_BIN_TOOL_JAR: string;
    static readonly ROLL_UP_CONFIG_FILE: string;
}
export declare const SDK_COMPONENTS: ComponentPath[];
export declare class ApiVersion {
    static readonly API_VERSION_16 = 16;
    static readonly API_VERSION_14 = 14;
    static readonly API_VERSION_12 = 12;
    static readonly API_VERSION_11 = 11;
    static readonly API_VERSION_10 = 10;
    static readonly API_VERSION_9 = 9;
    static readonly API_VERSION_8 = 8;
    static readonly DISTRO_FILTER_MIN_API_VERSION = 3;
    static readonly DISTRO_FILTER_MAX_API_VERSION = 30;
}
