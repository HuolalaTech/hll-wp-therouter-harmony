import { FileSet } from '@ohos/hvigor';
import { CodeType } from '../../enum/code-type-enum.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { ProjectConfig } from '@ohos/hvigor-arkts-compose';
import { ArkCompile } from '../ark-compile.js';
/**
 * 处理ohosTest Target时调用loader编译新模型的js/ets源码
 *
 * @since 2023/1/28
 */
export declare class OhosTestArkCompile extends ArkCompile {
    constructor(taskService: TargetTaskService, codeType: CodeType);
    declareInputFiles(): FileSet;
    protected initDefaultArkCompileConfig(): Promise<ProjectConfig>;
}
