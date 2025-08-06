import { Obfuscation, ObfuscationOptions } from '@ohos/hvigor-arkts-compose';
import { TargetTaskService } from '../../tasks/service/target-task-service.js';
/**
 * 获取ObfuscationOptions入口
 * 需要在hvigor-arkts-compose中补充sdkApis
 * 仅需生成obfuscation.txt时不需sdkApis
 *
 * @param service
 * @param obfuscation
 * @param cacheDir 混淆缓存目录
 */
export declare const getObfuscationOptionsWithCache: (service: TargetTaskService, obfuscation: Obfuscation, cacheDir: string) => Promise<ObfuscationOptions | undefined>;
