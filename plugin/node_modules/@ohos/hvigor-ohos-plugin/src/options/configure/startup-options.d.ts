/**
 * moduleName: 此so所属的模块名
 * startupConfigPath: 此so所属的启动框架配置文件路径
 * isRemoteByteCodeHar: 此so是否是远程字节码har的so文件
 */
export interface AppPreloadHintStartupTasksObj {
    name: string;
    srcEntry: string;
    dependencies: string[];
    excludeFromAutoStart: boolean;
    runOnThread: string;
    ohmurl?: string;
    moduleName?: string;
    startupConfigPath?: string;
    isRemoteByteCodeHar?: boolean;
}
export interface StartupTaskObj {
    name: string;
    srcEntry: string;
    srcEntryAbsolutePath?: string;
    dependencies: string[];
    excludeFromAutoStart: boolean;
    runOnThread: string;
    waitOnMainThread: boolean;
    ohmurl?: string;
    moduleName?: string;
    obfuscationSrcEntry?: string;
    startupConfigPath?: string;
}
export interface StartupOptions {
    appPreloadHintStartupTasks?: AppPreloadHintStartupTasksObj[];
    startupTasks?: StartupTaskObj[];
    configEntry?: string;
}
