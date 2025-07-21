import { FileSet } from '@ohos/hvigor';
import { CodeType } from '../../enum/code-type-enum.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { CompileNode } from '../compile-node.js';
/**
 * 处理ohosTest Target时调用loader编译新模型的js/arkts源码
 *
 * @since 2022/12/22
 */
export declare class OhosTestCompileNode extends CompileNode {
    constructor(taskService: TargetTaskService, codeType: CodeType);
    declareInputFiles(): FileSet;
}
