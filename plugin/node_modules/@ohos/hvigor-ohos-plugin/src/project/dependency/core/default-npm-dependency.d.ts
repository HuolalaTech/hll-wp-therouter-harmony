import { PackageJson } from 'type-fest';
import { ModuleJson } from '../../../options/configure/module-json-options.js';
import { OhPackageJsonOpt } from '../../../tasks/task/ohos-har-task.js';
import { DependencyBuilder } from './dependency-builder.js';
import { Dependency, DependencyEnum, DependencyType } from './dependency-interface.js';
import ModuleOptObj = ModuleJson.ModuleOptObj;
/**
 * module对应的所有的har依赖的包信息类
 *
 * @since 2022/5/7
 */
export declare class DefaultNpmDependency implements Dependency {
    private readonly _dependencyName;
    private readonly _dependedVersion;
    private _lastDependencyName;
    private readonly _dependencyVersion;
    private readonly _dependencyRootPath;
    private readonly _dependencies;
    private readonly _pkgJsonPath;
    private readonly _pkgJsonName;
    private readonly _mainFilePath;
    private readonly _typesFilePath;
    private readonly _dependencyType;
    private readonly _dependencyEnum;
    private readonly _pkgJsonObj;
    private readonly _isLocal;
    private readonly _moduleJsonObj;
    private readonly _isModuleDependency;
    private readonly _mainFileRelativePath;
    private readonly _useNormalizedOHMUrl;
    constructor(dependencyBuilder: DependencyBuilder);
    getPackageJsonPath(): string;
    getPackageFilePath(): string;
    getPackageJsonObj(): PackageJson;
    getPackageName(): string;
    getDependencyName(): string;
    getDependedVersion(): string;
    getDependencyVersion(): string;
    getDependencyRootPath(): string;
    getDependencyMainFilePath(): string;
    getDependencyTypesFilePath(): string;
    getDependencyType(): DependencyType;
    getDependencyEnum(): DependencyEnum;
    getDependencies(): Partial<Record<string, string>>;
    getModuleJsonObj(): ModuleOptObj | undefined;
    getDependencyMainFileRelativePath(): string | undefined;
    getUseNormalizedOHMUrl(): boolean | undefined;
    hasNative(): boolean;
    isLocal(): boolean;
    isByteCodeHarDependency(): boolean;
    isHarDependency(): boolean;
    isHspDependency(): boolean;
    isOtherDependency(): boolean;
    /**
     * bundle Har的前提必须是一个字节码har
     */
    isBundleDependency(): boolean;
    getLastDependencyName(): string | undefined;
    setLastDependencyName(dependencyName: string): void;
    getMainFileRelativePath(_dependencyRootPath: string, _pkgJsonObj: OhPackageJsonOpt): string;
    getDefaultLibsDir(): string;
    isModuleDependency(): boolean;
}
