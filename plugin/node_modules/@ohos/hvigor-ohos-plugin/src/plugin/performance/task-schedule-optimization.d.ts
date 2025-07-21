import { Project } from '@ohos/hvigor';
/**
 *  计算CompileArkTS依赖链上的任务
 */
export declare class CompileDependencyCalculator {
    private project;
    private visitedTasks;
    private currentSubModuleNode;
    private _log;
    constructor(project: Project);
    /**
     * 工程下每个节点/模块进行编译任务链计算汇总
     */
    computeAndSetCompileDependencies(): void;
    /**
     * 过滤得到编译任务
     * @param subModuleNode
     * @private
     */
    private extractCompileTasks;
    /**
     * 广度优先汇总编译相关依赖任务
     * @param queue
     * @private
     */
    private processTaskQueue;
    /**
     * 依赖任务入队
     * @param queue
     * @param task
     * @private
     */
    private addTaskDependenciesToQueue;
    /**
     * 接收异常
     * @param task
     * @private
     */
    private getSafeTaskDependencies;
    /**
     * 处理任务path得到任务名称
     * @private
     */
    private processVisitedTasks;
}
