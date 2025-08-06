import { Component } from '@ohos/sdkmanager-common';
import { SdkComponent } from '../superior/sdk-component.js';
/**
 * sdk toolchains实例
 */
export declare class SdkToolchainsComponent extends SdkComponent {
    static readonly MODULE_CHECK = "modulecheck";
    static readonly CONFIG_CHECK = "configcheck";
    static readonly SYS_CAP_CHECK = "syscapcheck";
    static readonly LIB = "lib";
    static readonly LIBIMAGE_TRANSCODER_SHARED_DLL = "libimage_transcoder_shared.dll";
    static readonly LIBIMAGE_TRANSCODER_SHARED_DYLIB = "libimage_transcoder_shared.dylib";
    static readonly LIBIMAGE_TRANSCODER_SHARED_SO = "libimage_transcoder_shared.so";
    static readonly RICH_SCHEMA = "configSchema_rich.json";
    static readonly LITE_SCHEMA = "configSchema_lite.json";
    constructor(component: Component);
    getRestoolPath(): string;
    getSysCapToolPath(): string;
    getVerifySignConfigToolPath(): string;
    getRichSchema(): string;
    getLiteSchema(): string;
    getPackageToolPath(): string;
    getSignDir(): string;
    getModuleSchema(): string;
    getAppSchema(): string;
    getAppConfigurationSchema(): string;
    getInsightIntentSchema(): string;
    getArkDataSchema(): string;
    getUtdSchema(): string;
    getFormSchema(): string;
    getPageSchema(): string;
    getRouterMapSchema(): string;
    getShortcutsJsonSchema(): string;
    getAppStartupSchema(): string;
    getHspStartupSchema(): string;
    getHarStartupSchema(): string;
    getStartWindowSchema(): string;
    getSysCapSchema(): string;
    getSystemThemeSchema(): string;
}
export declare class HosSdkToolchainsComponent extends SdkToolchainsComponent {
    private component;
    constructor(component: Component);
    getModuleSchema(): string;
    getAppSchema(): string;
    getRichSchema(): string;
    getLiteSchema(): string;
    getHapSignToolV2(): string;
    getHosModuleSchema(): string;
    getReleaseType(): string;
    getHosSignTool(): string;
    getHosToolchainsLibDir(): string;
    getLibimageTranscoderShared(): string;
}
