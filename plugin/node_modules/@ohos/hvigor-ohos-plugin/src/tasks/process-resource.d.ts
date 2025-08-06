import { FileSet } from '@ohos/hvigor';
import { OptCompressionBuilder } from '../builder/opt-compression-builder.js';
import { AbstractProcessResource } from './abstract/abstract-process-resource.js';
import { TargetTaskService } from './service/target-task-service.js';
/**
 * Stage 模型用于处理和生成用文件方式编译资源的中间文件
 *
 * @since 2022/9/8
 */
export declare class ProcessResource extends AbstractProcessResource {
    optCompressionBuilder: OptCompressionBuilder;
    protected optCompressionFilePath: string;
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
    protected beforeTask(): void;
    declareInputs(): Map<string, import("@ohos/hvigor").TaskInputValue>;
    private get ignoreResourcePattern();
    protected doTaskAction(): void;
    declareOutputFiles(): FileSet;
    private getAppResourceDir;
    initCommandBuilder(): void;
    getOptCompressionBuilder(): OptCompressionBuilder;
}
