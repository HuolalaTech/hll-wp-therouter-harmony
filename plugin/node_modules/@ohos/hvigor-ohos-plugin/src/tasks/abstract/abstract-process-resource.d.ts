import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { RestoolConfigBuilder } from '../../builder/restool-file-config-builder.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { AbstractResource } from './abstract-resource-task.js';
/**
 * 编译前的资源处理和生成resConfig.json的公共抽象类
 *
 * @since 2022/9/8
 */
export declare abstract class AbstractProcessResource extends AbstractResource {
    protected resConfigFilePath: string | undefined;
    protected entryModuleName: string | undefined;
    protected processedJson: string;
    protected constructor(taskService: TargetTaskService, taskDetails: TaskDetails);
    getEnabled(): boolean;
    initTaskDepends(): void;
    protected doTaskAction(): void;
    abstract initCommandBuilder(): void;
    declareInputs(): Map<string, TaskInputValue>;
    declareOutputFiles(): FileSet;
    /**
     * is enabled icon check.
     *
     * @return {boolean} true/false
     */
    isEnabledIconCheck(): boolean;
    /**
     * 处理用户配置的资源编译线程数，没配置返回undefined，配置超过cpu限制则自动适配
     * @return {number | undefined}
     */
    processResCompileThreads(): number | undefined;
    /**
     * 处理用户配置的ignoreResourcePattern，没配置返回undefined
     * @return {number | undefined}
     */
    processIgnoreResourcePattern(ignoreResourcePattern: string[] | undefined): string[] | undefined;
    /**
     * ohosTest编译资源时同时编译src/main下的resources默认资源
     * 在Ability.test.ets中引用main下的ets文件时，可能会使用main下的resources资源
     * 多个moduleResource编译时，先添加的inputDir比后者优先级高
     * @param {RestoolConfigBuilder} restoolConfigBuilder resConfig.json资源编译入参对象
     */
    addOhosTestExtraCompilationResources(restoolConfigBuilder: RestoolConfigBuilder): void;
    addIntermediatesSrcResource(restoolConfigBuilder: RestoolConfigBuilder, ohosTestSourceRoot: string): void;
}
