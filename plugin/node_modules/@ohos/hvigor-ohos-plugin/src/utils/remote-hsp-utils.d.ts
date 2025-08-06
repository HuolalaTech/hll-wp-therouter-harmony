import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
import RemoteHspOpt = ProjectBuildProfile.RemoteHspOpt;
import { Module } from '@ohos/hvigor';
import { RemoteHspMetadata } from '../tasks/abstract/abstract-generate-metadata.js';
import { OhosLogger } from './log/ohos-logger.js';
import SigningConfigBuildOpt = ProjectBuildProfile.SigningConfigBuildOpt;
import { ModuleTaskService } from '../tasks/service/module-task-service.js';
import { ProjectTaskService } from '../tasks/service/project-task-service.js';
import { Dependency } from '../project/dependency/core/dependency-interface.js';
export interface RemoteHspCacheOpt {
    signingConfig: SigningConfigBuildOpt;
    signedRemoteHsps: Map<string, SignedRemoteHspOpt>;
}
export interface SignedRemoteHspOpt {
    hspFileName: string;
    hspDirName: string;
    version: string;
    hspPath: string;
    signedHspPath: string;
    isSigned: boolean;
    moduleName?: string;
}
/**
 * 获取当前模块需要打包的remote_hsp
 * 提供给外部使用的方法，为了支持在线签名，非需求变动不要轻易修改
 *
 * @param module hvigor项目中的子模块module
 * @param module
 */
export declare const getRemoteHspObjList: (module: Module) => RemoteHspOpt[];
/**
 * 通过remoteHsp的路径获取到remoteHsp信息
 *
 * @param remoteHspPath remoteHsp的路径信息
 * @param allRemoteHspMap 已经保存的remoteHsp信息，用于确保同名remoteHsp包只存在一个最高版本的
 */
export declare const getRemoteHspMap: (remoteHspPath: string, allRemoteHspMap?: Map<string, RemoteHspOpt>) => Map<string, RemoteHspOpt> | undefined;
/**
 * 获取远程hsp的hspName/hspVersion/hspPath
 *
 * @param hspDirPath
 * @param hspDirName
 * @param log
 */
export declare const getRemoteHspObj: (hspDirPath: string, hspDirName: string, log: OhosLogger) => RemoteHspOpt | undefined;
/**
 * 通过远程hsp路径下的oh-package.json获取hspName和hspVersion
 *
 * @param ohPackagePath
 * @param log
 */
export declare const getHspBaseData: (ohPackagePath: string, log: OhosLogger) => RemoteHspOpt | undefined;
/**
 * 判断是否需要将当前远程hsp打包
 * ver1大于ver2返回1 小于返回-1 相等返回0 现版本比较方法为 正式版本1.0.1 > 正式版本1.0.0 正式版本1.0.1 > 先行版本1.0.1-rsc
 * 正式版本1.0.1 > 先行版本1.0.2-rsc 先行版本1.0.1-rsc > 先行版本1.0.1-rs 先行版本1.0.2-rs > 先行版本1.0.1-rsc
 *
 * @param hspObj
 * @param allRemoteHspPath
 * @private
 */
export declare const compareIfSetRemoteHsp: (hspObj: RemoteHspOpt, allRemoteHspPath: Map<string, RemoteHspOpt>) => boolean;
/**
 * ver1大于ver2返回1 小于返回-1 相等返回0 现版本比较方法为 正式版本1.0.1 > 正式版本1.0.0 正式版本1.0.1 > 先行版本1.0.1-rs
 *  正式版本1.0.1 > 先行版本1.0.2-rsc  先行版本1.0.1-rsc  > 先行版本1.0.1-rs
 *
 * @param versions
 */
export declare function semverMaxSatisfying(versions: string[]): string | null;
/**
 * 获取签名后的remoteHsp的数据信息
 *
 * @param service
 * @param productName
 */
export declare function getSignRemoteHspMetadata(service: ModuleTaskService, productName: string): RemoteHspMetadata[] | undefined;
/**
 * 获取hsp的packageName和remoteHsp路径的映射关系
 *
 * @param service
 * @param npmDependencies
 */
export declare function getRemoteHspPathMap(service: ModuleTaskService | ProjectTaskService, npmDependencies: Dependency[]): Map<string, string>;
/**
 * 初始化在.hsp目录下的remote hsp的相关信息
 *
 * @param remoteHspPath
 * @param allRemoteHspPathMap
 * @param npmDependencies
 */
export declare function initSignRemoteHspMap(remoteHspPath: string, allRemoteHspPathMap: Map<string, RemoteHspOpt>, npmDependencies: Dependency[]): void;
