import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { BasePackHapTask } from '../base/base-pack-hap-task.js';
import { TargetTaskService } from '../service/target-task-service.js';
/**
 * Fast packaging hsp task
 *
 * @since 2025/2/27
 */
export declare class FastPackageHsp extends BasePackHapTask {
    constructor(taskService: TargetTaskService);
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    beforeAlwaysAction(): Promise<void>;
    protected doTaskAction(): Promise<void>;
}
