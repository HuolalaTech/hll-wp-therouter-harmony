import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { BuildOpt, BuildOptionWithName } from '../../options/build/build-opt.js';
import { ModuleBuildProfile } from '../../options/build/module-build-profile.js';
import { Option } from '../../options/options.js';
import BuildModeBinder = ModuleBuildProfile.BuildModeBinder;
import { Attributes } from '../../common/build-option-path-info.js';
export declare class BuildOptionUtil {
    /**
     * 根据buildOptionName获取隐式的默认配置
     *
     * @param {string} buildOptName buildOption的名字
     * @returns {BuildOpt}
     */
    static getDefaultModuleBuildOpt(buildOptName: string): BuildOpt;
    /**
     * 根据buildModeName获取隐式的默认配置
     *
     * @param {string} buildMode buildMode的名字
     * @returns {BuildOpt}
     */
    static getDefaultBuildModeBuildOpt(buildMode: string): BuildOpt;
    /**
     * 在BuildModeBinderSet里面配置默认的绑定关系
     * 对于系统内置的三种 build mode（debug / release / test）, Hvigor 会分配默认绑定：
     *
     * - debug mode：优先分配 debug buildOption，测试包（ohosTest）分配 default buildOption
     * - release mode：优先分配 release buildOption，测试包（ohosTest）分配 default buildOption
     * - test mode：优先分配 debug buildOption，测试包（ohosTest）分配 default buildOption，
     *
     * @param {ModuleBuildProfile.BuildModeBinder[]} binderSet
     * @returns {ModuleBuildProfile.BuildModeBinder[]}
     */
    static getOrDefaultBuildModeBinderSet(binderSet: BuildModeBinder[]): BuildModeBinder[];
    static arrayDeduplication<T extends Record<string, unknown>>(array: T[], uniqueKey?: string): T[];
    static validateBuildMode(buildModeName: string, projectModel: ProjectModel): boolean;
    /**
     * 检查binderSet里面buildMode、targetName和buildOption的合法性
     * - buildMode必须为工程级配置buildModeSet内元素（包含隐式的默认配置）
     * - mapping内targetName必须为该模块内的target的name
     * - mapping内buildOptionName必须为该模块内的buildOptionSet内的对应name（包括module顶层的buildOption）
     *
     * @param {ModuleModel} moduleModel
     */
    static validateBinderSet(moduleModel: ModuleModel): void;
    /**
     * buildOptionSet 校验
     * -- copyFrom 校验
     * ---- 校验 copyFrom名字是否存在，提示warning
     * ---- 校验 copyFrom 是否成环
     *
     * @param {ModuleModel} moduleModel
     */
    static validateBuildOptionSet(moduleModel: ModuleModel): void;
    static isCopyFromNameExists(buildOption: BuildOptionWithName, buildOptionMap: Map<string, BuildOptionWithName>): boolean | "" | undefined;
    /**
     * 链表成环检测同时用一个可选参数 pathArray 记录copyFrom路径
     */
    static isCopyFromHasCircle(checkBuildOption: BuildOptionWithName, buildOptionMap: Map<string, BuildOptionWithName>, pathArray?: string[]): boolean;
    static buildOptionSetToMap(buildOptionSet: BuildOptionWithName[]): Map<string, BuildOptionWithName>;
    private static validateCopyFromNameExists;
    private static validateCopyFromCircle;
    private static validateBinderSetBuildModes;
    private static validateBinderSetTargetNames;
    private static validateBinderSetBuildOptNames;
}
export declare class BuildOptionCombiner {
    /**
     * 后面的同名BuildOption整体替换前面的BuildOption
     * opt2 replace opt1
     */
    static replaceBuildOption(opt1: BuildOptionWithName, opt2: BuildOptionWithName): BuildOptionWithName;
    /**
     * 合并buildOption, opt2覆盖合并opt1
     * 对于数组，假如 key 在参数 mergeArrayKeys 中则将数组元素合并到同一数组中且 opt2 的元素排在前，否则会直接替换覆盖
     */
    static mergeBuildOption(opt1: BuildOptionWithName | undefined, opt2: BuildOptionWithName, mergeArrayKeys?: ReadonlyArray<string>): BuildOptionWithName;
    /**
     * 读取改变后的BuildOption 来覆写原有的BuildOptionMap
     */
    static mergeBuildOptionPath(opt: BuildOptionWithName, path: string, map: Map<string, Attributes>): Map<string, Attributes>;
    static mergeProductBuildOptionPath(map1: Map<string, Attributes>, map2: Map<string, Attributes>): Map<string, Attributes>;
    /**
     * 处理 buildOption 中copyFrom链的合并逻辑
     */
    static processCopyFrom(buildOptionSet: BuildOptionWithName[]): void;
}
/**
 * 读取传入的BuildOption path， 返回对应的BuildOptionPathMap
 * @param opt BuildOption
 * @param srcPath path
 */
export declare function readOpt(opt: Option | undefined, srcPath: string): Map<string, Attributes>;
/**
 * 合并两个BuildOptionPathMap
 * 值相等的时候优先级 map1 > map2
 * 值不相等的时候优先级 map1 < map2
 * @param map1
 * @param map2
 */
export declare function mergeBuildOptPath(map1: Map<string, Attributes>, map2: Map<string, Attributes>): Map<string, Attributes>;
