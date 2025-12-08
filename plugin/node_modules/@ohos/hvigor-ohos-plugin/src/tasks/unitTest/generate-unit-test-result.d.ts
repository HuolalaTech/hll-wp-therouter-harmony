import { TargetTaskService } from '../service/target-task-service.js';
import { OhosModuleTask } from '../task/ohos-module-task.js';
/**
 * 调用ohos/coverage接口，生成测试覆盖率报告
 *
 * @2023/12/29
 */
export declare class GenerateUnitTestResult extends OhosModuleTask {
    private logger;
    constructor(taskService: TargetTaskService);
    /**
     * 返回HarmonyOS sdk下面openharmony目录下的 previewer 路径
     */
    private getHmosPreviewerPath;
    /**
     * 返回HarmonyOS sdk下面hms目录下的 previewer 路径
     */
    private getHmsPreviewerPath;
    /**
     * 返回OpenHarmony sdk下面的 previewer 路径
     */
    private getOhosPreviewerPath;
    private getPreviewerPath;
    doTaskAction(): Promise<void>;
    initTaskDepends(): void;
}
