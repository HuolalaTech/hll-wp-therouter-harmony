import { Project } from '@ohos/hvigor';
import { DistroFilterConfig } from '../distribution/distro-filter-handler.js';
import { ProjectModel } from '../model/project/project-model.js';
import { ProjectTaskService } from './service/project-task-service.js';
import { OhosAppTask } from './task/ohos-app-task.js';
/**
 * 执行app打包相关任务前，需要进行一些预校验或者准备工作
 *
 * @since 2022/6/17
 */
export declare class PreBuildApp extends OhosAppTask {
    constructor(project: Project, taskService: ProjectTaskService);
    protected doTaskAction(): void;
    /**
     * 为了防止有多个入口影响打包app的逻辑，需要增加该校验
     * 1.打包app只从项目的根build-profile.json中确认，不允许在命令行中再通过-p module指定Module和Target
     * 2.在build-profile.json5中至少有一个模块的一个target会执行打包hap
     *
     * @private
     */
    private checkConfigModuleStatus;
    /**
     * distroFilter校验
     * 1.多entry设备类型存在交集场景
     * 2.target定制化场景
     * @param projectModel
     * @private
     */
    private validateDistroFilter;
    /**
     * 判断当前工程是否为api8 FA模型
     * @param projectTaskService ProjectTaskService
     * @private
     */
    private isApi8Fa;
    /**
     * 以target维度对build-profile.json5中的config-distroFilter进行校验
     * @param projectModel
     */
    processTargetDistroFilter(projectModel: ProjectModel): void;
    /**
     * 以模块维度仅在多entry且设备类型存在交集时对config.json中的distroFilter进行校验
     * @param projectModel
     */
    processEntryDistroFilter(projectModel: ProjectModel): void;
    /**
     * 传递distroFilter校验链请求
     * @param projectModel
     * @param distroFilterConfigList distroFilter配置集合
     * @private
     */
    sendDistroFilterRequest(projectModel: ProjectModel, distroFilterConfigList: DistroFilterConfig[]): void;
    initTaskDepends(): void;
}
