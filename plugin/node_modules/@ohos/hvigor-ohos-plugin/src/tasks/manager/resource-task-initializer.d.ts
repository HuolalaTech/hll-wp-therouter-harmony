import { CompileResource } from '../compile-resource.js';
import { ProcessResourceIncrement } from '../process-resource-increment.js';
import { ProcessResource } from '../process-resource.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { TargetTaskCreator, TaskCreatorManager } from '../task-creator.js';
export declare const initResourceTasks: (creatorManager: TaskCreatorManager, service: TargetTaskService) => void;
export declare class ProcessResourceCA extends TargetTaskCreator {
    declareTaskDetail: () => import("@ohos/hvigor").TaskDetails;
    declareDepends(): string[];
    provider: () => ProcessResource;
}
export declare class CompileResourceCA extends TargetTaskCreator {
    declareTaskDetail: () => import("@ohos/hvigor").TaskDetails;
    declareDepends(): string[];
    provider: () => CompileResource;
}
export declare class ProcessResourceIncrementCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => import("@ohos/hvigor").TaskDetails;
    provider: () => ProcessResourceIncrement;
}
