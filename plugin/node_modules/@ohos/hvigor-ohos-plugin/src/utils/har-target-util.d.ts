import { CoreModuleModelImpl } from '../model/module/core-module-model-impl.js';
import { Dependency } from '../project/dependency/core/dependency-interface.js';
import { TargetTaskService } from '../tasks/service/target-task-service.js';
export declare class HarTargetUtil {
    private static _log;
    /**
     * 获取指定har target
     * 规则：命令行指定 > 引用方 target > default
     * 指定ohosTest模块除外
     *
     * @param targetService
     * @param harModuleName
     */
    static getHarTargetName(targetService: TargetTaskService, harModuleName: string): string;
    /**
     * 收集的所有的本地依赖har的targetName
     *
     * @param targetService
     */
    static calDepHarTargets(targetService: TargetTaskService): Map<string, string>;
    static getHarTargetData(harDependency: [string, Dependency], moduleModel: CoreModuleModelImpl, curTarget: string, moduleName: string, targetService: TargetTaskService): string;
    /**
     * 获取本地或远程源码har依赖的worker/runtimeOnly/routerMap-pageSourceFile配置对应集合或对象的Map
     * @param targetTaskService
     */
    static getDep2ConfigMap(targetTaskService: TargetTaskService | undefined): Dep2ConfigObj | undefined;
    /**
     * 收集本地远程依赖源码har的worker
     * @param dep2WorkersMap
     * @param sourceWorkers
     * @param dependency
     * @private
     */
    private static collectWorkers;
    /**
     * 收集本地远程依赖源码har的runtimeOnly
     * @param dep2RuntimeOnlySourcesMap
     * @param dep2RuntimeOnlyPackagesMap
     * @param runtimeOnlyObj
     * @param dependency
     * @private
     */
    private static collectRuntimeOnly;
    /**
     * 收集本地远程依赖源码har的routerMap对象的pageSourceFile
     * @param dep2RouterMapObjPageSourceFilesMap
     * @param routerMapObjList
     * @param dependency
     * @private
     */
    private static collectRouterMapPageSourceFiles;
    /**
     * 收集本地或远程依赖har其资源目录集合对应的map
     * @param dep2ResourcesMap
     * @param resourcesDir
     * @param dependency
     * @private
     */
    private static collectResources;
    /**
     * 获取模块依赖模块对应的targetService
     * @param targetService
     * @param dependency
     * @private
     */
    static getDepTargetService(targetService: TargetTaskService | undefined, dependency: [string, Dependency]): TargetTaskService | undefined;
}
export interface Dep2RuntimeOnlyObj {
    dep2RuntimeOnlySources: Map<Dependency, string[]>;
    dep2RuntimeOnlyPackages: Map<Dependency, string[]>;
}
export interface Dep2ConfigObj {
    dep2Workers: Map<Dependency, string[]>;
    dep2RuntimeOnlyObj: Dep2RuntimeOnlyObj;
    dep2RouterMapObjPageSourceFiles: Map<Dependency, string[]>;
    dep2Resources: Map<Dependency, string[]>;
}
