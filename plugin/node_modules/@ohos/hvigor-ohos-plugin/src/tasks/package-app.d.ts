import { Project, FileSet, TaskInputValue } from '@ohos/hvigor';
import { BasePackAppTask } from './base/base-pack-app-task.js';
import { ProjectTaskService } from './service/project-task-service.js';
/**
 * 调用打包工具生成.app
 *
 * @since 2022/1/10
 */
export declare class PackageApp extends BasePackAppTask {
    private readonly allDestDir;
    private readonly allSrcHapPath;
    private readonly allDestHapPath;
    private readonly allSrcHspPath;
    private allDestHspPathList;
    private readonly allRemoteHspPathMap;
    private readonly remoteHspModuleSet;
    private readonly projectBuildProfilePath;
    private readonly projectModel;
    private readonly curProduct;
    private readonly defaultPackageLimitSize;
    declareExecutionCommand(): string;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    constructor(project: Project, taskService: ProjectTaskService);
    initTaskDepends(): void;
    beforeAlwaysAction(): Promise<void>;
    protected doTaskAction(): Promise<void>;
    /**
     * 获得打包app的命令
     * @returns {string[]} 打包app的命令
     */
    private getPackAppCommand;
    /**
     * 遍历product的所有hap包,
     * 将需要打到app的hap去除-unsigned, 然后生成到同级的app目录下, 最后输出路径到字符串数组中
     */
    private getUnpackedHaps;
    private initWithHapModuleData;
    private fastInitWithHapModuleData;
    private initWithHspModuleData;
    private fastInitWithHspModuleData;
    /**
     * 检查打app包时传入包包名是否重复
     * @param paths
     * @private
     */
    private checkOutputName;
    /**
     * 检查是否需要收集debug信息
     */
    private shouldCollectProjectDebugSymbol;
    /**
     * 对于已有的hap和hsp模块的debug symbol执行软连接到App scope的build目录下
     * 遍历所有的子模块，然后获得这些子模块的路径，创建这些子模块的路径到project build的目录下
     * 在packApp的daTaskAction里执行，保证依赖任务执行完毕
     * @private
     */
    private collectDebugSymbolInAppScope;
    /**
     * 返回输出目标路径
     */
    private getDestinationPath;
    /**
     * 工程级任务下提取模块下debug symbol路径
     * @return destinationPath
     */
    private getSrcModuleDebugSymbolPath;
    /**
     * 创建软连接，考虑跨平台兼容性
     * @param srcPath
     * @param destPath 该父路径应该保证存在
     * @param moduleName
     * @private
     */
    private createSymbolicLink;
    /**
     * 将目标文件夹打包成zip包
     */
    private buildZipPackage;
    private destFileResolve;
}
