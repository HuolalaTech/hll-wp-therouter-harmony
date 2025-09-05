import { SdkVersion } from './sdk-version.js';
export declare class SdkVersionEnum {
    /**
     * toolchains中打包工具在此版本之后更改名字
     */
    static readonly NEW_PACK_TOOL: SdkVersion;
    /**
     * 要求必须配置UISyntax的版本号
     * 高于该版本号的SDK支持module.json不配置UISyntax
     */
    static readonly REQUIRE_UI_SYNTAX: SdkVersion;
    /**
     * 支持UISyntax的一个定制的版本号
     */
    static readonly SUPPORT_UI_SYNTAX: SdkVersion;
    /**
     * 支持aot编译模式的ohos版本号
     */
    static readonly SUPPORT_AOT_OHOS: SdkVersion;
    /**
     * 解决了aot编译模式卡片编译产物错误的bug的ohos版本号
     */
    static readonly FIXED_AOT_OHOS: SdkVersion;
    /**
     * 支持Restool资源增量编译OHOS最小版本号
     */
    static readonly OHOS_SUPPORT_COMPILE_RESOURCE_INCREMENT: SdkVersion;
    /**
     * 支持Restool资源增量编译半容器最小版本号
     */
    static readonly HOS_SUPPORT_COMPILE_RESOURCE_INCREMENT: SdkVersion;
    /**
     * ohos支持Ohpm工程的最小SDK版本号
     */
    static readonly OHOS_SUPPORT_OHPM_PROJECT: SdkVersion;
    /**
     * hos支持Ohpm工程的最小SDK版本号
     */
    static readonly HOS_SUPPORT_OHPM_PROJECT: SdkVersion;
    /**
     * toolchains中签名工具在sdk此版本之后支持通过API函数调用
     */
    static readonly HOS_SUPPORT_HAP_SIGN_TOOL_API_CALL_API11: SdkVersion;
    static readonly OHOS_SUPPORT_HAP_SIGN_TOOL_API_CALL_API11: SdkVersion;
    static readonly SUPPORT_HAP_SIGN_TOOL_API_CALL_API12: SdkVersion;
}
