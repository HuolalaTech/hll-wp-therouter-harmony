import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
/**
 * 定义ohos-plugin的任务使用的中间路径
 *
 * @since 2021/12/15
 */
export interface PathInfo {
    /**
     * 构建目录的根路径名
     *
     * @returns {string}
     */
    getBuildRoot: () => string;
    /**
     * module的构建中间产物的根路径
     *
     * @return string /build
     */
    getModuleBuildPath: () => string;
    /**
     * module的构建产物的临时目录
     *
     * @return string /build/[product]/cache
     */
    getModuleBuildCachePath: () => string;
    /**
     * module的构建产物目标路径
     *
     * @return string
     */
    getModuleBuildOutputPath: () => string;
    /**
     * 获取模块build下的OhosTest目录
     */
    getModuleBuildOhosTestOutputPath: () => string;
    /**
     * 构建处理module.json后的中间目录
     *
     * @return string
     */
    getIntermediatesProcessProfile: (compilerType: string) => string;
    /**
     * 针对hap/hsp收集依赖har的ability场景 为ark编译新增processProfile处理后的module.json源文件
     */
    getIntermediatesArkModuleJsonPath: () => string;
    /**
     * 构建处理resources后的资源编译目录
     *
     * @return string
     */
    getIntermediatesRes: () => string;
    /**
     * fa模型, 最终打包到hap里的assets目录
     *
     * @return string
     */
    getIntermediatesFaAssetsPath: (product: ProjectBuildProfile.ProductBuildOpt) => string;
    /**
     * 构建过程中ace/ets-loader生成的assets的目录
     *
     * @return string
     */
    getInterMediatesLoaderOutPath: () => string;
    /**
     * 构建过程中为不同构建模式支持debug用途，用于存放sourceMap文件的目录路径
     *
     * @return string
     */
    getInterMediatesSourceMapDirPath: () => string;
    /**
     * 构建过程中merge后的json文件的目录
     *
     * @return string
     */
    getIntermediatesMergeProfile: () => string;
    /**
     * 构建过程中merge资源后的路径
     *
     * @return string
     */
    getIntermediatesMergeRes: () => string;
    /**
     * 构建过程中merge资源后的Index文件
     *
     * @return string
     */
    getIntermediatesMergeFile: () => string;
    /**
     * 构建处理native libs后的中间目录
     *
     * @return string
     */
    getIntermediatesProcessLibs: () => string;
    /**
     * native libs中所有的so文件strip的产物
     *
     * @return string
     */
    getIntermediatesStrippedLibsDir: () => string;
    /**
     * native libs中所有的so文件strip使用的缓存文件路径
     *
     * @return string
     */
    getIntermediatesPatch: () => string;
    /**
     * 构建处理syscap后的文件目录
     *
     * @return string
     */
    getIntermediatesSysCap: () => string;
    /**
     * 构建处理routerMap临时文件目录
     * @param routerMapFileName
     */
    getIntermediatesRouterMap: (routerMapFileName: string) => string;
    /**
     * 构建处理启动框架配置startup临时目录
     * @param startupFileName
     */
    getIntermediatesStartupPath: (startupFileName: string) => string;
    /**
     * 构建过程中c++代码编译输出路径 entry/.cxx
     *
     * @return string
     */
    getCppOutputDir: () => string;
    /**
     * 构建过程ninja工作目录 entry/.cxx/{product}/{target}
     */
    getNinjaWorkDir: () => string;
    /**
     * 构建过程中shell工程的res资源中间目录
     *
     * @return ../build/intermediates/shell/build/res
     */
    getShellBuildResourceDir: () => string;
    /**
     * 构建过程中c++代码编译输出目录
     *
     * @return ../build/intermediates/cmake/[target]/obj
     */
    getIntermediatesCppOutPut: () => string;
    /**
     * 构建过程中临时文件保存目录
     *
     * @return ../build/intermediates/temp
     */
    getIntermediatesTemp: () => string;
    /**
     * 构建过程中entry/feature模块build中间目录下的output_metadata.json
     *
     * @return ./build/{productName}/intermediates/hap_metadata/{targetName}/output_metadata.json
     */
    getIntermediatesOutputMetadata: () => string;
    /**
     * 构建过程中hsp模块build中间目录下的output_metadata.json
     *
     * @return ./build/{productName}/intermediates/hsp_metadata/{targetName}/output_metadata.json
     */
    getIntermediatesHspOutputMetadata: () => string;
    /**
     * 预览过程中模块.preview产物目录下module.json
     */
    getPreviewIntermediatesResModuleJsonPath: () => string;
    /**
     * 预览过程中模块.preview产物资源目录下main_pages.json
     */
    getPreviewIntermediatesMainPagesJsonPath: () => string;
    /**
     * 获取集成态hsp存储目录
     */
    getIntegratedHspOutputPath: () => string;
    /**
     * get fastapp storage directory
     */
    getFastAppStorageDirectory: () => string;
}
