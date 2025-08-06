import { Obfuscation, ObfuscationDependencies, ObfuscationOptions } from '@ohos/hvigor-arkts-compose';
import { CoreModuleModelImpl } from '../model/module/core-module-model-impl.js';
import { ModuleModel } from '../model/module/module-model.js';
import { ModuleTaskService } from '../tasks/service/module-task-service.js';
import { TargetTaskService } from '../tasks/service/target-task-service.js';
/**
 * 获取ObfuscationOptions入口
 * 需要在hvigor-arkts-compose中补充sdkApis
 * 仅需生成obfuscation.txt时不需sdkApis
 *
 * @param service
 * @param obfuscation
 * @param cacheDir 混淆缓存目录
 */
export declare const resolveObfuscationOptions: (service: TargetTaskService, obfuscation: Obfuscation, cacheDir: string) => Promise<ObfuscationOptions | undefined>;
export declare const resolveObfuscationDependencies: (moduleModel: ModuleModel, moduleTaskService: ModuleTaskService) => Promise<ObfuscationDependencies>;
/**
 * 转换混淆规则文件路径为绝对路径并检查是否存在
 *
 * @param rules 混淆规则文件
 * @param dir 模块根路径
 * @param module 模块
 * @param targetName
 */
export declare const transformRules: (rules: string | string[] | undefined, dir: string, module: CoreModuleModelImpl, targetName: string) => string[];
