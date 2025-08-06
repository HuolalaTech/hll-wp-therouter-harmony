import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHarTask } from '../task/ohos-har-task.js';
/**
 * packageHar前的前置操作，负责在打包前将需要打包的文件放在build/target/cache/下
 */
export declare abstract class AbstractProcessHarArtifacts extends OhosHarTask {
    protected abstract logger: OhosLogger;
    readonly hasNativeOption: boolean;
    readonly cmakeListDir: string | undefined;
    protected readonly _moduleDir: string;
    protected readonly taskTmpDir: string;
    protected readonly processedLibs: string;
    protected readonly resourceTablePath: string;
    protected readonly harProfile: string;
    protected readonly harModuleJson: string;
    protected readonly projectDir: string;
    protected readonly cppTypes: string;
    protected readonly allInvalidPrefix: string[];
    protected readonly resourceDir: string;
    protected readonly generateDir: string;
    protected readonly headerPath: string[];
    protected readonly needCppTypes: boolean;
    protected readonly ignoreFileNames: string[];
    protected readonly ohpmIgnoreRules: string[];
    protected readonly obfuscationFiles: string[];
    protected readonly releaseWhiteListTemDir: string[];
    protected readonly packingIgnoreFiles: string[];
    protected needCopyFileNames: string[];
    declareExecutionEnv(): Map<string, string>;
    declareInputs(): Map<string, TaskInputValue>;
    private get ignoreResourcePattern();
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    protected constructor(taskService: TargetTaskService, taskDetails: TaskDetails);
    private initModuleToplevelPathFilter;
    private initNeedCopyFileNames;
    private initFilterRules;
    private initSourceRootFilterRules;
    abstract copyCompiledSourceFileToTempDir(): void;
    abstract processPackageJson(): void;
    abstract processSourceMaps(): void;
    protected doTaskAction(): Promise<void>;
    private syncNativeHeader;
    private syncObfuscationFile;
    private resolveObfuscationFiles;
    private noNeedCopyCmakeList;
    private copyLocalDepsFileToTempDir;
    /**
     * 获取resource目录，返回的是从模块根目录下的[relative filePaths]数组
     * 首先获取用户配置的resource目录，如果获取不到，则使用默认的./src/main/resource路径
     * @return {string[]}
     */
    private getResourcesDirectories;
    /**
     * 检查给定的文件路径是否在资源目录中
     * @return 如果文件路径在资源目录中，返回true，否则返回false
     * @param absoluteFilePath
     */
    private isResourcePath;
    /**
     * 复制混淆Har或者字节码har文件的资源文件
     * 复制过程中会过滤掉被忽略的资源文件
     */
    private copyResourceFileOfReleaseHar;
    private copyModuleSourceFileToTempDirByWhiteList;
    private getCopyFilter;
    private needCopyFile;
    /**
     * 用户配置的glob语法，用来过滤har打包时候的resource目录，包括字节码、混淆、源码场景
     *
     * @param src absolute file path
     * @private
     */
    private isResourceIgnored;
    /**
     * 过滤混淆配置文件
     *
     * @param src absolute file path
     * @private
     */
    private excludeObfuscationFiles;
    private needIgnoreSrc;
    private copyModuleSourceFileToTempDirByBlackList;
    private preCheckBeforePack;
    private copyBuildIntermediatesOutToTempDir;
    protected copyOtherGenerateFiles(): void;
    protected processHarRouterMap(): void;
    protected processHarResStartupConfig(): void;
    protected processBundleDepRes(): void;
    protected processObfuscatedHarAbility(): void;
}
