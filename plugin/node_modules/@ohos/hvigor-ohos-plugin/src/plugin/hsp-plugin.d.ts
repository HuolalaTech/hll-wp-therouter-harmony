import { Module } from '@ohos/hvigor';
import { AbstractModulePlugin } from './common/abstract-module-plugin.js';
/**
 * 对外暴露hap级别的接口和任务的plugin
 *
 * @since 2023/1/17
 */
export declare class HspPlugin extends AbstractModulePlugin {
    private assembleHsp;
    private buildPreviewerRes;
    private buildHotReloadRes;
    private previewBuild;
    private unitTestBuild;
    private hotReloadBuild;
    constructor(module: Module);
    initHspTasks(): void;
}
