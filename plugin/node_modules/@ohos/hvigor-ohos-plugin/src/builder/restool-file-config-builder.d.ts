import { FileSet } from '@ohos/hvigor';
import { RestoolBuilderInterface } from './restool-builder-interface.js';
/**
 * 生成调用restool工具时需要的配置文件内容
 *
 * @since 2022/6/6
 */
export declare class RestoolConfigBuilder implements RestoolBuilderInterface {
    inputFiles: FileSet;
    outputFiles: FileSet;
    existsResourceDir: boolean;
    private resToolConfigObj;
    getConfigObject(): object;
    /**
     * 超纹理功能生成的 opt-compression.json 中的 path 文件路径会过滤不在资源目录中的
     * 资源目录取 resConfig.json 中的 applicationResource, moduleResources, dependencies
     * 分别表示：AppScope/resources，当前模块的资源目录，以及依赖的 har 模块资源目录
     */
    getResourceDir(): string[];
    addInputVariantDir(inputVariantDir: string): RestoolBuilderInterface;
    addInputDir(inputDir: string, inputType?: string): RestoolBuilderInterface;
    private addAppInputDir;
    private addModuleInputDir;
    private addHarInputDir;
    addJsonFile(jsonFile: string): RestoolBuilderInterface;
    addModulePackName(packName: string): RestoolBuilderInterface;
    addEntryCompiledResource(inputDir: string): RestoolBuilderInterface;
    addOutputDir(outputDir: string): RestoolBuilderInterface;
    addIdsPath(idsPath: string): RestoolBuilderInterface;
    addDefinedIds(definedIds: string): RestoolBuilderInterface;
    addDefinedSysIds(definedSysIds: string): RestoolBuilderInterface;
    addResTable(resTable: string): RestoolBuilderInterface;
    setIconCheck(enable: boolean): RestoolBuilderInterface;
    setResCompileThread(thread: number | undefined): RestoolBuilderInterface;
    setIgnoreResourcePattern(ignoreResourcePattern: string[] | undefined): RestoolBuilderInterface;
    forceDelete(): RestoolBuilderInterface;
    incremental(): RestoolBuilderInterface;
    compressImage(): RestoolBuilderInterface;
    addOutputBak(outputBak: string): RestoolBuilderInterface;
    addModules(modules: string): RestoolBuilderInterface;
    addStartId(startId: string): RestoolBuilderInterface;
    addAppScopeResourcesDir(inputDir: string): RestoolBuilderInterface;
    addHarResourcesMap(map: Map<string, string>): RestoolBuilderInterface;
    addModuleResourcesMap(map: Map<string, string>): RestoolBuilderInterface;
    incrementalCompile(): RestoolBuilderInterface;
    addCompression(compression: string): RestoolBuilderInterface;
}
