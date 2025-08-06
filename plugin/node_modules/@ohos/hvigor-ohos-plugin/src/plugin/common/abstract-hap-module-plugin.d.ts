import { Module } from '@ohos/hvigor';
import { AssembleHap } from '../../tasks/hook/assemble/assemble-hap.js';
import { BuildPreviewerRes } from '../../tasks/hook/previewer/build-previewer-res.js';
import { PreviewBuild } from '../../tasks/hook/previewer/preview-build.js';
import { UnitTestBuild } from '../../tasks/unitTest/unit-test-build.js';
import { AbstractModulePlugin } from './abstract-module-plugin.js';
/**
 * 对外暴露hap级别的接口和任务的plugin
 *
 * @since 2021/12/16
 */
export declare abstract class AbstractHapModulePlugin extends AbstractModulePlugin {
    protected buildPreviewerRes: BuildPreviewerRes | undefined;
    protected previewBuild: PreviewBuild | undefined;
    protected unitTestBuild: UnitTestBuild | undefined;
    assembleHap: AssembleHap | undefined;
    protected constructor(module: Module);
    abstract initHapTasks(): void;
    initGlobalData(): void;
}
