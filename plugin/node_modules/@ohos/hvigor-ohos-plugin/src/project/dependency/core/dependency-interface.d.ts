import { PackageJson } from 'type-fest';
import { ModuleJson } from '../../../options/configure/module-json-options.js';
import ModuleOptObj = ModuleJson.ModuleOptObj;
/**
 * har依赖的接口类
 *
 * @since 2022/5/7
 */
export interface Dependency {
    /**
     * 获取package.json的路径
     *
     * @returns {string}
     * @deprecated use getPackageFilePath().
     */
    getPackageJsonPath(): string;
    /**
     * 获取类package.json、起包定义作用的文件的路径
     *
     * @returns {string}
     */
    getPackageFilePath(): string;
    /**
     * 获取package.json的内容
     *
     * @returns PackageJson
     */
    getPackageJsonObj(): PackageJson;
    /**
     * module的package.json中的name
     *
     * @returns {string}
     */
    getPackageName(): string;
    /**
     * 获取package.json中声明的依赖名,对于npm依赖来说一般跟package.json中的name一致
     *
     * @returns {string}
     */
    getDependencyName(): string;
    /**
     * 获取该依赖在被依赖时配置的依赖版本号或路径
     *
     * @returns {string}
     */
    getDependedVersion(): string;
    /**
     * 获取package.json中声明的版本号
     *
     * @returns {string}
     */
    getDependencyVersion(): string;
    /**
     * 获取package.json中声明的dependencies
     *
     * @returns {Partial<Record<string, string>>}
     */
    getDependencies(): Partial<Record<string, string>>;
    /**
     * 获取依赖在当前module的node_modules中的路径, 对于本地module依赖, 则对应module路径
     *
     * @returns {string}
     */
    getDependencyRootPath(): string;
    /**
     * 获取package.json中main对应文件的路径, 若没配main则默认为index.js
     * see: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#main
     *
     * @returns {string}
     */
    getDependencyMainFilePath(): string;
    getDependencyTypesFilePath(): string;
    getDependencyType(): DependencyType;
    getDependencyEnum(): DependencyEnum;
    getModuleJsonObj(): ModuleOptObj | undefined;
    getDependencyMainFileRelativePath(): string | undefined;
    getUseNormalizedOHMUrl(): boolean | undefined;
    hasNative(): boolean;
    isLocal(): boolean;
    getLastDependencyName(): string | undefined;
    setLastDependencyName(dependencyName: string): void;
    getDefaultLibsDir(): string;
    isByteCodeHarDependency(): boolean;
    isBundleDependency(): boolean;
    isHarDependency(): boolean;
    isHspDependency(): boolean;
    isOtherDependency(): boolean;
    /**
     * 判断该依赖是在模块级还是工程级的oh-packages里面配置的
     */
    isModuleDependency(): boolean;
}
export declare enum DependencyType {
    DEPENDENCY_TYPE_HAR = "har",
    DEPENDENCY_TYPE_HSP = "hsp",
    DEPENDENCY_TYPE_SO = "so",
    DEPENDENCY_TYPE_OTHER = "other",
    DEPENDENCY_TYPE_HAP = "hap"
}
export declare enum DependencyEnum {
    DEPENDENCIES = "dependencies",
    DYNAMIC_DEPENDENCIES = "dynamicDependencies",
    DEV_DEPENDENCIES = "devDependencies"
}
/**
 * 由于重构后依赖收集多收集了dev相关依赖，所以在处理依赖解析顺序时有可能出现模块级dev依赖优先级高于工程级dependencies的场景
 * 通过添加compare处理本地依赖收集逻辑
 * 同名依赖收集优先级：模块dependencies > 模块dynamicDependencies  > 工程dependencies > 工程dynamicDependencies > 模块devDependencies > 工程devDependencies
 * 默认收集顺序为：先收集模块，后收集工程；模块和工程的默认收集顺序为dependencies > dynamicDependencies > devDependencies
 * 该方法只降低dev的优先级，不改变原有收集逻辑
 *
 * @param newDependencyEnum  新类型
 * @param originDependencyEnum  旧类型
 */
export declare function compareDependencyEnum(newDependencyEnum: DependencyEnum, originDependencyEnum: DependencyEnum): boolean;
