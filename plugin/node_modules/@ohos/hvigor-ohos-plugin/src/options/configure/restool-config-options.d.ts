/**
 * 生成调用restool工具时需要的文件配置项
 *
 * @since 2022/6/29
 */
export interface ResToolConfigObj {
    configPath?: string;
    packageName?: string;
    output?: string;
    startId?: string;
    moduleNames?: string;
    ResourceTable: string[];
    applicationResource?: string;
    moduleResources: string[];
    dependencies: string[];
    entryCompiledResource?: string;
    ids?: string;
    definedIds?: string;
    iconCheck?: boolean;
    definedSysIds?: string;
    compression?: string;
    thread?: number;
    ignoreResourcePattern?: string[];
}
/**
 * 生成restool 链接命令所需参数封装对象
 *
 * @since 2022/9/26
 */
export interface RestoolLinkParamObj {
    appScopeResources?: string;
    moduleResourcesMap?: Map<string, string>;
    harResourcesMap?: Map<string, string>;
    outputPath?: string;
    linkCommand?: string[];
    idsMapPath?: string;
}
