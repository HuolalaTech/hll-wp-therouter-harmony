/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2023. All rights reserved.
 *
 */
import { ArkCompileProjectModelType } from '@ohos/hvigor-arkts-compose';
import { ProjectModel } from '../../model/project/project-model.js';
import { RemoteHspCacheOpt, SignedRemoteHspOpt } from '../../utils/remote-hsp-utils.js';
import { IntegratedHspUtils } from '../../utils/integrated-hsp-utils.js';
export interface BuildModeOpt {
    ifThrowError: boolean;
    buildModeName: string;
    buildProfilePath: string;
}
/**
 * 全局的工程信息，只需要计算一次，模块级别任务可直接获取，不需要重复计算
 */
export declare class GlobalProjectDataService {
    private static INSTANCE;
    private compileProjectModel;
    private allModulePaths;
    private projectPkgJsonFileHash;
    private allModuleNameHash;
    private rootPathSet;
    private isEmptyTargetSdkVersionCheck;
    private buildModeInfo;
    private projectRemoteHspPromise;
    private moduleRemoteHspSet;
    private remoteHspCache;
    private integratedHspUtils;
    private _log;
    static getInstance(): GlobalProjectDataService;
    initGlobalProjectData(projectModel: ProjectModel): void;
    getIsEmptyTargetSdkVersionCheck(): boolean;
    setIsEmptyTargetSdkVersionCheck(): void;
    getCompileProjectModel(): ArkCompileProjectModelType;
    setProjectPkgJsonFileHash(projectPkgHash: string): void;
    getProjectPkgJsonFileHash(): string;
    getAllModuleNameHash(): string;
    setProjectRemoteHspPromise(promise: Promise<void>): void;
    getProjectRemoteHspPromise(): Promise<void> | undefined;
    setModuleRemoteHspPromise(moduleName: string): void;
    getModuleRemoteHspPromise(): Set<string>;
    setNeedSignedRemoteHspMap(hspDirName: string, obj: SignedRemoteHspOpt): void;
    getRemoteHspCache(): RemoteHspCacheOpt;
    getBuildModeInfo(): BuildModeOpt;
    setBuildModeInfo(newBuildModeInfo: BuildModeOpt): BuildModeOpt;
    /**
     * 判断remoteHsp是否需要签名，用于去重
     * @param hspDirName  hsp目录名
     * @param moduleName  模块名
     */
    needSignedRemoteHsp(hspDirName: string, moduleName: string): boolean;
    /**
     * 将map中的isSigned字段修改为true，用于判断是否需要写入缓存文件
     * @param signedHspPath 被签名的hsp路径
     */
    changeRemoteHspSigned(signedHspPath: string): void;
    /**
     * 判断map中的isSigned是否都为true用于判断是否需要写入缓存文件
     */
    allRemoteHspSigned(): boolean;
    getIntegratedHspUtils(): IntegratedHspUtils | undefined;
    getAllModulePaths(): string[];
    private initCompileProjectModel;
    initProjectPkgJsonFileHash(projectModel: ProjectModel): string;
    private initAllModuleNameHash;
    /**
     * 获取各个模块的belongProjectPath的映射关系
     */
    getRootPathSet(): Set<string>;
    resetRemoteHspCache(): void;
    /**
     * 读取缓存文件进行初始化，如果存在签名包则不重复签名
     * @param projectModel
     * @private
     */
    private initRemoteHspCache;
}
