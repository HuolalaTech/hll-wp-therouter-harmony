import { FileSet } from '@ohos/hvigor';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { TargetTaskService } from './service/target-task-service.js';
import { OhosHapTask } from './task/ohos-hap-task.js';
/**
 * 将打hap/hsp/hsp/app等构建过程中的debug symbol收集到产物指定目录symbol下
 */
export declare class CollectDebugSymbol extends OhosHapTask {
    protected _log: OhosLogger;
    private readonly _taskService;
    private readonly RELEASE;
    private readonly DEBUG;
    private readonly debugSymbolPath;
    private readonly modulePath;
    private isRelease;
    private shouldCollectDebugSymbol;
    constructor(taskService: TargetTaskService);
    /**
     * 检查增量输入输出
     * 输入检查所有要收集的文件的原路径
     * 输出检查整个输出文件夹
     */
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    /**
    检查配置是否发生改变
     */
    beforeAlwaysAction(): Promise<void>;
    /**
    根据shouldCollectDebugSymbol来判断是否应该执行收集任务
     */
    taskShouldDo(): boolean;
    protected doTaskAction(): void;
    initTaskDepends(): void;
    /**
     * 返回输出目标路径，不存在就创建，保证输出不为空，否则会影响之后创建软连接
     * @private
     * @return destinationPath
     */
    private getDestinationPath;
    /**
     * 返回cache中namecache的路径
     * @private
     */
    private getNameCachePath;
    /**
     * 建立so文件夹的软连接到目标文件夹,软连接的使用方法要考虑跨平台的兼容性
     * @private
     */
    private createSymbolicLinkForSoFolder;
    /**
    har的产物目录跟hap hsp的产物目录下的名称有所不同，需要进行区分
     */
    private getCompileArkFolderName;
    private getModuleName;
}
