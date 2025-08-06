import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { BuildOpt } from '../../options/build/build-opt.js';
/**
 * 1. 工程级别中product和buildMode中的无name的buildOption
 * merge(opt1, opt2, "MERGE") opt2的同名处理冲突的优先级别>opt1 以key为关键字进行递归的merge合并,数组之类的集合对象不需要单独进行合并
 *
 * 2. 模块级别的buildOptionSet中的有name的buildOption => 不允许重名
 *
 * 3. 处理上一步的buildOptionSet 和 模块中历史遗留的顶层的default的buildOption
 * buildOptionSet中的同名配置优先级更高,且采用overwrite的策略
 *
 * 4. 模块级别继承工程级别合并后的buildOption
 * 取上一步合并后的buildOptionSet中的每一个buildOption与该继承过来的buildOption做一个merge，并且buildOptionSet中的buildOption的优先级更高
 *
 * 5. 根据buildMode和buildOptionBinder可以从上一步处理的set中找到一个target对应的唯一一个buildOption
 *
 * 6. target中的配置的无name的buildOption与上一步中得到的buildOption
 * target中的buildOption优先级更高，且采用merge的策略与上一步的buildOption合并
 *
 * 7. 模块级hvigorfile.ts的配置值
 *
 * 8. 命令行处理
 */
export declare class BuildModeManager {
    private productBuildOptionMap;
    private targetBuildOptionMap;
    private targetBuildOptionMapWithProductBuildMode;
    initProjectBuildOptions(projectModel: ProjectModel, orginPath: string): void;
    /**
     * 初始化模块级的buildOption
     * @param moduleModel 模块模型
     * @param path 模块路径
     */
    initModuleBuildOptions(moduleModel: ModuleModel, path: string): void;
    /**
     * 根据BuildProfile的配置，将环境中所有可能存在的product，buildMode组合配对，计算对应的buildOption并存入buildOptionMapWithProductBuildMode
     * @param moduleModel 模块模型
     * @param path 模块路径
     */
    private initModuleBuildOptionMapWithProductBuildMode;
    /**
     * 根据当前的环境的product，buildMode，获取指定module每个target的buildOptions并将结果赋给buildOptionMap
     * @param moduleModel 需要获取buildOption的模块
     * @param path 路径
     * @param buildOptionMap 获取到buildOptions后将赋值给此对象
     */
    private initModuleBuildOptionMap;
    private getBuildOptNameFromMapping;
    /**
     * 获取对应product在该次构建过程中使用的buildOption
     * @param {string} product
     * @returns {BuildOpt}
     */
    getProductBuildOption(product: string): BuildOpt;
    /**
     * 获取某模块对应target在该次构建过程中使用的buildOption
     * @param {string} moduleName
     * @param {string} target
     * @returns {BuildOpt}
     */
    getTargetBuildOption(moduleName: string, target: string): BuildOpt;
    /**
     * 获取某模块对应target在对应product，对应buildMode构建过程中使用的buildOption
     * @param {string} moduleName
     * @param {string} target
     * @param {string} product
     * @param {string} buildMode
     * @returns {BuildOpt}
     */
    getTargetBuildOptionWithProductBuildMode(moduleName: string, target: string, buildMode: string, product?: string): BuildOpt;
    static getBuildMode(): string;
    /**
     * 获取项目buildProfile声明的所有构建模式
     * @param {ProjectModel} project - 项目模型
     * @return {string[]} buildModes - 返回一个包含所有构建模式名称的数组
     */
    private getAllBuildModes;
    /**
     * 将 buildOption 中的超纹理配置项中的 path 从相对路径转换为绝对路径
     * 由于无法区分 path 是相对于工程还是模块，所以需要刚读取完模块级的就马上进行转换，然后再去读取工程级的，假如 path 是绝对路径视为已经转换过了
     * 只能用于转换合并后的配置项结果对象 productResultBuildOpt 和 targetResultBuildOpt，不可用于修改原配置项对象，用户需要在 hvigorfile.ts 中读取到原本的 build profile
     * @param buildOption
     * @param cwd
     * @private
     */
    private convertCompressionPathToAbsolute;
    /**
     * 用户填的超纹理 path 只会是相对路径，但在将工程级合并到模块级时，工程级配置里的 path 会是转换后的绝对路径则不需要再拼接
     * @param pathArr
     * @param cwd
     * @private
     */
    private convertPathToAbsolute;
}
export declare const buildOptionManager: BuildModeManager;
