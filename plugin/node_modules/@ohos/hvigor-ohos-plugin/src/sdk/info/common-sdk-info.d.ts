import { Component } from '@ohos/sdkmanager-common';
import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { SdkVersion } from '../../version/sdk-version.js';
import { DefaultSdk } from '../default-sdk.js';
import { SdkEtsComponent } from '../impl/sdk-ets-component.js';
import { SdkJsComponent } from '../impl/sdk-js-component.js';
import { SdkNativeComponent } from '../impl/sdk-native-component.js';
import { SdkPreviewerComponent } from '../impl/sdk-previewer-component.js';
import { SdkToolchainsComponent } from '../impl/sdk-toolchains-component.js';
import ApiMeta = ProjectBuildProfile.ApiMeta;
export declare abstract class CommonSdkInfo extends DefaultSdk {
    protected _log: OhosLogger;
    sdkDir: string;
    protected sdkVersion: ApiMeta;
    protected jsComponent: SdkJsComponent | undefined;
    protected etsComponent: SdkEtsComponent | undefined;
    protected nativeComponent: SdkNativeComponent | undefined;
    protected toolchainsComponent: SdkToolchainsComponent | undefined;
    protected previewerComponent: SdkPreviewerComponent | undefined;
    protected constructor(sdkVersion: ApiMeta, sdkDir: string);
    /**
     * 获取当前sdk中对应api 的toolchains组件的小版本号
     *
     * @return {string | undefined}
     */
    getToolchainsComponentVersion(): string | undefined;
    getModuleSchema(): string;
    getAppSchema(): string;
    getAppConfigurationSchema(): string;
    getStartWindowSchema(): string;
    getSystemThemeSchema(): string;
    getInsightIntentSchema(): string;
    getUtdSchema(): string;
    getFormSchema(): string;
    getPageSchema(): string;
    getRouterMapSchema(): string;
    getShortcutsJsonSchema(): string;
    getAppStartupSchema(): string;
    getHspStartupSchema(): string;
    getHarStartupSchema(): string;
    getSysCapSchema(): string;
    getSdkJsDir(): string;
    getSdkEtsDir(): string;
    getSdkVersion(): number;
    getSdkApi(): string;
    getHapTobin(): string;
    getReleaseType(): string;
    getSdkNativeDir(): string;
    getCmakeTool(): string;
    getNativeNinjaTool(): string;
    getNativeToolchain(): string;
    getNdkVersion(): SdkVersion;
    getSdkToolchainsDir(): string;
    getSdkLlvmStrip(): string;
    getSdkLlvmReadElf(): string;
    getRestool(): string;
    getSysCapTool(): string;
    getSysCapFileInEts(): string;
    getSysCapFileInJs(): string;
    getVerifySignConfigTool(): string;
    getJsArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getRichSchema(): string;
    getLiteSchema(): string;
    getEtsArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getEtsComponentVersion(): string;
    getEtsComponentReleaseType(): string;
    getArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getPackageTool(): string;
    getBasePath(): string;
    getPreviewerCommonBinDir(): string;
    getPreviewerPermissionNames(): string[];
    getPreviewerUserGrant(): string[];
    allowSdkPermission(): boolean;
    getSignDir(): string;
    getJsLoader(): string;
    getEtsLoader(): string;
    requireUISyntax(): boolean;
    /**
     * 判断是否是preview构建，且sdk restool工具支持增量编译
     *
     * @param {boolean} isHarmonyOS 是否是HarmonyOS工程
     * @return {boolean} true是，false否
     */
    isPreviewCompileResourceIncrement(isHarmonyOS: boolean): boolean;
    /**
     * 判断SDK版本是否支持Ohpm工程
     * @param isHarmonyOS
     */
    supportOhpmProject(isHarmonyOS: boolean): boolean;
    /**
     * hap-sign-tool.jar是否支持API函数调用
     * @param isHarmonyOS
     */
    supportHapSignToolApiCall(isHarmonyOS: boolean): boolean;
    /**
     * 根据获取到的sdk-component名称创建不同的component实例
     *
     * @param component
     */
    protected initComponent(component: Component): void;
    private findNoAbcTool;
}
