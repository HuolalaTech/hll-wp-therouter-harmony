import { PackageJson } from 'type-fest';
import { ProjectModel } from '../model/project/project-model.js';
import { Dependency, DependencyEnum } from '../project/dependency/core/dependency-interface.js';
import { ModuleTaskService } from '../tasks/service/module-task-service.js';
import { TargetTaskService } from '../tasks/service/target-task-service.js';
export type OhosPackageJson = PackageJson & {
    ohos?: {
        org: string;
        artifactType: string;
    };
    artifactType?: string;
};
export declare function getJson5Obj(filePath: string): any;
/**
 * 最小化hsp中的依赖，只保留hsp中的hsp相关依赖并删除devDependencies中的依赖
 *
 * @param packageJsonObj  oh-package.json5文件对象
 * @param service  ModuleTaskService
 * @param packageManagerPath  oh-package.json5的路径
 */
export declare function minimizeHspDependencies(packageJsonObj: any, service: ModuleTaskService, packageManagerPath: string): void;
/**
 * 打包hsp时dependencies依赖会排除hsp以外的其他依赖
 *
 * @param dependencyEnum 依赖类型
 * @param service  ModuleTaskService
 * @param packageManagerPath  oh-package.json5的路径
 * @private
 */
export declare function getDependenciesWithoutHar(dependencyEnum: DependencyEnum, service: ModuleTaskService, packageManagerPath: string): any;
/**
 * 获取本地依赖har模块的当前target资源路径集合
 * @private
 */
export declare function getLocalDepHarTargetSources(targetTaskService: TargetTaskService, harDependency: Dependency, projectModule: ProjectModel): string[];
/**
 * 获取远程har（产物态）模块的资源路径集合，产物态和源码态有一点区别：若在打包时target的resource/directories中配置了资源路径，则只会把配置的
 * 资源路径达到har包里，也就是说这种情况下产物har里不存在默认资源路径；但是当resource/directories是空时，会将默认资源路径达到包里
 * @param harDependency
 */
export declare function getRemoteDepHarTargetSources(harDependency: Dependency): string[];
/**
 * 获取本地依赖的路由表数据
 * @param projectModel
 * @param targetTaskService
 * @param dependency
 */
export declare function getLocalDependencyRouterMap(projectModel: ProjectModel, targetTaskService: TargetTaskService, dependency: Dependency): import("../options/configure/router-map-options.js").RouterMapOptions.RouterMapObj[] | undefined;
