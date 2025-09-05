export interface SdkInfo {
    isOhos: boolean;
    sdkDir: string;
    hasRollUpPluginInEtsLoader: boolean;
    hasRollUpPluginInJsLoader: boolean;
    setup(): void;
    getArkUIXSdkDir(): string;
    isPreviewCompileResourceIncrement(isHarmonyOS: boolean): any;
    supportOhpmProject(isHarmonyOS: boolean): any;
    supportHapSignToolApiCall(isHarmonyOS: boolean): boolean;
    /**
     * 检查当前版本sdk是否已经修复了卡片编译的问题
     * @returns {boolean}
     * @private
     */
    checkAotFixedSdkVersion(): boolean;
    /**
     * 获取当前sdk中对应api 的toolchains组件的小版本号
     *
     * @return {string | undefined}
     */
    getToolchainsComponentVersion(): string | undefined;
    getHosToolchainsComponentVersion(): string | undefined;
    getModuleSchema(): string;
    getAppSchema(): string;
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
    getSdkToolchainsDir(): string;
    getHosToolchainsDir(): string;
    getHosToolchainsLibDir(): string;
    getLibimageTranscoderShared(): string;
    getPreviewerCommonBinDir(): string;
    getPreviewerPermissionNames(): string[];
    getPreviewerUserGrant(): string[];
    allowSdkPermission(): boolean;
    getSdkLlvmStrip(): string;
    getSdkLlvmReadElf(): string;
    getRestool(): string;
    getSysCapTool(): string;
    getSysCapFileInEts(): string;
    getSysCapFileInJs(): string;
    getVerifySignConfigTool(): string;
    getRichSchema(): string;
    getLiteSchema(): string;
    getArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getEtsComponentVersion(): string;
    getEtsComponentReleaseType(): string;
    getPackageTool(): string;
    getSignDir(): string;
    getHosSignTool(): string;
    getJsLoader(): string;
    getEtsLoader(): string;
    requireUISyntax(): boolean;
    getHmsNativeDir(): string;
    getHmsToolchainFile(): string;
    getHmsBiShengToolchainFile(): string;
    getHmsArkDir(): string;
    getHosResTool(): string;
    getOhosJar(): string;
    getHapSignToolV2(): string;
    getHosModuleSchema(): string;
    getBasePath(): string;
    getAppConfigurationSchema(): string;
    getStartWindowSchema(): string;
    getSystemThemeSchema(): string;
}
export declare enum SdkComponentType {
    ETS = "ets",
    JS = "js",
    PREVIEWER = "previewer",
    NATIVE = "native",
    TOOLCHAINS = "toolchains"
}
