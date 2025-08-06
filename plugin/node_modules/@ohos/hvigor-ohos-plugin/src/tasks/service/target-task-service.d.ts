import { TaskDetails } from '@ohos/hvigor';
import { AotCompileModeEnum } from '../../enum/aot-compile-mode-enum.js';
import { ModuleModel } from '../../model/module/module-model.js';
import { ModuleTargetRes } from '../../model/res/res-model.js';
import { BuildOpt, NativeLib } from '../../options/build/build-opt.js';
import { RouterMapOptions } from '../../options/configure/router-map-options.js';
import { SdkInfo } from '../../sdk/sdk-info.js';
import { ModuleTargetData } from '../data/hap-task-target-data.js';
import { ModuleTaskService } from './module-task-service.js';
import RouterMapObj = RouterMapOptions.RouterMapObj;
/**
 * 以Target为维度创建不同的task，提供target相关的数据信息和管理
 *
 * @since 2022/8/11
 */
export declare class TargetTaskService {
    private targetData;
    private buildOption;
    private readonly _sdkInfo;
    private readonly moduleService;
    private readonly shouldBuildCmake;
    constructor(targetData: ModuleTargetData, moduleService: ModuleTaskService);
    refreshBuildOption(): void;
    buildTaskName(taskDetails: TaskDetails, targetName?: string): TaskDetails;
    getTargetData(): ModuleTargetData;
    getBuildOption(): BuildOpt;
    isByteCodeHar(): boolean;
    /**
     * 获取byteCodeHar真实值
     * useNormalizedOHMUrl=true
     *    byteCodeHar若无配置则默认为true
     * useNormalizedOHMUrl=false
     *    byteCodeHar若无配置则默认为false
     * 非上述默认情况则以实际配置值为准
     *
     * @param useNormalizedOHMUrl 使用新格式ohmurl 默认为false 需显示配置才可生效
     * @param byteCodeHar
     */
    getByteCodeHar(useNormalizedOHMUrl: boolean | undefined, byteCodeHar: boolean | undefined): boolean;
    /**
     * 获取noExternalImportByPath真实值
     * useNormalizedOHMUrl=true时
     *    noExternalImportByPath若无配置则默认为true
     * 非上述默认情况则以实际配置值为准
     */
    isNoExternalImportByPath(): boolean;
    /**
     * 判断是否为源码har
     */
    isSourceCodeHar(): boolean;
    isBundledDependencies(): boolean;
    getNativeLibOption(): NativeLib;
    /**
     * 提供当前target绝对路径化的workerConfig
     * @returns {string[]}
     */
    getWorkerConfig(): string[];
    /**
     * 获取模块级build-profile.json5中所有自定义buildProfileFields的变量
     */
    getBuildProfileFields(): object | undefined;
    /**
     * 获取模块target资源目录集合
     */
    getResourceDirs(): string[];
    /**
     *  相对路径转换为资源绝对路径并校验
     *
     * @param {string}  resourcesDirs 资源路径
     */
    private convertResourceAbsolutePath;
    getAnBuildMode(): AotCompileModeEnum;
    getApPath(): string | undefined;
    getApAbsolutePath(): string;
    getCustomTypes(): string[] | undefined;
    isDebug(): boolean;
    /**
     * 判断是否为开源/闭源
     * 1.混淆配置仅release生效
     * 2.debug模式下均为开源
     * 3.release模式下检查arkOptions?.obfuscation?.ruleOptions?.enable字段
     *    3.1.若enable配置为false或缺省,则不开启混淆为开源
     *    3.2.若enable配置为true,则开启混淆为闭源
     */
    isOpenSource(): boolean;
    getShouldBuildCmake(): boolean;
    /**
     * 判断构建模式是debug还是release
     */
    getBuildMode(): "Debug" | "Release";
    needPackBin(target: ModuleTargetData): boolean;
    getSdkInfo(): SdkInfo;
    getModuleService(): ModuleTaskService;
    static getFormJsonArr(targetRes: ModuleTargetRes): string[];
    private static formJsonFileCheck;
    /**
     * 获取startup文件名
     */
    getAppStartupFileName(isFaMode: boolean): string | undefined;
    /**
     * 获取appStartup配置文件路径
     * @private
     */
    getAppStartupPath(isFaMode: boolean): string | undefined;
    /**
     * 获取指定根模块的shortcutsJson配置路径
     * @private
     * @param moduleModel
     */
    getShortcutsJsonPaths(moduleModel: ModuleModel | undefined): string[];
    /**
     * 获取shortcuts配置文件名
     * @param moduleModel
     * @private
     */
    getShortcutsJsonFileNames(moduleModel: ModuleModel | undefined): string[];
    /**
     * 获取指定根模块的routerMap配置路径
     * @private
     * @param moduleModel
     */
    getRouterMapJsonPath(moduleModel: ModuleModel | undefined): string | undefined;
    /**
     * 获取当前根模块的InsightIntentJson配置路径
     * 存在自定义多资源目录的时候拿第一个（与routerMap保持一致）,否则返回默认路径base/profile/insightIntent.json
     * @private
     */
    getInsightIntentJsonPath(): string;
    /**
     * 获取模块路由表配置文件名
     * @param moduleModel
     * @private
     */
    getRouterMapJsonFileName(moduleModel: ModuleModel | undefined): string | undefined;
    /**
     * 根据target定制资源目录获取对应routerMapObjList
     * @param moduleModel
     * @private
     */
    getTargetRouterMapObjList(moduleModel: ModuleModel): RouterMapObj[] | undefined;
    /**
     * 获取target定制资源base/profile下的目录地址
     */
    getTargetResourceBaseProfilePath(relativePath: string): string | undefined;
    /**
     * 获取模块对应pkgContextInfo
     * @param packageName 包名
     */
    getPkgContextInfo(packageName: string): any;
    /**
     * 获取原始srcEntry的绝对路径
     * srcEntry在编辑器中限制只能以./开头,即相对于module.json
     * @param originalSrcEntry
     * @param rootPath
     */
    getAbsoluteSrcEntryPath(originalSrcEntry: string, rootPath: string): string;
}
/**
 * 拼接不同target的任务名
 *
 * @param {string} targetName
 * @param {string} taskName
 * @return {string}
 */
export declare function computeTargetTaskName(targetName: string, taskName: string): string;
