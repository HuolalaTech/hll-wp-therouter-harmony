import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { HarExtendInfo } from '../har/har-extend-info.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHapTask } from '../task/ohos-hap-task.js';
/**
 * 生成打包shared library的package.json和module.json
 *
 * @since 2023/1/18
 */
export declare class PrepareSharedHarRes extends OhosHapTask {
    readonly hasNativeOption: boolean;
    readonly cmakeListDir: string | undefined;
    readonly _harExtendInfo: HarExtendInfo;
    private readonly inputPackageJson5Path;
    private readonly inputModuleJsonPath;
    private readonly inputDeclareFilesPath;
    private readonly headerPath;
    private readonly libsPath;
    private readonly inputResourceStr;
    private readonly taskTmpDir;
    private readonly outputPackageJsonPath;
    private readonly outputModuleJsonPath;
    private readonly outputDeclareFilesPath;
    private readonly outputResourceStr;
    private readonly INTERFACE_HAR;
    private readonly _moduleDir;
    private readonly ignoreFileList;
    private readonly allInvalidPrefix;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
    protected doTaskAction(): Promise<void>;
    private get obfuscationRulesPath();
    private copyObfuscationRules;
    private copyResourcesTxt;
    private syncNative;
    /**
     * 根据hsp模块的package.json，用main字段信息替换types字段，并删除main字段
     *
     * @private
     */
    private generatePackageJson;
    private copyLocalDepsFileToTempDir;
    /**
     * 根据hsp模块的module.json，筛选指定字段作为har包的module.json的字段
     *
     * @private
     */
    private generateModuleJson;
    private preCheckBeforePack;
    private initAllInvalidPrefix;
    private initRes;
    private excludeSoFromInterfaceHar;
}
