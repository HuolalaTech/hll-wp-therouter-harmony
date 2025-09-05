import { Module } from '@ohos/hvigor';
import { ProjectModel } from '../model/project/project-model.js';
import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
import { ModuleTargetData } from '../tasks/data/hap-task-target-data.js';
import { ModuleTaskService } from '../tasks/service/module-task-service.js';
import { ProjectTaskService } from '../tasks/service/project-task-service.js';
import { TargetTaskService } from '../tasks/service/target-task-service.js';
import { OhosLogger } from './log/ohos-logger.js';
export declare const resolveHookDependency: (name: string, target: string) => string;
export declare const dynamicResolveResourceTasks: (service: TargetTaskService, module: Module) => void;
export declare const warnCreateBuildProfileTask: (targetData: ModuleTargetData, targetService: TargetTaskService, log: OhosLogger) => void;
/**
 * 判断当前apiVersion是否高于limitApiVersion
 *
 * @param targetData
 * @param limitApiVersion
 */
export declare const limitMinApiVersion: (targetData: ModuleTargetData, limitApiVersion: number) => boolean;
/**
 * 重新加载依赖
 *
 * @param targetService
 *
 */
export declare const declareReloadDepends: (targetService: TargetTaskService) => string[];
/**
 * 获取当前buildModeName
 */
export declare const getBuildModeName: () => string;
/**
 * 判断是否需要编译卡片
 * @param formJsonPathArr
 */
export declare const shouldCompileArkTsWidget: (formJsonPathArr: string[]) => boolean;
/**
 * 检测是否开了混淆，没开的话给出warning提示
 * @param targetService
 * @param _log
 */
export declare const doObfuscationCheck: (targetService: TargetTaskService, _log: OhosLogger) => void;
/**
 * 获取bundleType
 * @param product
 * @param projectModel
 */
export declare const getBundleType: (product: ProjectBuildProfile.ProductBuildOpt, projectModel: ProjectModel) => string;
/**
 * 判断是否为元服务工程
 * @param product
 * @param projectModel
 */
export declare const isAtomicServiceProject: (product: ProjectBuildProfile.ProductBuildOpt, projectModel: ProjectModel) => boolean;
/**
 * 判断启动框架配置文件中appPreloadHintStartupTasks每一项srcEntry的so文件是否在中间产物libs目录下存在
 * 有一种特殊情况：在processLibs任务中若har模块bundledDependencies为true时不收集其依赖字节码har的so，所以如果当前har模块bundledDependencies为true，
 * 则其所依赖的远程字节码har的so跳过检测
 * @param appStartupPath
 * @param baseNativeLibsPath
 * @param _log
 * @param moduleName
 * @param isBundledDependencies
 * @private
 */
export declare const checkAppPreloadHintStartupTasksSrcEntry: (appStartupPath: string, baseNativeLibsPath: string, _log: OhosLogger, moduleName: string, isBundledDependencies?: boolean) => void;
/**
 * Checks if fast build app is enabled for the given service.
 *
 * @param {ModuleTaskService} service - The service to check.
 * @returns {boolean} - Returns true if fast build app is enabled, otherwise false.
 */
export declare const isFastBuildApp: (service: ModuleTaskService | ProjectTaskService) => boolean;
