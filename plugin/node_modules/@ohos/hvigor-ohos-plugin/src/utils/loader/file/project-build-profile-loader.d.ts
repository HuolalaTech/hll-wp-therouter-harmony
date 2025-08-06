import { ProjectBuildProfile } from '../../../options/build/project-build-profile.js';
import { AbstractBuildProfileLoader } from './abstract-build-profile-loader.js';
declare class ProjectBuildProfileLoader extends AbstractBuildProfileLoader {
    private logger;
    getBuildProfile(): ProjectBuildProfile.ProjectProfileOpt;
    setBuildProfileJson5Obj(hvigorNodeName: string, buildProfileJson5Obj: ProjectBuildProfile.ProjectProfileOpt, schemaCheck?: boolean): void;
    protected initializeReplace(json5Obj: ProjectBuildProfile.ProjectProfileOpt): ProjectBuildProfile.ProjectProfileOpt;
    private replaceTargets;
    /**
     * 检查是否能够set替换原有的buildProfile
     * 规则：
     * 1.工程级别的buildProfile文件中product里的 runtimeOs 和 name不能修改
     * 2.工程级别的buildProfile文件中products的数量不能变化
     * @param oldObj
     * @param newObj
     * @private
     */
    checkBuildProfile(oldObj: ProjectBuildProfile.ProjectProfileOpt, newObj: ProjectBuildProfile.ProjectProfileOpt): void;
    /**
     * 检查在ProjectProfileOpt中是否包含对maxFlowDepth的设置
     * @param newObj
     * @private
     */
    private checkMaxFlowDepth;
}
export declare const projectBuildProfileLoader: ProjectBuildProfileLoader;
export {};
