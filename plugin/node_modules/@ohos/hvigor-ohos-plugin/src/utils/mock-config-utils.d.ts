import { MockConfigModuleInfo } from '@ohos/hvigor-arkts-compose';
import { ModuleTaskService } from '../tasks/service/module-task-service.js';
/**
 * 在mock-config场景，针对配置中的har和hsp，需要把key对应的真实路径传给mock，
 * 当前阶段，只查找到文件/文件夹路径，value可能不存在后缀，
 * 由于涉及到SUPPORT_EXTENSION，这块逻辑在ark-base阶段补充
 * @param configFilePath
 * @param service
 */
export declare const getMockConfigKey2ModuleInfoMap: (configFilePath: string, service: ModuleTaskService) => Record<string, MockConfigModuleInfo>;
/**
 * 获取mock-config中source的绝对路径
 * @param configFilePath
 * @param modulePath
 */
export declare const getMockConfigSources: (configFilePath: string, modulePath: string) => string[];
export declare const getSource2ModuleIdMap: (configFilePath: string, modulePath: string) => Map<string, string>;
