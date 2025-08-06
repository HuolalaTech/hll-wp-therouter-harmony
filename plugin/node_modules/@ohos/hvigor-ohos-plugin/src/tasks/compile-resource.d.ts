import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { AbstractCompileResource } from './abstract/abstract-compile-resource.js';
import { ModuleTargetData } from './data/hap-task-target-data.js';
import { TargetTaskService } from './service/target-task-service.js';
/**
 * 编译资源
 *
 * @since 2022/1/10
 */
export declare class CompileResource extends AbstractCompileResource {
    protected processProfileTask: string;
    private _log;
    beforeAlwaysAction(): Promise<void>;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareExecutionCommand(): string;
    constructor(targetTaskService: TargetTaskService);
    initTaskDepends(): void;
    protected doTaskAction(): Promise<void>;
    invokeRestool(targetData: ModuleTargetData): Promise<void>;
    /**
     * 处理stage模型target定制distroFilter场景
     * target中定制distroFilter配置写入metadata->{resource文件}下
     * @protected
     */
    protected customizeDistroFilter(): void;
    /**
     * 将中间产物资源目录下的routerMap配置修改为合并后的routerMap配置
     * @param routerMapObjList
     * @private
     */
    private writeRouterMap;
    private processRouterMap;
    /**
     * 处理启动框架相关任务，从intermediate/startup下读取合并后的文件，处理后写入到intermediates/res下的资源文件中，如有必要还要修改res下的module.json
     *
     * @private
     */
    private processStartupConfig;
    private checkStartupTaskDependencies;
    /**
     * 从intermediates/startup中读取合并后的启动框架配置，循环遍历拿到所有startupTask和appPreloadHintStartupTask的name属性集合
     *
     * @param startupMergedOptions
     * @private
     */
    private getAllStartupTaskNames;
}
