import { Module, Project } from '@ohos/hvigor';
import { AppPlugin } from '../app-plugin.js';
import { AbstractHapModulePlugin } from '../common/abstract-hap-module-plugin.js';
import { AbstractHarModulePlugin } from '../common/abstract-har-module-plugin.js';
import { HspPlugin } from '../hsp-plugin.js';
export declare class PluginFactory {
    static getAppPlugin(project: Project, isFaMode?: boolean): AppPlugin;
    static getHapPlugin(module: Module, isFaMode?: boolean): AbstractHapModulePlugin;
    static getHarPlugin(module: Module, isFaMode?: boolean): AbstractHarModulePlugin;
    static getHspPlugin(module: Module): HspPlugin;
    private static initializeTaskDepends;
    private static isOnlyCleanTask;
    private static initHspPluginGlobalData;
    /**
     * 通过公共参数判断是否要对未存在的buildModeInfo报错
     *
     * @private
     */
    private static ifThrowBuildModeError;
    /**
     * 加载仓颉，动态处理schema
     *
     * @private
     */
    private static dealCangjieSchema;
}
