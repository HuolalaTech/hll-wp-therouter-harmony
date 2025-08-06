import { ProjectBuildProfile } from '../../../options/build/project-build-profile.js';
import { AppJson } from '../../../options/configure/app-json-options.js';
import { ProjectTaskService } from '../../../tasks/service/project-task-service.js';
import { AbstractProjectPlugin } from '../../common/abstract-project-plugin.js';
import { OhosProjectContext, OhpmDependencyInfo, Product } from '../plugin-context.js';
/**
 * Project级别的上下文信息
 */
export declare class OhosProjectContextImpl implements OhosProjectContext {
    private readonly projectPlugin;
    private currentProduct;
    private projectPath;
    private buildProductOutputPath;
    private buildRootPath;
    private taskService;
    private projectOhPackagePath;
    private logger;
    constructor(projectPlugin: AbstractProjectPlugin, taskService: ProjectTaskService);
    getOhpmDependencyInfo(): Record<string, OhpmDependencyInfo>;
    getOhpmRemoteHspDependencyInfo(isSigned?: boolean): Record<string, OhpmDependencyInfo>;
    getProjectName(): string;
    getBuildMode(): string;
    getProjectPath(): string;
    getCurrentProduct(): Product;
    initCurrentProduct(): void;
    initBuildPath(): void;
    getBuildProductOutputPath(): string;
    getBuildRootPath(): string;
    getAppJsonOpt(): AppJson.AppOptObj;
    getBuildProfileOpt(): ProjectBuildProfile.ProjectProfileOpt;
    setAppJsonOpt(appJsonOpt: AppJson.AppOptObj): void;
    setBuildProfileOpt(buildProfileOpt: ProjectBuildProfile.ProjectProfileOpt): void;
    getDependenciesOpt(): any;
    getDevDependenciesOpt(): any;
    getDynamicDependenciesOpt(): any;
    setDependenciesOpt(dependencies: any): void;
    setDevDependenciesOpt(devDependencies: any): void;
    setDynamicDependenciesOpt(dynamicDependencies: any): void;
    getOverrides(): any;
    setOverrides(overrides: any): void;
}
