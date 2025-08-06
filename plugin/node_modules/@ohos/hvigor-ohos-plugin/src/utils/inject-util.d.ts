/**
 * 通过hvigor命令行-p拿到一些固定的值
 *
 * @since 2022/5/17
 */
export declare class InjectUtil {
    private static _log;
    private static startParams;
    static customBuildDirHasLogged: boolean;
    /**
     * 判断是否是hot reload模式
     * 默认(不配置)是false
     *
     * @returns {boolean}
     */
    static isHotReload(): boolean;
    static isColdReload(): boolean;
    static isDeviceTest(): boolean;
    static isAssembleDevHqf(): boolean;
    /**
     * 是否是 daemon 模式
     *
     * @returns {boolean}
     */
    static isDaemon(): boolean;
    /**
     * 判断是否在preview的流程中调用task
     *
     * @returns {boolean}
     */
    static isPreviewProcess(): boolean;
    /**
     * 判断是否在unitTest的流程中调用task
     *
     * @returns {boolean}
     */
    static isUnitTestProcess(): boolean;
    /**
     * 判断是否ohosTest coverage模式打包
     *
     * @returns {boolean}
     */
    static isOhosTestCoverage(): boolean;
    static getCoveragePathFilter(): string | undefined;
    static getCoverageMode(): string | undefined;
    /**
     * 判断是否是启用debugLine
     * 默认(不配置)是false
     *
     * @returns {boolean}
     */
    static isDebugLineEnable(): boolean;
    /**
     * 获取build cache的父目录
     *
     * @param baseCacheDir 默认的build cache的父目录
     * @param postfix 用于和自定义build cache拼接的路径后缀
     * @param supportBuildCacheDir 是否支持通过build-cache-dir自定义缓存路径
     * @returns {string}
     */
    static getBuildCacheParentDir(baseCacheDir: string, postfix: string, supportBuildCacheDir?: boolean): string;
    /**
     * 获取模块的buildRootPath
     *
     * @param {string} modulePath 模块路径
     * @return {string} buildRootPath
     */
    static getModuleBuildRootPath(modulePath: string): string;
    /**
     * 获取用户自定义build的目录
     *
     * @returns {string | undefined}
     */
    static getBuildDir(supportBuildCacheDir?: boolean): string | undefined;
    /**
     * 判断是否执行的是localTest
     *
     * @returns {boolean}
     */
    static isLocalTest(): boolean;
    /**
     * 判断是否执行的是ohosTest
     *
     * @returns {boolean}
     */
    static isOhosTest(): boolean;
    /**
     * 判断是否执行localTest或ohosTest
     */
    static isInTest(): boolean;
    static isByteCodeHarOptimize(): boolean;
    /**
     * 判断是否测试框架
     */
    static isTestFrameWork(): boolean;
    /**
     * 获取命令行里的入口模块
     *
     * @returns {string[]}
     */
    static getEntryModulesName(): string[];
}
