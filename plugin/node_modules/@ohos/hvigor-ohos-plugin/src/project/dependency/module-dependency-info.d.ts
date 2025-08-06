import { Dependency } from './core/dependency-interface.js';
import { ModulePkgNode } from './dependency-manager.js';
/**
 * Module的依赖信息集合
 *
 * @since 2022/5/7
 */
export declare class ModuleDependencyInfo {
    /**
     * har module 依赖的map集合
     * key - module name
     * value -module package.json path
     *
     * @private
     */
    private readonly _moduleDependencyMap;
    private readonly _moduleDependencyCategory;
    private readonly _npmDependencies;
    private readonly _allDependencies;
    private readonly _npmDependenciesObj;
    private readonly _hasHspDependency;
    private readonly _self;
    private readonly _modulePkgNode;
    private readonly _projectPkgNode;
    /**
     * 储存当前模块的直接依赖，注意：工程级的依赖，也视为模块的直接依赖，示例：
     * 1.模块级的oh-package.json5配置：
     * dependencies: dayjs, har1
     * dynamicDependencies: hsp1
     * devDependencies: pako
     * 2.工程级的oh-package.json5配置：
     * dependencies: har2
     * dynamicDependencies: hsp2
     * devDependencies: @ohos/hypium
     *
     * 则，根据依赖优先规格：模块dependencies > 模块dynamicDependencies  > 工程dependencies > 工程dynamicDependencies > 模块devDependencies > 工程devDependencies，
     * 收集结果如下：
     * [dayjs, har1, hsp1, har2, hsp2, pako, @ohos/hypium]
     * @private
     */
    private _directPkgNodes?;
    private readonly _log;
    constructor(self: Dependency, modulePkgNode: ModulePkgNode, projectPkgNode: ModulePkgNode | undefined, moduleDependencyMap: Map<string, Dependency>, npmDependencies: Dependency[]);
    /**
     * 同名依赖收集优先级：模块dependencies > 模块dynamicDependencies  > 工程dependencies > 工程dynamicDependencies > 模块devDependencies > 工程devDependencies
     * 根据此规格，移除掉同名的依赖模块
     * @param nodes
     * @private
     */
    private keepDependencyNameUnique;
    /**
     * 同名依赖收集优先级：模块dependencies > 模块dynamicDependencies  > 工程dependencies > 工程dynamicDependencies > 模块devDependencies > 工程devDependencies
     * 根据此规格，合并模块级与工程级依赖
     * @param modulePkgNodes
     * @param projectPkgNodes
     * @private
     */
    private getMergedPkgNodes;
    /**
     * 对字节码HAR用到全局依赖进行依赖回填
     * @param node
     * @param globalPkgNodes
     * @private
     */
    private backFillPkgNodes;
    /**
     * 合并模块级依赖和工程级依赖，构建完整的依赖树，只涉及遍历，不涉及io
     * @private
     */
    private buildDirectPkgNodes;
    getDirectPkgNodes(): ModulePkgNode[];
    getSelfAsDependency(): Dependency;
    getModulePkgNode(): ModulePkgNode;
    getProjectPkgNode(): ModulePkgNode | undefined;
    /**
     * 依赖的本地模块与其模块名的键值对
     * @returns {Map<string, Dependency>}
     */
    getModuleDependencyMap(): Map<string, Dependency>;
    /**
     * 依赖的本地模块与其模块名的键值对
     * @returns {[string, Dependency][]}
     */
    getModuleDependenciesByType(targetType: string): [string, Dependency][];
    /**
     * 依赖的鸿蒙依赖，包括本地开发态的模块与发布态的远程或者本地依赖
     * @returns {Dependency[]}
     */
    getNpmDependencies(): Dependency[];
    /**
     * 全部依赖，包括本地开发态的模块与发布态的远程或者本地依赖，so，ohpm，npm等依赖
     * @returns {Dependency[]}
     */
    getAllDependencies(): Dependency[];
    /**
     * 判断当前模块是否有hsp依赖
     */
    hasHspDependency(): boolean;
    getHspDependencies(): Dependency[];
    getHarDependencies(): Dependency[];
}
