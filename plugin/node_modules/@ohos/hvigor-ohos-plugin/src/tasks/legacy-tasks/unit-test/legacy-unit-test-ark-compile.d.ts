import { FileSet } from '@ohos/hvigor';
import { ProjectConfig } from '@ohos/hvigor-arkts-compose';
import { OhosLogger } from '../../../utils/log/ohos-logger.js';
import { LegacyArkCompile } from '../legacy-ark-compile.js';
/**
 * 单元测试ArkTS编译 fa模型
 *
 * @since 2023/4/23
 */
export declare class LegacyUnitTestArkCompile extends LegacyArkCompile {
    logger: OhosLogger;
    declareInputFiles(): FileSet;
    protected initDefaultArkCompileConfig(): Promise<ProjectConfig>;
    initTaskDepends(): void;
    protected doTaskAction(): Promise<void>;
}
