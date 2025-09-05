import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { ModuleJson } from '../../options/configure/module-json-options.js';
import { RouterMapOptions } from '../../options/configure/router-map-options.js';
import { OhPackageJsonOpt } from '../../tasks/task/ohos-har-task.js';
import { DefaultModuleDependency } from './core/default-module-dependency.js';
import { Dependency } from './core/dependency-interface.js';
import { ModuleDependencyInfo } from './module-dependency-info.js';
import ModuleOptObj = ModuleJson.ModuleOptObj;
import RouterMapObj = RouterMapOptions.RouterMapObj;
export type DependencyCollector = (node: ModulePkgNode) => boolean;
export type DependencyFilter = (node: ModulePkgNode, pre: boolean, post: boolean) => boolean;
/**
 * 管理har的依赖，提供获取当前模块依赖的数据信息
 *
 * @since 2022/5/7
 */
export declare class DependencyManager {
    private _allDependency;
    private readonly _model;
    private readonly _projectModel;
    private readonly _moduleName;
    private readonly _isFaMode;
    private readonly _isOhpmDependency;
    private legacyDependencyManagerHelper;
    constructor(isFaMode: boolean, model: ModuleModel | ProjectModel, project?: ProjectModel);
    private isOhpmDependency;
    createModelDependencyInfo(): ModuleDependencyInfo;
    /**
     * 构造本地模块为Dependency对象
     *
     * @param model
     * @param modulePkgPath
     */
    buildSelfDependency(model: ProjectModel | ModuleModel, modulePkgPath: string): DefaultModuleDependency;
    collectAllDependencies(): {
        npmDependencies: Dependency[];
        moduleDependencyMap: Map<string, Dependency>;
        modulePkgNode: ModulePkgNode;
        projectPkgNode: ModulePkgNode | undefined;
    };
    collectAllDependenciesForPkgInfo(): {
        npmDependencies: Dependency[];
        moduleDependencyMap: Map<string, Dependency>;
        modulePkgNode: ModulePkgNode;
        projectPkgNode: ModulePkgNode | undefined;
    };
    getDependenciesByFilter(model: ProjectModel | ModuleModel, pkgPath: string, filter?: DependencyFilter, projectFilter?: DependencyFilter): {
        npmDependencies: Dependency[];
        moduleDependencyMap: Map<string, Dependency>;
        modulePkgNode: ModulePkgNode;
        projectPkgNode: ModulePkgNode | undefined;
    };
    private getDependenciesForPkgInfo;
    private collectModuleHarDependencyForHap;
    collectAllHspDependencies(): [string, Dependency][];
    private collectProjectHarDependencyForHap;
    /**
     *
     * @param modulePkgObj
     * @private
     */
    private collectHarDependency;
    private resolveDeps;
    private collectFromTree;
    /**
     * 广度优先从依赖树中遍历收集依赖
     * 写过滤器时注意前后区别
     *
     * @param params
     *   root 依赖树
     *   npmDeps npm依赖数组
     *   moduleDepMap 本地模块依赖map
     *   filter 过滤器
     *   shouldCollect 是否收集进npmDeps和moduleDepMap
     *
     */
    collectDependenciesFromTree(params: {
        root: ModulePkgNode;
        npmDeps: Dependency[];
        moduleDepMap: Map<string, Dependency>;
        filter?: DependencyFilter;
        shouldCollect?: DependencyCollector;
    }): void;
    private collectDependency;
    private getModuleJsonObj;
    /**
     * 通过config.json/module.json5判断当前模块是否为鸿蒙依赖（har/hsp）
     *
     * @param {string} pkgPath 当前模块的路径
     * @returns {boolean}
     * @private
     */
    private getDependencyTypeByProfile;
    /**
     * 获取当前模块的moduleType
     *
     * @param {string} runtimeJson config.json/module.json5
     * @returns {boolean}
     * @private
     */
    private getDependencyTypeByProfileType;
    /**
     * 通过config.json/module.json5判断当前模块是否支持stage
     *
     * @param {string} pkgPath 当前模块的路径
     * @returns {boolean}
     * @private
     */
    private checkHspOrHarStatusByProfile;
    /**
     * 检查当前模块的model与hap是否一致
     * @param runtimeJson
     * @param depModuleIsFAMode 依赖模块是否为FA专用
     * @private
     */
    private checkHspOrHarStatus;
    /**
     * 1. 根据config.json/module.json5判断是不是鸿蒙依赖（har/hsp）
     * 2. 根据包管理的关键特征判断是否是har报
     * 3. 考虑循环依赖，用set过滤重复项，向queue中添加package.json路径
     *
     * @param {string} pkgJsonPath 当前模块依赖的npm的package.json/oh-package.json5路径
     * @param {OhosPackageJson} devPkgJsonObj 当前模块依赖的package.json对象
     * @param curPkgJsonPath
     * @param pkgName
     * @returns {boolean}
     * @private
     */
    private getHarmonyDependencyType;
    /**
     * npm和ohpm的不同包管理机制下,判断一个依赖是否为har包
     * 1.ohpm只需要判断依赖中是否包含oh-package.json5
     * 2.npm需要判断package.json5中是否包含ohos字段
     *
     * @param {string} pkgPath
     * @param {OhosPackageJson} devPkgJsonPathObj
     * @returns {boolean}
     * @private
     */
    private isHarForDiffPackManagement;
    /**
     * 针对hap依赖不同har的一些业务规则校验
     * 1.FA模型不支持依赖闭源har(stage模型+esModule编译)
     *
     * @param {string} pkgPath
     * @param {OhosPackageJson} devPkgJsonPathObj
     * @private
     */
    private checkHarStatusIsCompatibleForHap;
    /**
     * 通过入口文件路径地址判断当前依赖是否为本地依赖 暂时用于判断so类型依赖
     * 若包含oh_modules字段则为远程依赖
     * @param path 依赖入口文件路径地址
     */
    static isLocalDependencyForSo(path: string): boolean;
    /**
     * 判断指定依赖是否为本地依赖
     * @param dependency
     * @param moduleModelNodePaths
     */
    static isLocalDependency(dependency: Dependency, moduleModelNodePaths: Set<string>): boolean;
    /**
     * 通过oh-package.json5获取moduleName
     * @param dependencyRootPath
     * @private
     */
    static getModuleNameFromOhPkgJson(dependencyRootPath: string): string;
    /**
     * 获取远程依赖routerMap配置集合
     * @param remoteDependency
     * @private
     */
    static getRemoteDependencyRouterMapObjList(remoteDependency: Dependency): RouterMapObj[] | undefined;
    /**
     * 获取本地依赖routerMap配置集合
     * @param localDependency
     * @param projectModel
     * @param targetName
     */
    static getLocalDependencyRouterMapObjList(localDependency: Dependency | undefined, projectModel: ProjectModel, targetName?: string): RouterMapObj[] | undefined;
    /**
     * 获取依赖模块的routerMap配置路径
     * @private
     * @param dependencyModuleModel
     * @param targetName
     */
    static getDependencyModuleRouterMapJsonPath(dependencyModuleModel: ModuleModel | undefined, targetName?: string): string | undefined;
    /**
     * 获取模块配置的路由表文件名
     * @param moduleModel
     */
    static getRouterMapJsonFileName(moduleModel: ModuleModel | undefined): string | undefined;
    /**
     * 通过本地依赖获取对应moduleModel
     * @param dependency
     * @param projectModel
     */
    static getModuleModelByDependency(dependency: Dependency, projectModel: ProjectModel): ModuleModel | undefined;
    /**
     * 获取远程依赖module.json对象
     *
     * @param remoteDependency
     * @private
     */
    static getModuleObjByRemoteDependency(remoteDependency: Dependency): ModuleOptObj;
    private getSODependencyType;
    /**
     * 判断是否为间接依赖的devDependencies
     *
     * @param modulePkgJsonPath  父节点的oh_package.json5路径
     * @param dependencyEnum  当前节点的类型
     */
    private isIndirectDevdependency;
    /**
     * 获取最终的ohPkgJson的对象ohPkgJsonObj
     * 判断是否需要用overrideDependencyMap来替换ohPkgJsonObj的依赖值
     *
     * @param modulePath
     * @private
     */
    private getFinalOhPkgJsonObj;
}
/**
 * 获取依赖入口文件
 * @param realDependencyPath
 * @param dynamicImportOhPkgObj
 * @private
 */
export declare function getEntryMainFilePath(realDependencyPath: string, dynamicImportOhPkgObj: OhPackageJsonOpt): string;
export interface ModulePkgNode {
    moduleName: string;
    modulePkgJsonPath: string;
    parent?: ModulePkgNode;
    children: ModulePkgNode[];
    npm: Dependency;
    module?: DefaultModuleDependency;
}
export declare function getEntryPath(main: string, types: string): string;
