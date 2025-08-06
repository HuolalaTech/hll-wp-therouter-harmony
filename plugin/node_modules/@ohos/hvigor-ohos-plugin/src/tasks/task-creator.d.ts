import { CoreTask, Module, TaskDetails } from '@ohos/hvigor';
import { TaskCreation } from '@ohos/hvigor/src/base/internal/task/core/lazy-task-container.js';
import { TaskContainer } from '@ohos/hvigor/src/base/internal/task/interface/task-container-interface.js';
import { AbstractModulePlugin } from '../plugin/common/abstract-module-plugin.js';
import { ModuleTaskService } from './service/module-task-service.js';
import { TargetTaskService } from './service/target-task-service.js';
export interface CreationConfiguration {
    declareTaskDetail(): TaskDetails;
    declareDepends(): string[];
    configure(): void;
}
export declare abstract class DefaultTaskCreator implements CreationConfiguration, TaskCreation {
    abstract configure: () => void;
    abstract afterConfigure: () => void;
    abstract finalConfigured: () => void;
    abstract declareDepends(): string[];
    abstract declareTaskDetail(): TaskDetails;
    abstract depends: string[];
    abstract dependsDefinedByUser: string[];
    abstract details: TaskDetails;
    abstract provider: () => CoreTask;
}
export interface TargetAwareTask {
    targetService: TargetTaskService;
}
export declare abstract class GlobalTaskCreator extends DefaultTaskCreator {
    protected plugin: AbstractModulePlugin;
    protected service: ModuleTaskService;
    protected isFa: boolean;
    depends: string[];
    dependsDefinedByUser: string[];
    details: TaskDetails;
    constructor(service: ModuleTaskService, plugin: AbstractModulePlugin, isFa?: boolean);
    configure: () => void;
    afterConfigure: () => void;
    finalConfigured: () => void;
}
export declare abstract class TargetTaskCreator extends DefaultTaskCreator implements TargetAwareTask {
    protected node: Module;
    protected isFa: boolean;
    protected isFastBuild: boolean;
    targetService: TargetTaskService;
    depends: string[];
    dependsDefinedByUser: string[];
    details: TaskDetails;
    constructor(service: TargetTaskService, isFa?: boolean);
    configure: () => void;
    afterConfigure: () => void;
    finalConfigured: () => void;
}
export declare class TaskCreatorManager {
    private readonly _taskContainer;
    private readonly _creators;
    getTaskContainer(): TaskContainer;
    constructor(taskContainer: TaskContainer);
    registry(creator: DefaultTaskCreator): void;
    configure(): void;
}
