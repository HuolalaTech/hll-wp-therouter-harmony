import { Component, PathAndApiVersion } from '@ohos/sdkmanager-common';
import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import { CommonSdkInfo } from './common-sdk-info.js';
import ApiMeta = ProjectBuildProfile.ApiMeta;
export declare class OhosSdkInfo extends CommonSdkInfo {
    private readonly ohComponents;
    private ohosLocalComponents;
    constructor(requireComponents: string[], sdkVersion: ApiMeta, sdkDir: string);
    setOhosMetaCompileSdkVersion(): void;
    setup(): Promise<void>;
    contains(pathAndApi: PathAndApiVersion, all: Map<PathAndApiVersion, Component>): Component | undefined;
    getLibimageTranscoderShared(): string;
    getHosToolchainsLibDir(): string;
    getSystemThemeSchema(): string;
}
