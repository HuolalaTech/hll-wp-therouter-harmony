import { TargetTaskService } from '../service/target-task-service.js';
import { TestCopyMockConfigJson } from '../task/test-copy-mock-config-json.js';
/**
 * 测试框架执行mock时要把 build/default/intermediates/res/{default}/mock-config.json 。
 * mock-config.json 是由ets-loader生成到 intermediates 目录下的。
 * 拷贝到测试包 hap 中的resources/rawfile/mock/mock-config.json 。
 */
export declare class UnitTestCopyMockConfigJson extends TestCopyMockConfigJson {
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
}
