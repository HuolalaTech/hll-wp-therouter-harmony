import { FileSet, TaskDetails } from '@ohos/hvigor';
import { SignTypeEnum } from '../enum/sign-type-enum.js';
import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { BaseSign } from './base/base-sign.js';
import { TargetTaskService } from './service/target-task-service.js';
import { SignModel } from './sign/command-builder-impl/sign-model.js';
import RemoteHspOpt = ProjectBuildProfile.RemoteHspOpt;
import { Dependency } from '../project/dependency/core/dependency-interface.js';
export interface SignConfig {
    signCommand: string[];
    moduleName: string;
    signType: SignTypeEnum;
    bundleName: string;
    verifySignCommands: string[];
}
export declare abstract class SignRemoteHsp extends BaseSign {
    protected readonly allProjectSignedRemoteHspList: SignModel[];
    protected readonly allModuleSignedRemoteHspList: SignModel[];
    protected readonly allProjectRequiredSignRemoteHspMap: Map<string, RemoteHspOpt>;
    protected readonly allModuleRequiredSignRemoteHspMap: Map<string, RemoteHspOpt>;
    protected readonly allProjectHspPathList: string[];
    protected readonly allModuleHspPathList: string[];
    protected readonly allProjectRemoteHspPathList: string[];
    protected readonly allModuleRemoteHspPathList: string[];
    protected readonly projectRemoteHspCachePath: string;
    protected readonly _log: OhosLogger;
    protected constructor(targetService: TargetTaskService, taskDetails: TaskDetails, signType?: SignTypeEnum);
    protected doTaskAction(): Promise<void>;
    declareInputFiles(): FileSet;
    /**
     * 获取工程级需要签名的remoteHspMap
     * @param remoteHspPath
     * @param npmDependencies
     * @protected
     */
    protected getProjectSignRemoteHspMap(remoteHspPath: string, npmDependencies: Dependency[]): void;
    /**
     * 如果不存在remoteHspCache.json文件，则新建文件夹并赋值空对象
     * @private
     */
    protected createProjectRemoteHspCache(): void;
    /**
     * 获取模块级级需要签名的remoteHspMap
     * @param remoteHspPath
     * @param npmDependencies
     * @protected
     */
    protected getModuleSignRemoteHspMap(remoteHspPath: string, npmDependencies: Dependency[]): void;
    /**
     * 初始化需要签名的list信息
     *
     * @param allOhpmHspPathList  oh_mudules的签名路径list
     * @param allSignedHspPathList  工程级Build-Cache目录下即将签名的hsplist
     * @param allHspSignModelList   需要签名的远程hsp签名信息list
     * @param allRequiredSignRemoteHspMap  所有需要签名的远程hsp信息map
     * @protected
     */
    protected initAllSignRemoteHspList(allSignedHspPathList: string[], allOhpmHspPathList: string[], allHspSignModelList: SignModel[], allRequiredSignRemoteHspMap: Map<string, RemoteHspOpt>): void;
    protected initDefaultSignConfig(signOhpmModel: SignModel, signCommand: string[], verifySignCommands: string[]): SignConfig;
    /**
     * 提交签名任务到worker进程
     *
     * @param signOhpmModel  signModel签名信息
     * @param callback  worker执行后的回调函数
     * @protected
     */
    protected submitSignWorker(signOhpmModel: SignModel, callback: Function): Promise<void>;
    protected signRemoteHspCallBack(projectRemoteHspCachePath: string, signedHspPath: string): void;
    initTaskDepends(): void;
}
