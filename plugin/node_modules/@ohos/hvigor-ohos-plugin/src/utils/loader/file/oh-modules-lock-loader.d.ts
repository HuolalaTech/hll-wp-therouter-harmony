declare class OhModulesLockLoader {
    private lockFilePath;
    /**
     * 获取lock.json5文件对象
     */
    private getLockJsonObj;
    /**
     * 获得被复写的模块名
     * 通过工程级的oh-package的overrideDependencyMap的配置来筛选被复写的模块
     */
    private isModuleInProjectPkgJsonOverrideDependencies;
    /**
     * 判断模块是否需要被改写
     * 需要hvigor-config.json5中的properties中开关enableOverridesDependencyMap打开
     * 以及在项目级oh-package.json5的overrideDependencyMap中配置该模块名
     *
     * @param moduleName 模块名
     * @returns boolean 是否被覆盖
     */
    isNeedOverrideWithLockJson(moduleName: string): boolean;
    /**
     * 提取 module的overrideDependencyMap的依赖配置
     * 通过读取lock.json5文件来获取配置
     *
     * @param moduleName 需要被
     * @param pkgObj 返回的是克隆的对象
     */
    getOverrideDependencyPkgObj(moduleName: string, pkgObj: any): any;
}
export declare const ohModulesLockLoader: OhModulesLockLoader;
export {};
