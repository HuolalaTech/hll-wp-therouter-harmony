import { Module } from '@ohos/hvigor';
import { AbstractHapModulePlugin } from '../common/abstract-hap-module-plugin.js';
/**
 * 对外暴露hap级别的接口和任务的plugin
 *
 * @since 2021/12/16
 */
export declare class LegacyHapPlugin extends AbstractHapModulePlugin {
    constructor(module: Module);
    initHapTasks(): void;
}
