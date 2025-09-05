import { TargetTaskService } from './service/target-task-service.js';
import { OhosHapTask } from './task/ohos-hap-task.js';
export interface BuildProfileData {
    BUNDLE_NAME: string;
    BUNDLE_TYPE: string;
    TARGET_NAME: string;
    PRODUCT_NAME: string;
    BUILD_MODE_NAME: string;
    DEBUG: boolean;
    VERSION_CODE: number;
    VERSION_NAME: string;
}
export declare class BuildProfileTask extends OhosHapTask {
    private _log;
    protected readonly buildTaskService: TargetTaskService;
    protected buildProfileData: BuildProfileData | undefined;
    constructor(taskService: TargetTaskService);
    protected initDefaultData(): void;
    private get buildMode();
    private get buildModeName();
    private get buildProfileFields();
    private get projectOhosConfigAppOpt();
    private get appResJsonPath();
    private get projectProfilePath();
    private get buildProfilePath();
    initTaskDepends(): void;
    protected doTaskAction(): void;
}
