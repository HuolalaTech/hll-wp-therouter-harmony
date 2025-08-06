import { TargetTaskService } from './service/target-task-service.js';
import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { OhosModuleTask } from './task/ohos-module-task.js';
export declare class ProcessIntegratedHsp extends OhosModuleTask {
    initTaskDepends(): void;
    protected readonly _log: OhosLogger;
    protected readonly inputFile: string;
    protected readonly integratedRemoteHspDir: string;
    private readonly allRemoteHspPathMap;
    private readonly integratedInputList;
    private readonly integratedOutputList;
    constructor(taskService: TargetTaskService);
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    protected doTaskAction(): Promise<void>;
    /**
     * 调用packageTool生成integratedHsp回填后产物
     *
     * @param inputFilePath
     * @param integratedHspPath
     * @private
     */
    private generateIntegratedHsp;
}
