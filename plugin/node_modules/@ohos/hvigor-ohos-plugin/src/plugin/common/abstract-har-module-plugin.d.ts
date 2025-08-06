import { Module } from '@ohos/hvigor';
import { AssembleHar } from '../../tasks/hook/assemble/assemble-har.js';
import { BuildHarPreviewerRes } from '../../tasks/hook/previewer/build-har-previewer-res.js';
import { PreviewBuild } from '../../tasks/hook/previewer/preview-build.js';
import { UnitTestBuild } from '../../tasks/unitTest/unit-test-build.js';
import { AbstractModulePlugin } from './abstract-module-plugin.js';
/**
 * 对外暴露hap级别的接口和任务的plugin
 *
 * @since 2021/12/16
 */
export declare abstract class AbstractHarModulePlugin extends AbstractModulePlugin {
    protected assembleHar: AssembleHar | undefined;
    protected buildHarPreviewerRes: BuildHarPreviewerRes | undefined;
    protected previewBuild: PreviewBuild | undefined;
    protected unitTestBuild: UnitTestBuild | undefined;
    protected constructor(module: Module);
    abstract initHarTasks(): void;
    initGlobalData(): void;
}
