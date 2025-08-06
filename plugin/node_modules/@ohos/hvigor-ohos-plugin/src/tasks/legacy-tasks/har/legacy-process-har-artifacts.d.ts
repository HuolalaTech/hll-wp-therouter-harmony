import { AbstractProcessHarArtifacts } from '../../abstract/abstract-process-har-artifacts.js';
import { TargetTaskService } from '../../service/target-task-service.js';
import { OhosLogger } from '../../../utils/log/ohos-logger.js';
/**
 * 收集FA模型打包需要用的构建产物
 */
export declare class LegacyProcessHarArtifacts extends AbstractProcessHarArtifacts {
    protected logger: OhosLogger;
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
    copyCompiledSourceFileToTempDir(): void;
    copyOtherGenerateFiles(): void;
    processPackageJson(): void;
    processSourceMaps(): void;
}
