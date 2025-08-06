import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { JsonProfile } from '../../model/json-profile.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHapTask } from '../task/ohos-hap-task.js';
/**
 * preBuild Task
 *
 * @since 2022/1/10
 */
export declare abstract class AbstractPreBuild extends OhosHapTask {
    private _log;
    private readonly entryCardPath;
    protected readonly apiType: string;
    protected readonly targetStatusCode: number;
    protected readonly syscapJsonPath: string;
    protected readonly containsEts: boolean;
    protected readonly deviceTypes: string[];
    protected readonly dependencies: Record<string, string>;
    protected readonly compilePluginFile: string | undefined;
    protected readonly dynamicDependencies: Record<string, string>;
    protected readonly jsonProfile: JsonProfile;
    protected readonly fromConfigFilePathArr: string[];
    protected readonly projectProfilePath: string;
    protected readonly profilePath: string;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    beforeAlwaysAction(): Promise<void>;
    private checkEmptyTargetSdkVersion;
    protected constructor(taskService: TargetTaskService, taskName: TaskDetails);
    initTaskDepends(): void;
    protected doTaskAction(): Promise<void>;
    /**
     * 检查工程外的模块是否满足：
     * 1. FA主工程不能引用工程外的的模块（无论什么模型）
     * 2. Stage主工程不能引用FA模块
     * 3. 工程外的hap不支持被引用
     * @private
     */
    private checkOutModule;
    /**
     * 校验路径及文件名包含中文则报错
     * @private
     */
    private checkPathChinese;
    /**
     * 检查要编译的模块是否具有命令行指定的deviceTypes, har模块不做设备校验
     * @private
     */
    private checkDeviceTypes;
    /**
     * 校验用户配置的compilePluginFile是否符合规范
     *
     * @private
     */
    private checkHvigorPluginFile;
    /**
     * 校验文件路径后缀是否是.ts（如果后缀存在）
     *
     * @param hvigorPluginFile 待校验的路径
     * @private
     */
    private checkSuffix;
    protected isPackingTestPackage(): boolean;
    protected abstract doValidateForDiffApiType(): void;
    protected abstract getJsonProfileByModel(): JsonProfile;
    protected abstract checkExtendSourceDirs(): void;
    protected abstract validateAtomicService(): void;
    protected abstract checkByteCodeHar(): void;
    protected supportOHPM(): any;
    /**
     * 校验hsp/har ohPackage.json5中的main字段和types字段配置的文件是否存在
     */
    checkPackageJson5Config(): Promise<void>;
    private checkMainAndTypesFile;
    private checkWorkerConfig;
    protected versionCheck(): void;
    /**
     * 校验har和hsp模块的版本号和名称是否符合规范
     * @private
     */
    ohPackageCheck(): void;
    /**
     * 校验编译语言是否支持wearable,只有API8的非js工程进行拦截
     * @private
     */
    private checkCodeTypeForWearable;
    /**
     * 校验编译语言是否支持瘦设备lite-wearable、smartVision,对API8及API8以上的非js工程进行拦截
     * @private
     */
    private checkCodeTypeForLiteWearable;
    /**
     * 校验SDK版本是否支持ohpm工程
     * @private
     */
    private checkOhpmProjectSdkVersion;
    /**
     * 校验API版本是否支持测试框架
     * @private
     */
    private checkApiVersionForUnitTest;
    /**
     * fastBuildApp cannot usage on FA Mode
     *
     */
    protected validateFastBuildAppOnFAMode(): void;
    protected validateModuleName(profileModuleName: string, moduleName: string, sourceConfigName: string): void;
    protected getBundleType(): string;
    protected isAtomicServiceProject(): boolean;
    private checkArkTSCompatibility;
    private checkCustomTypesSupport;
    private checkCustomTypesIsValid;
    private checkCustomTypePathIsValid;
    private checkCustomTypeExtName;
    private getCustomTypePathExist;
    private getModuleDynamicDependencies;
    private checkDynamicDependenciesSupport;
    private checkDimension;
    /**
     * entryModules字段在stage模型工程中标识废弃 编辑器中无法通过schema体现 则在构建时抛出warning
     * @private
     */
    private checkEntryModules;
    /**
     * 校验配置项ohos.arkCompile.emptyBundleName/ohos.byteCodeHar.integratedOptimization是否为布尔值，如果不是需要给出warning
     * @private
     */
    private checkEmptyProperty;
    private getFromConfigFilePathArr;
    private checkWidget;
    private checkRequestPermissions;
    /**
     * 用于检查build.profile.json5中removePermissions字段：
     * 所配置的权限是否被系统所定义，若否则提供警告
     * @private
     */
    private checkRemoveRequestPermissions;
    /**
     * 检查build.profile.json5中removePermissions字段中的每个权限
     * 提供具体告警信息
     * @param permissions removePermissions字段中的每个权限
     * @param allPermission 系统支持的权限字段
     * @private
     */
    private forEachCheckRemovePermissions;
    private findDuplicatedPermissions;
    private checkLegalReqPermissions;
    /**
     * 根据模块类别对user_grant requestPermission进行校验
     * 如果是hap，校验user_grant 权限的的 reason 和 usedScene 必填
     * 如果是har和hsp，校验user_grant 权限的 reason 为必填
     *
     * @param permissions
     * @param definePermissions
     * @private
     */
    private checkReqPermissionsByModuleType;
    /**
     * 组织权限数据，取SDK配置权限以及definePermissions配置的权限
     * runtimeOS为openHarmony且compileSdkVersion<12，则沿用老的逻辑权限列表从hvigor中取
     * @param definePermissions
     * @private
     */
    private getGrantData;
    private forEachCheckPermissions;
    /**
     * 是否需要使用SDK配置权限
     * api版本大于12或者未使用OpenHarmonyOS
     *
     * @return boolean
     */
    private isUseSdkPermission;
    protected isValidWidget(isArkTsWidget: boolean, parentDir: string, formPath: string): boolean;
    private visualExists;
    /**
     * 检查excludeSoFromInterfaceHar是否配置到打hap的地方，是则需要报warning
     * excludeSoFromInterfaceHar只适用于打hsp包的变量，
     *
     */
    private checkExcludeSoFromInterfaceHar;
}
