/// <reference types="node" />
import { DurationEvent, FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { ProjectConfig } from '@ohos/hvigor-arkts-compose';
import { CodeType } from '../../enum/code-type-enum.js';
import { CodeModel } from '../../model/code-source/code-model.js';
import { BuildOpt } from '../../options/build/build-opt.js';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { ModuleTargetData } from '../data/hap-task-target-data.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHapTask } from '../task/ohos-hap-task.js';
/**
 * 编译FA/Stage模型js/ets源码
 *
 * @since 2022/11/29
 */
export declare abstract class AbstractCompileNode extends OhosHapTask {
    private readonly TSIMPORTSENDABLE;
    protected readonly codeType: CodeType;
    protected readonly commonOption: NodeJS.ProcessEnv;
    protected readonly codeModel: CodeModel | undefined;
    protected readonly aceModuleJsonPath: string;
    protected readonly resProfileDir: string;
    protected readonly resourceTable: string;
    protected readonly rawFileResource: string;
    protected readonly aceBuildJsonDir: string;
    protected aceModuleBuild: string;
    protected readonly sourcePath: string | undefined;
    protected readonly aceSuperVisualPath: string;
    protected readonly isArkModule: boolean;
    protected readonly mainCodePath: string | undefined;
    protected readonly anBuildOutputPath: string;
    protected readonly externalApiPaths: string[];
    protected buildOption?: BuildOpt;
    protected readonly isCrossplatform: boolean;
    protected userProjectConfig: object | undefined;
    protected constructor(taskService: TargetTaskService, codeType: CodeType, taskDetails: TaskDetails);
    static getCompileNodeTaskName(codeType: CodeType, taskPrefix: string): string;
    beforeAlwaysAction(): Promise<void>;
    protected get isByteCodeHarOptimize(): boolean;
    declareInputs(): Map<string, TaskInputValue>;
    declareOutputFiles(): FileSet;
    declareInputFiles(): FileSet;
    protected getAllExistHarSrcPath(): string[];
    protected getAllExistDependentMainPath(): string[];
    taskShouldDo(): boolean;
    /**
     * 移动_releaseMap到临时目录
     *
     * @param {ModuleTargetData} targetData
     * @param log 日志
     * @param {string} abilityPath 老模型的_releaseMap需要会拷贝一级目录到abilityPath
     * @protected
     */
    protected moveReleaseMap(targetData: ModuleTargetData, log: OhosLogger, abilityPath?: string): void;
    protected beforeTask(): Promise<void>;
    /**
     * 工具链的临时目录根据debug维度和compileMode维度在区分一层
     *
     * @param {ModuleTargetData} targetData
     * @param {string} appendStr 默认为'', 区分不同产物的不同目录
     * @returns {string}
     * @protected
     */
    protected getTaskTempDir(targetData: ModuleTargetData, appendStr?: string): string;
    /**
     * 工具链的临时目录根据compileMode维度区分
     *
     * @param {ModuleTargetData} targetData
     * @returns {string}
     * @protected
     */
    protected getArkCompileCachePath(targetData: ModuleTargetData): string;
    protected validateModuleJson(logger: OhosLogger): void;
    protected initCommonArkConfig(): any;
    private getResolveConflictMode;
    /**
     * 处理transformLib 字段
     */
    protected normalizeTransformLib(): string | undefined;
    /**
     * 获取HAP/HSP编译期间需要被编译阻断的依赖
     * @protected
     */
    protected getBlockDependencies(): import("../../project/dependency/core/dependency-interface.js").Dependency[];
    /**
     * 初始化默认的ark编译参数配置
     *
     * @returns {ProjectConfig} ark编译参数
     * @protected
     */
    protected initDefaultArkCompileConfig(): Promise<ProjectConfig>;
    protected getPreviewCompileConfig(logger: OhosLogger): Promise<ProjectConfig>;
    /**
     * 处理hvigor-compiler回传的compile event事件
     *
     * @param compileEvents 回传的compile event事件
     * @param parentEvent compile event事件对应的父事件
     * @param needUpdateTid 是否需要将子节点的tid更新为父节点的tid
     * @protected
     */
    protected handleCompileEvents(compileEvents: any[], parentEvent: DurationEvent | undefined, needUpdateTid: boolean): void;
    protected validateAbility(logger: OhosLogger): void;
    /**
     * 以parentEvent为根节点，将其所有的子节点的tid更新为根节点的tid
     *
     * @param parentEvent 根节点
     * @private
     */
    private updateTid;
    private validateModulePage;
    private validateAbilitiesAndExtensionAbilitiesSrcEntry;
    private validateSrcEntry;
    private getHvigorPluginFile;
    private getExternalApiPaths;
    private getUseNormalizedOHMUrl;
    private getPkgContextInfo;
    private getDependencyAliasMap;
    private getSourceMapDir;
}
