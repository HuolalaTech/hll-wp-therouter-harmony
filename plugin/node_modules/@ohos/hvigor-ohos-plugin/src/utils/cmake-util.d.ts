import { CacheEntry } from '../model/cxx/native-cmake-cache.js';
import { NativeLibraryModel } from '../model/cxx/native-library-model.js';
import { CoreModuleModelImpl } from '../model/module/core-module-model-impl.js';
import { ModuleModel } from '../model/module/module-model.js';
import { ExternalNativeOpt } from '../options/build/build-opt.js';
import { ModuleTargetData } from '../tasks/data/hap-task-target-data.js';
import { PrepareSharedHarRes } from '../tasks/hsp/prepare-shared-har-res.js';
import { SdkVersion } from '../version/sdk-version.js';
import { ExtraParamsForHar } from './file-util.js';
import { AbstractProcessHarArtifacts } from '../tasks/abstract/abstract-process-har-artifacts.js';
/**
 * native cmake相关
 *
 * @since 2022/4/22
 */
export declare class CmakeUtil {
    private static _log;
    static readonly _nativeCacheDir: string;
    static readonly ARCH_X86_64: string;
    static readonly OHOS_MIN_NDK_FOR_X86_64: SdkVersion;
    static readonly HOS_MIN_NDK_FOR_X86_64: SdkVersion;
    static parseLibraries(output: string, target: string, abi: string): Map<string, NativeLibraryModel>;
    static checkNativeHeader(headerDir: string, moduleModel: ModuleModel, fileMap: Map<string, string>): void;
    /**
     * 当native参数修改时, 删除cmake的缓存文件CMakeCache.txt, 使cmake重新编译.
     *
     * @param {string} workDir cache文件目录
     */
    static cleanCache(workDir: string): void;
    /**
     * 检查native配置CMakeLists.txt路径
     *
     * @param module CoreModuleModelImpl
     * @param targetName
     * @param nativeOpt
     */
    static getCmakeListDir(module: CoreModuleModelImpl, targetName: string, nativeOpt?: ExternalNativeOpt): string;
    /**
     * 根据项目类型及ndk版本添加X86_64架构
     *
     * @param abiFilters 已配置架构集合
     * @param isOhos isOhos
     * @param ndkVersion 当前编译ndk版本
     */
    static resolveArch(abiFilters: string[], isOhos: boolean, ndkVersion: SdkVersion): void;
    static getMayBeOccurErrorsFilePath(moduleModel: CoreModuleModelImpl): string;
    /**
     * 检查native配置abiFilters
     * 如果未配置或空配置，则默认所有abiFilters
     *
     * @param {string[] | undefined} abiFilters abiFilters
     * @param isHarmonyOS isHarmonyOS
     * @param moduleModel CoreModuleModelImpl
     * @param targetName string
     * @return {string[]} abiFilters
     */
    static checkAbiFilters(abiFilters: string[] | undefined, isHarmonyOS: boolean, moduleModel: CoreModuleModelImpl, targetName: string): string[];
    /**
     * native任务执行条件判断, 决定是否执行任务
     *
     * @param {ModuleModel} moduleModel ModuleModel
     * @param {ModuleTargetData} targetData ModuleTargetData
     * @param {ExternalNativeOpt} nativeOption ExternalNativeOpt
     * @return {boolean} 是否需要执行native任务
     */
    static nativeTaskCondition(moduleModel: ModuleModel, targetData: ModuleTargetData, nativeOption?: ExternalNativeOpt): boolean;
    /**
     * 解析自定义参数并合入
     *
     * @param {string[]} commands 内置参数
     * @param {string} nativeArgs 自定义参数
     * @return {string[]} 合并后的cmake命令
     */
    static mergeCommandLine(commands: string[], nativeArgs: string[]): string[];
    /**
     * 将{CmakeArg}组合为命令行
     *
     * @param {Map<string, CmakeArg>} cmakeArgs 需要组合的命令
     * @param {string[]} original 原始命令行
     */
    static toCommandLine(cmakeArgs: Map<string, CmakeArg>, original: string[]): string[];
    /**
     * 解析cmake命令行为{CmakeArg}
     *
     * @param {string[]} commands 需要解析的命令
     * @param {Map<string, CmakeArg> | undefined} container 参数容器
     * @return {Map<string, CmakeArg>} 解析完成的命令行
     */
    static parseCmakeArgs(commands: string[], container: Map<string, CmakeArg> | undefined): Map<string, CmakeArg>;
    static parseStlFromCMakeCache(replyFolder: string): CacheEntry;
    static getCMakeArguments(args?: string[] | string): string[];
    /**
     * 暂时仅支持
     * -{prefix}{key}
     * -{prefix}{key}={value}
     * 暂时默认参数前缀两个字符 like. -D
     *
     * @param {string} text 解析字符串
     * @return {CmakeArg | undefined} CmakeArg
     */
    static parseArg(text: string): CmakeArg | undefined;
    static getHarExtraParams(ohModuleTask: PrepareSharedHarRes | AbstractProcessHarArtifacts): ExtraParamsForHar;
    static getCppSoName(ohModuleTask: PrepareSharedHarRes | AbstractProcessHarArtifacts): Set<string> | undefined;
    /**
     * 将CmakeArg组合为命令参数
     *
     * @param {CmakeArg} arg CmakeArg
     * @return {string} 命令
     */
    static assembleArg(arg: CmakeArg): string;
    /**
     * 生成/.cxx/.cmake/api/v1/query/codemodel-v2文件夹, 用来请求cmake生成codemodel
     *
     * @param cxxDir .cxx工作目录
     */
    static mkCodeModelRequest(cxxDir: string): void;
}
/**
 * cmake参数model
 *
 */
export declare class CmakeArg {
    private _prefix;
    private _key;
    private _value;
    constructor(prefix: string, key: string, value: string | undefined);
    getPrefix(): string;
    setPrefix(value: string): void;
    getKey(): string;
    setKey(value: string): void;
    getValue(): string | undefined;
    setValue(value: string | undefined): void;
}
