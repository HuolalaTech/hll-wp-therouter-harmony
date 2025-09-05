import { DebugSymbol } from '../options/build/build-opt.js';
export declare class SoStripUtil {
    /**
     * 获取basePath下所有符合exclude规则的文件
     *
     * @param collectAllLibs
     * @param exclude exclude规则
     * @param basePath basePath
     * @return basePath下符合规则的文件
     */
    static matchedFiles(collectAllLibs: boolean | undefined, exclude: string[] | undefined, basePath: string): string[];
    /**
     * 获取basePath下所有不符合exclude规则的文件
     *
     * @param collectAllLibs
     * @param exclude 排除规则
     * @param basePath basePath
     * @return basePath下排除符合规则的文件
     */
    static filesExcluding(collectAllLibs: boolean | undefined, exclude: string[] | undefined, basePath: string): string[];
    /**
     * 判断是否需要strip
     *
     * @param debugSymbol 用户填写的strip选项
     * @return true需要 false不需要
     */
    static needStrip(debugSymbol: DebugSymbol | undefined): boolean;
}
