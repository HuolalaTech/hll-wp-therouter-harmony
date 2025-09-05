import { PackingOptAsset } from '../options/build/build-opt.js';
import { OhPackageInfoGetter } from '../validate/dependenct-param-validate.js';
import { pathParamsOpt } from '../validate/dependency-tag-validate.js';
/**
 * 处理文件的工具类
 *
 * @since 2021/12/29
 */
export declare class FileUtil {
    private static _log;
    static linkFile(source: string, destination: string, followLink?: boolean): Promise<void>;
    /**
     * 检查文件是否存在, 不跟随软链接, 当文件为软链接时, 仅检查软链接文件本身是否存在
     * 如需检查软链接目标源文件是否存在, 请使用fs.stat
     *
     * @param location
     */
    static exists(location: string): Promise<boolean>;
    static isDirectory(...pathSegments: string[]): boolean;
    static checkDirWithoutDelete(...pathSegments: string[]): void;
    static checkFile(...pathSegments: string[]): void;
    static makeFile(filePath: string, data?: string): void;
    static deleteFile(filePath: string): void;
    static readFile(filePath: string): string | undefined;
    /**
     * 校验路径长度
     *
     * @param path 待校验的路径
     */
    static checkPathLength(path: string): void;
    static hashEntry(dir: string, pattern?: string): Promise<Map<string, string>>;
    private static pipelineAsync;
    static hashContent(file: string): Promise<string>;
    static hashStats(file: string): string;
    /**
     * 将路径转换为绝对路径
     *
     * @param {string} dir 文件或目录路径
     * @param {string} currentDir 当前路径，参考路径
     * @return {string} 转换后的绝对路径
     */
    static convertToAbsolutePath(dir: string, currentDir: string): string;
    static convertToAbsolutePaths(dirs: string[], currentDir: string): string[];
    static isSubDir(parent: string, child: string): boolean | "";
    /**
     * 校验文件是否存在
     *
     * @param completePath 文件完整路径
     */
    static fileExists(completePath: string): boolean;
    /**
     * 匹配文件或目录是否存在
     *
     * @param filePath 文件或目录路径
     * @param nocase 是否忽略大小写，true: yes, false: no
     */
    static matchingFile(filePath: string, nocase?: boolean): boolean;
    static copySpecialFileToTempDir(_moduleDir: string, taskTmpDir: string): void;
    /**
     * 处理打包配置
     * @param _moduleDir 模块根目录
     * @param asset 配置项内容
     * @param taskTmpDir temp文件夹
     */
    static disposalPackingOptionAsset(_moduleDir: string, asset: PackingOptAsset | undefined, taskTmpDir: string): void;
    /**
     * 处理打包配置中的白名单配置
     * @param includes 白名单
     * @param _moduleDir 模块根目录
     * @param taskTmpDir temp文件夹
     */
    private static disposalPackingOptInclude;
    /**
     * 处理打包配置中的黑名单配置
     * @param excludes 黑名单
     * @param taskTmpDir temp文件夹
     */
    private static disposalPackingOptExclude;
    /**
     * 递归读取一个文件夹下面的所有文件名
     * @param dir
     */
    static readDirFileNames(dir: string): Promise<Set<string>>;
    /**
     * 在不改变原有package.json的情况下添加参数useNormalizedOHMUrl到临时的package.json文件中
     *
     * @param isOhpmProject
     * @param taskTmpDir
     * @param params
     * @param extraParams
     * @param targetName
     * @param libsFileNameSet libs下面的文件名集合
     */
    static addParamToOhPack(isOhpmProject: boolean, taskTmpDir: string, params: object, extraParams: ExtraParamsForHar, targetName: string, libsFileNameSet: Set<string>): void;
    static mergeExtraParamsToOhPack(packJsonObj: any, extraParams: ExtraParamsForHar, targetName: string, libsFileNameSet: Set<string>): any;
    /**
     * 编译构建shared library模块的har产物中添加额外的文件，不区分大小写
     * readme.opensource、license、changelog.md、readme.md及changelog与readme的国际化文件
     * @param fileName string
     */
    static checkSpecialFile(fileName: string): boolean;
    /**
     * 重复文件名处理
     * @param fileNames  工程目录结构中读取的文件名数组
     * @param profileName 新增文件名
     * @private
     */
    static uniqueFileName(fileNames: string[], profileName: string): string | undefined;
    /**
     * 给重复文件添加后缀以区分唯一文件名
     * @param name
     * @param index
     */
    static addSuffix(name: string, index: number): string;
    /**
     * 遍历文件夹获取其中所有文件的文件名
     * @param fileFolderPath
     */
    static traverseFileFolder(fileFolderPath: string): string[];
    /**
     * 遍历文件夹并获取其中所有的文件路径
     * @param fileFolderPath
     */
    static getAllFilesFromFolder(fileFolderPath: string): string[];
    /**
     * 获取文件格式后缀
     * @param filePath
     */
    static getFileSuffix(filePath: string): string;
    /**
     * 读取路径时将分隔符转为正斜杆
     * eg: a\\b\\c -> a/b/c
     *
     * @param {string} path 原始字符串
     * @returns {string} 转化后的字符串
     */
    static normalizePathSeparator(path: string): string;
    /**
     * 解析jsonPathObj中使用的引用,在parameterFileObj中找到对应的value值,直接修改jsonPathObj的内容
     *
     * @param jsonPathObj  需要被替换的json对象
     * @param parameterFileObj  param对象
     * @param whiteList 白名单，不配置默认替换全部
     * @param pathParamsObj  路径参数对象，其中包括ohPackage.json5和parameter.json两个文件所在路径
     * @param ohPackageInfoGetter
     * @return string[] 如果参数化的是本地产物依赖，需要记录它的绝对路径，在打包har时把本地产物依赖打进去
     */
    static resolveJsonObjWithoutParam(jsonPathObj: any, parameterFileObj: object | undefined, pathParamsObj: pathParamsOpt, whiteList?: string[], ohPackageInfoGetter?: OhPackageInfoGetter): string[];
    private static extractValue;
    /**
     * 针对oh-package.json5的依赖进行param的替换
     *
     * @param {string} value 待替换的值
     * @param dependencyName  oh-package中需要被替換的key值
     * @param {object | undefined} parameterFileObj 替换映射表对象
     * @param pathParamsObj
     * @returns {string} 替换后的真实version值
     */
    static extracted(value: string, parameterFileObj: object | undefined, pathParamsObj: pathParamsOpt, dependencyName?: string): string;
    /**
     * 拷贝文件夹
     * @param src
     * @param dest
     */
    static copyDir(src: string, dest: string): void;
    /**
     * 判断目录是否为空
     *
     * @param {string} dirPath 目录路径
     * @returns {Promise<boolean>}
     */
    static isEmptyDir(dirPath: string): Promise<boolean>;
}
export interface ExtraParamsForHar {
    compatibleSdkVersion: number;
    compatibleSdkType: string;
    obfuscated: boolean;
    nativeComponents?: NativeComponents[];
}
export interface NativeComponents {
    name: string;
    compatibleSdkVersion: number;
    compatibleSdkType: string;
    linkLibraries: string[];
}
