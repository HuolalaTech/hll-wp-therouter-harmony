import { TaskDetails } from '@ohos/hvigor';
import { SourceSetModel } from '../../model/source-set/source-set-model.js';
import { ModuleBuildProfile } from '../../options/build/module-build-profile.js';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { ModuleTargetData } from '../data/hap-task-target-data.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHapTask } from '../task/ohos-hap-task.js';
import DistroFilterBuildOpt = ModuleBuildProfile.DistroFilterBuildOpt;
export interface RemoteHspMetadata {
    hspName: string;
    hspVersion: string;
    hspPath: string;
    soPath: string;
}
/**
 * 构建根据feature与entry关联关系生成对应output_metadata.json
 * path:{buildRoot}/{moduleName}/build/{productName}/intermediates/hap_metadata/{targetName}/output_metadata.json
 */
export declare abstract class AbstractGenerateMetadata extends OhosHapTask {
    protected readonly sourceSetModel: SourceSetModel;
    readonly _log: OhosLogger;
    private readonly remoteHspMetaData;
    protected constructor(targetService: TargetTaskService, taskDetails: TaskDetails);
    private get artifactName();
    private get relatedEntryModules();
    private get targetDeviceType();
    private get isSigned();
    private get outputFilePath();
    protected doTaskAction(): void;
    initTaskDepends(): void;
    /**
     * 根据target生成output_metadata.json
     *
     * @param targetData featureTargetData
     * @private
     */
    private generateTargetMetadata;
    /**
     * 生成entry模块 或 无关联entry模块信息的feature模块的metadata对象
     * @param targetData ModuleTargetData
     * @param isSigned 是否签名
     * @private
     */
    private generateModuleMetadata;
    /**
     * 生成存在关联entry信息的feature模块的metadata对象
     * @param targetData ModuleTargetData
     * @param entryName 关联entry的moduleName
     * @param isSigned 是否签名
     * @private
     */
    private generateFeatureMetadata;
    /**
     * 生成hsp的metadata对象
     * @param targetData ModuleTargetData
     * @param isSigned 是否签名
     * @private
     */
    private generateHspMetadata;
    /**
     * 生成hsp的metadata对象,只在ohosTest场景下生成
     * @param targetData ModuleTargetData
     * @param isSigned 是否签名
     * @private
     */
    private generateHarMetadata;
    protected abstract getDistroFilterObj(relatedEntryTargetData: ModuleTargetData): DistroFilterBuildOpt | undefined;
    protected getRelatedEntryJsonList(jsonFile: string): string[];
}
