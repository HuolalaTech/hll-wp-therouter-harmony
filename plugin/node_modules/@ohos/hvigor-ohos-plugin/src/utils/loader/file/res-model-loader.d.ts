import { AppJson } from '../../../options/configure/app-json-options.js';
import { ConfigJson } from '../../../options/configure/config-json-options.js';
import { ModuleJson } from '../../../options/configure/module-json-options.js';
declare class ResModelLoader {
    private appJsonSchemaPath;
    private moduleJsonSchemaPath;
    getAppJson(appJsonPath: string): AppJson.AppOptObj;
    getModuleJson(moduleJsonPath: string): ModuleJson.ModuleOptObj;
    getConfigJson(configJsonPath: string): ConfigJson.ConfigOptObj;
    setAppJson(appJsonPath: string, appJsonObj: AppJson.AppOptObj): void;
    setModuleJson(moduleJsonPath: string, moduleJsonObj: ModuleJson.ModuleOptObj): void;
    /**
     * 从configFileLoader中读取一个配置文件，如果不存在则会从文件中读取
     * @param jsonPath
     * @param schemaPath 校验的schema文件路径
     * @private
     */
    private getResModelJsonObj;
    private setResModelJsonObj;
    protected validateBuildProfile(obj: object, schemaPath: string): void;
    initSchemaPath(appJsonSchemaPath: string, moduleJsonSchemaPath: string): void;
    clean(): void;
}
export declare const resModelLoader: ResModelLoader;
export {};
