import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { BasePackHapTask } from './base/base-pack-hap-task.js';
import { TargetTaskService } from './service/target-task-service.js';
/**
 * 打包Hap包
 *
 * @since 2022/1/10
 */
export declare class PackageHap extends BasePackHapTask {
    private readonly appOptObj;
    private readonly targetModuleOptObj;
    private readonly targetJsonPath;
    constructor(taskService: TargetTaskService);
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    protected doTaskAction(): Promise<void>;
}
