import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHapTask } from '../task/ohos-hap-task.js';
/**
 * Stage模型打包Hap包的基类
 *
 * @since 2023/1/17
 */
export declare abstract class BasePackHapTask extends OhosHapTask {
    protected readonly mode: string;
    protected readonly libPath: string;
    protected readonly jsonPath: string;
    protected readonly packageHapJsonPath: string;
    protected readonly resourcePath: string;
    protected readonly indexPath: string;
    protected readonly rpcidSc: string;
    protected readonly jsAssetsPath: string;
    protected readonly etsAssetsPath: string;
    protected readonly nodeModulesPath: string;
    protected readonly allPackInfoPath: string[];
    protected readonly allOutPath: string[];
    protected readonly sourceMapInterDirPath: string;
    protected syscapJsonPath: string;
    protected pkgContextInfoPath: string;
    protected readonly fastAppDirPath: string;
    private readonly anBuildOutputPath;
    private readonly apDirPath;
    private moduleBuildOpt;
    private readonly buildOption?;
    private readonly integratedHsp;
    readonly _log: OhosLogger;
    declareExecutionTool(): string;
    declareExecutionCommand(): string;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    protected constructor(taskService: TargetTaskService, detail: TaskDetails, mode: string, logger: OhosLogger);
    declareInputs(): Map<string, TaskInputValue>;
    protected doTaskAction(): Promise<void>;
    private executeCommandList;
    /**
     * 生成打包命令数据
     * @private
     */
    private generatePackInputData;
    private sendPackHapRequest;
    /**
     * 发送打包命令到java-daemon中执行打包
     * @private
     */
    private executePackInJavaDaemon;
    /**
     * 发送打包命令到worker-pool中执行打包
     * @private
     */
    private executePackInWorkerPool;
    private checkCompressNativeLib;
    /**
     * 生成命令
     *
     * @param packInfoPath pack.info路径
     * @param outPath 输出路径
     * @returns 命令
     */
    private generateCommand;
    private getSuffix;
    /**
     * 根据不同构建模式返回已经存在sourcemap的路径，供后续使用
     * @private
     */
    private getSourceMapSourcePath;
    /**
     * 根据构建模式将原有的sourceMap文件复制到intermediate对应目录下
     * @private
     */
    private generateInterSourceMap;
    private moveSourceMap;
    /**
     * 在 ohos-test-coverage 场景下打包前用测试框架生成的 ohosTestSourceMap.map 替换 loader_out 目录下的 sourceMaps.map 文件内容。
     * 因为覆盖率场景 rollup 生成的 sourceMap是不对的，测试框架自己生成的 sourceMap 是对的。
     */
    private replaceSourceMapInCoverageMode;
    initTaskDepends(): void;
    private getSourceMapPath;
    protected doDependenciesCheck(): void;
    private doNativeStripDependenciesCheck;
    private doObfuscationDependenciesCheck;
    private collectDependencies;
    beforeAlwaysAction(): Promise<void>;
    protected copyIntermediates(): Promise<void>;
    private copyJSONFile;
}
export declare const packageHapDepends: (service: TargetTaskService) => string[];
