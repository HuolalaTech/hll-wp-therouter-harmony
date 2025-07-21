import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { BasePackHapTask } from './base/base-pack-hap-task.js';
import { TargetTaskService } from './service/target-task-service.js';
/**
 * Fast packaging hap task
 *
 * @since 2025/2/27
 */
export declare class FastPackageHap extends BasePackHapTask {
    private readonly appOptObj;
    private readonly targetModuleOptObj;
    private readonly targetJsonPath;
    constructor(taskService: TargetTaskService);
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    beforeAlwaysAction(): Promise<void>;
    protected doTaskAction(): Promise<void>;
}
