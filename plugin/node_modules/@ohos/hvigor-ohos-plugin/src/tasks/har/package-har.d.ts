import { FileSet } from '@ohos/hvigor';
import { AbstractPackageHar } from '../abstract/abstract-package-har.js';
import { TargetTaskService } from '../service/target-task-service.js';
/**
 * 打包Har包
 *
 * @since 2021/12/18
 */
export declare class PackageHar extends AbstractPackageHar {
    protected readonly taskTmpDir: string;
    private readonly _log;
    initTaskDepends(): void;
    constructor(taskService: TargetTaskService);
    beforeAlwaysAction(): Promise<void>;
    declareInputFiles(): FileSet;
    protected doTaskAction(): Promise<void>;
}
