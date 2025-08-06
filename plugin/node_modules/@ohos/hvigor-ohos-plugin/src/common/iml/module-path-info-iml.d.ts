import { CoreModuleModelImpl } from '../../model/module/core-module-model-impl.js';
import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import { LegacyPathInfo } from '../legacy-path-info.js';
import { PathInfo } from '../path-info.js';
import { TargetTaskService } from '../../tasks/service/target-task-service.js';
export declare class ModulePathInfoIml implements LegacyPathInfo, PathInfo {
    private readonly _curModule;
    private readonly _targetName;
    private readonly _modulePath;
    private readonly _productName;
    private readonly _buildRoot;
    constructor(curModule: ModuleModel, targetName: string, productName: string, buildRoot?: string);
    getPatchDir(): string;
    getObfuscationExportRulePath(): string;
    getIntermediatesJavaDir(): string;
    getIntermediatesClassDir(): string;
    getIntermediatesDexDir(): string;
    getIntermediatesShellClassDir(): string;
    getIntermediatesShellDexDir(): string;
    getIntermediatesShellJavaDir(): string;
    getIntermediatesApkDir(): string;
    getBuildRoot(): string;
    getModuleBuildPath(supportBuildCacheDir?: boolean): string;
    getModuleSrcPath(): string;
    getModuleSrcMainPath(): string;
    getModuleSrcMockPath(): string;
    getModulePath(): string;
    getModuleSrcMainResourceRawfileArkdataPath(): string;
    getModuleSrcMainResourceRawfileUtdPath(): string;
    getModuleSrcMainResourceBaseProfilePath(): string;
    getModulePreviewPath(): string;
    getModuleProductPath(supportBuildCacheDir?: boolean): string;
    getModuleTestPath(): string;
    getModulePreviewProductPath(): string;
    /**
     * .preview/${productName}/intermediates/res/${targetName}
     */
    getModulePreviewIntermediatesResPath(): string;
    /**
     * .preview/${productName}/intermediates/res/${targetName}/resources/base/profile
     */
    getModulePreviewIntermediatesProfilePath(): string;
    getModuleBuildIntermediates(): string;
    getModuleBuildGenerated(): string;
    getModulePreviewBuildGenerated(): string;
    getModuleBuildOutputPath(): string;
    getModuleBuildOhosTestOutputPath(): string;
    getIntermediatesMergeRes(): string;
    getIntermediatesMergeFile(): string;
    getIntermediatesMergeProfile(): string;
    getIntermediatesProcessProfileDir(): string;
    getGenerateSourceR(): string;
    getGeneratePmDir(): string;
    getGenerateBuildProfilePath(targetName: string): string;
    getHarGenerateBuildProfilePath(): string;
    getGenerateModuleInfoPath(): string;
    getGenerateBuildProfileDir(): string;
    getPreviewGenerateSourceR(): string;
    getIntermediatesProcessProfile(): string;
    getIntermediatesArkModuleJsonPath(): string;
    getIntermediatesProcessLegacyProfile(): string;
    getIntermediatesRes(): string;
    getIntermediatesOhosTestResourceStr(): string;
    /**
     * 编译过程中sdk中处理生成mock-config.json的路径
     * /build/intermediates/res/${targetName}/mock-config.json
     *
     * @returns {string}
     */
    getIntermediatesMockConfigJsonFile(): string;
    /**
     * 中间临时mock目录,打包到目标产物中的mock相关的内容
     * /build/intermediates/res/${targetName}/resources/rawfile/mock
     *
     * @returns {string}
     */
    getIntermediatesResourcesRawFileMockDir(): string;
    /**
     * restool编译结果的产物profile的路径
     * 其中resources,base,profile是固定的，是restool中的定义
     *
     * @return ../intermediates/res/{targetName}/res/base/profile
     */
    getIntermediatesResProfilePath(): string;
    /**
     * arkData编译结果的产物arkdata路径
     *
     * @return ../intermediates/res/{targetName}/resources/rawfile/arkdata/schema
     */
    getIntermediatesResArkDataPath(): string;
    getIntermediatesFaAssetsPath(product: ProjectBuildProfile.ProductBuildOpt): string;
    getInterMediatesLoaderOutPath(): string;
    getInterMediatesSourceMapDirPath(): string;
    /**
     * 返回intermediate中的sourceMap的路径，若不存在就返回空字符串
     */
    getSourceMapIntermediatePath(): string;
    /**
     * 返回origin的sourceMap的路径,release和debug模式下路径不同
     * har的产物目录跟hap hsp的产物目录下的名称有所不同，需要进行区分
     * @input TargetTaskService
     */
    getSourceMapOriginPath(targetService: TargetTaskService): string;
    getInterMediatesAssetsPath(): string;
    getInterMediatesLoaderOutLitePath(): string;
    getIntermediatesLoaderPath(): string;
    getIntermediatesEtsTgzPath(moduleName: string): string;
    /**
     * 语义信息表路径
     */
    getIntermediatesPkgContextInfoPath(): string;
    getIntermediatesApPath(): string;
    getModuleBuildCachePath(): string;
    getIntermediatesMergeLegacyProfile(): string;
    getIntermediatesLegacyManifestJson(): string;
    getIntermediatesPackInfoDir(): string;
    getIntermediatesProcessLibs(): string;
    getIntermediatesStrippedLibsDir(): string;
    getIntermediatesPatch(): string;
    getIntermediatesSysCap(): string;
    getIntermediatesRouterMap(routerMapFileName: string): string;
    getIntermediatesStartupPath(startupFileName: string | undefined): string;
    getCppOutputDir(): string;
    getNinjaWorkDir(): string;
    getModuleShellDir(): string;
    getShellResourceDir(): string;
    getShellSrcMain(): string;
    getShellBuildResourceDir(): string;
    getIntermediatesCppOutPut(): string;
    getIntermediatesLiteBinSource(): string;
    getModuleBinOutput(): string;
    getIntermediatesLiteSource(): string;
    getIntermediatesTemp(): string;
    /**
     * 获取预览和调试对应的编译参数配置文件路径
     *
     * @param isPreview 是否是预览模式
     * @returns {string} 编译参数配置文件路径
     */
    getBuildConfigPath(isPreview?: boolean): string;
    getIntermediatesOutputMetadata(): string;
    getTestBuildConfigPath(): string;
    getIntermediatesHspOutputMetadata(): string;
    getFromConfigPathByTargetName(moduleModel: CoreModuleModelImpl, targetName: string, formConfigName: string | undefined): string | undefined;
    getSyscapJsonPathInfo(moduleModel: ModuleModel): string;
    getPreviewIntermediatesResModuleJsonPath(): string;
    getPreviewIntermediatesMainPagesJsonPath(): string;
    getUnitTestTemplatePath(): string;
    /**
     * 仓颉构建产物路径
     * @returns {string} 产物路径/intermediates/cj/extend_libs/{targetName}
     */
    getIntermediatesCangjieOutPut(): string;
    /**
     * 获取集成态hsp存储目录
     */
    getIntegratedHspOutputPath(): string;
    getDefaultSourceMapPath(): string;
    /**
     * 打包工具生成的缓存文件/中间产物路径
     */
    getPackageHapProductPath(): string;
    /**
     * Intermediate fastapp output path
     */
    getFastAppStorageDirectory(): string;
    /**
     * 根据HSP、HAR模块路径获取对顶的 resource_str目录
     */
    getDependencyResourceStr(modulePath: string): string;
    /**
     * 根据app,hap, hsp,字节码har, 源码har 获取对应的symbol路径
     */
    getSymbolsDir(modulePath: string): string;
    /**
     *  获取 resource_str目录
     */
    getResourceStr(): string;
    /**
     * loader.json路径
     */
    getLoaderJsonPath(): string;
    /**
     * widget_loader.json路径，用于辅助卡片编译
     */
    getWidgetLoaderJsonPath(): string;
}
