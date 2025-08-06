import { Component, OhLocalComponentLoader, PathAndApiVersion, SdkProxyInfo } from '@ohos/sdkmanager-common';
import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
/**
 * 根据OpenHarmony sdk目录结构规则预测是否存在相关组件
 * /${OhosSdkRoot}/${API}/${component}
 * /sdk/openharmony/10/toolchains
 *
 * @param sdkDir
 * @param version
 * @param components
 */
export declare const ohosPredict: (sdkDir: string, version: string, components: string[]) => Map<PathAndApiVersion, Component>;
/**
 * 复用sdk-manager的oh-uni-package.json的解析能力
 */
export declare class OhosParser extends OhLocalComponentLoader {
    constructor(sdkRoot: string);
    parse(packages: string[]): Component[];
}
export declare const parseApiVersion: (version: string | number) => ProjectBuildProfile.ApiMeta;
export declare const proxyFun: () => SdkProxyInfo;
export declare const contains: (pathAndApi: string, all: Map<string, Component>) => Component | undefined;
export declare const handleSdkException: (ex: any) => void;
