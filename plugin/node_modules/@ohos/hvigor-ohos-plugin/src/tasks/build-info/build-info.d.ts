import { HvigorCoreNode, DefaultTask } from '@ohos/hvigor';
/**
 * 通过执行hvigor 命令打印Hvigor build-profile的信息
 * 调用方式：hvigor buildInfo [-p module=<moduleName>] [-p buildOption] [-p json]
 *
 * @since 2024/11/29
 */
export declare class BuildInfo extends DefaultTask {
    constructor(hvigorNode: HvigorCoreNode);
    registryAction(): Function;
    /**
     * 获取Module级构建信息
     * @return {any} 返回构建信息对象
     */
    private getModuleBuildInfo;
    /**
     * 获取Product级构建信息
     * @return {any} 返回构建信息对象
     */
    private getProjectBuildInfo;
    /**
     * 递归创建格式化信息
     * @param buildInfo 任意类型的数据，可以是字符串、数组或对象
     * @param formatInfo 用于存储格式化信息的字符串数组
     * @param level 当前的层级，用于生成前缀
     */
    private createFormatInfoRecursively;
    /**
     * 根据给定的层级数生成相应的前缀字符串
     * @param level 层级数，用于决定生成的前缀字符串的长度
     * @return 返回生成的前缀字符串
     */
    private getPrefix;
    /**
     * 获取产品列表
     * @param buildProfile 构建配置文件
     * @return 返回产品名称的字符串数组
     */
    private getProducts;
    /**
     * 获取产品列表
     * @param buildProfile 构建配置文件
     * @return 返回产品名称的字符串数组
     */
    private getModules;
    /**
     * 获取构建模式
     * @param {any} buildProfile - 构建配置文件
     * @return {string[]} 返回构建模式的数组
     */
    private getBuildModes;
    /**
     * 根据buildProfile内的信息，获取对应(moduleName, target, buildMode)元组的buildOption
     * @param buildProfile 构建配置
     * @param moduleName module名
     * @param buildModes 构建模式列表
     * @param displayBuildOption 是否加载buildOption
     * @return 构建选项对象
     */
    private getModuleBuildOption;
    /**
     * 根据buildProfile内的信息，获取对应(product, target, buildMode)元组的buildOption
     * @param buildProfile 构建配置
     * @param products 产品列表
     * @param buildModes 构建模式列表
     * @param displayBuildOption 是否加载buildOption
     * @return 构建选项对象
     */
    private getProductBuildOption;
}
