import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { ObfuscationOptions, PkgBriefInfo, ProjectConfig } from '@ohos/hvigor-arkts-compose';
import { CodeType } from '../enum/code-type-enum.js';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { AbstractCompileNode } from './abstract/abstract-compile-node.js';
import { TargetTaskService } from './service/target-task-service.js';
export declare class ArkCompile extends AbstractCompileNode {
    protected _log: OhosLogger;
    protected readonly needSubmitArkTsWidget: boolean;
    private readonly formJsonPathArr;
    protected obfuscationOptions?: ObfuscationOptions;
    protected obfuscationHash: string;
    protected pkgNameToPkgBriefInfo: Record<string, PkgBriefInfo>;
    private readonly _taskService;
    private arkdataPathAll;
    private writeBuildModePromise;
    constructor(taskService: TargetTaskService, codeType: CodeType, taskDetails: TaskDetails);
    taskShouldDo(): boolean;
    declareInputs(): Map<string, TaskInputValue>;
    declareOutputFiles(): FileSet;
    beforeAlwaysAction(): Promise<void>;
    protected beforeTask(): Promise<void>;
    declareInputFiles(): FileSet;
    protected doTaskAction(): Promise<void>;
    /**
     * 落盘compileInfo.json加锁
     */
    writeBuildMode(config: ProjectConfig): Promise<void>;
    trace(cachePath: string): void;
    private getSelfPkgBriefInfo;
    /**
     * 设置 moduleName -> 模块信息的映射对象，后续用于node-resolve插件
     * @private
     */
    private setPkgNameToPkgBriefInfo;
    /**
     * 获取冷重载的rollup插件参数
     * @returns {undefined | {buildConfigJsonPath: string, relativeDir: string}}
     * @private
     */
    private getCollectImportersConfig;
    /**
     * 获取tsc的寻址路径，后续会被设置到tsc的compilerOptions中
     * @param basePath
     * @private
     */
    protected getTscAddressPaths(basePath: string): Record<string, string[]>;
    protected initDefaultArkCompileConfig(): Promise<ProjectConfig>;
    private initWidgetDefaultArkCompileConfig;
    /**
     * routerMap缓存配置 <pageSourceFile:name1@buildFunction1#name2@buildFunction2...>
     * @private
     */
    private getRouterMapConfig;
    protected arkDataCompile(): void;
    initTaskDepends(): void;
    /**
     * 获取传递给etsLoader的ark混淆配置
     * API10以上stage模型release模式可用
     *
     * selfConfig
     * dependencies
     * sdkApis
     * obfuscationCacheDir
     * exportRulePath
     *
     * @return ObfuscationOptions
     * @return undefined
     */
    getObfuscationOptions(): Promise<ObfuscationOptions | undefined>;
    computeObfuscationFileHash(obfuscationOptions: ObfuscationOptions): string;
    protected getIncrementalCacheItem(key: string): TaskInputValue | undefined;
    /**
     * 清除arkts代码缓存目录build/${product}/cache/${target}/default@CompileArkTS/esmodule/${buildMode}
     *
     * @protected
     */
    protected cleanCache(): Promise<void>;
    private getObfuscationEnable;
    /**
     * 检查oh-package.json5文件的main字段是否配置且正确
     *
     * @private
     */
    private checkPackageMain;
    /**
     * 检查RollUpPluginInEtsLoader是否存在
     *
     * @private
     */
    private checkRollUpPlugin;
}
