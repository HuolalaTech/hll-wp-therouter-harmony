import { ModuleBuildProfile } from '../../../options/build/module-build-profile.js';
import { ModuleJson } from '../../../options/configure/module-json-options.js';
import { AbstractModulePlugin } from '../../common/abstract-module-plugin.js';
import { OhosModuleContext, OhpmDependencyInfo, Target } from '../plugin-context.js';
/**
 * Module级别的上下文信息
 */
export declare class OhosModuleContextImpl implements OhosModuleContext {
    private readonly modulePlugin;
    private readonly targetArr;
    private readonly taskService;
    private readonly moduleOhPackagePath;
    private logger;
    constructor(modulePlugin: AbstractModulePlugin);
    targets(callback: (target: Target) => void): void;
    getModuleName(): string;
    getModulePath(): string;
    getModuleType(): string;
    getBuildProductRootPath(): string;
    getOhpmDependencyInfo(): Record<string, OhpmDependencyInfo>;
    getOhpmRemoteHspDependencyInfo(isSigned?: boolean): Record<string, OhpmDependencyInfo>;
    getBuildProfileOpt(): ModuleBuildProfile.ModuleBuildOpt;
    getModuleJsonOpt(): ModuleJson.ModuleOptObj;
    setBuildProfileOpt(buildProfileOpt: ModuleBuildProfile.ModuleBuildOpt): void;
    setModuleJsonOpt(moduleJsonOpt: ModuleJson.ModuleOptObj): void;
    getDependenciesOpt(): any;
    getDevDependenciesOpt(): any;
    getDynamicDependenciesOpt(): any;
    setDependenciesOpt(dependencies: any): void;
    setDevDependenciesOpt(devDependencies: any): void;
    setDynamicDependenciesOpt(dynamicDependencies: any): void;
    getVersion(): string;
    setVersion(version: string): void;
    loadCompilePlugin(pluginPath: string): void;
    getBuildMode(): string;
}
