import { testInstrumentParam, testPreviewerParam } from '@ohos/coverage/lib/src/types/testTemplate';
export type queueListOpt = {
    params: testInstrumentParam | testPreviewerParam;
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
};
type ExecuteCoverageType = 'generateUnitTestResult' | 'generateOhosTestResult';
type InstrumentParam = (testInstrumentParam | testPreviewerParam) & {
    hmsSdkApiPath?: string;
    runtimeType?: string;
};
/**
 * 命令行生成覆盖率报告的队列中心，保证多个模块输出覆盖率的场景下可以串行输出覆盖率报告避免冲突
 */
export declare class DeviceCoverageQueueCenter {
    private queueList;
    private isExecuting;
    private executeCoverageType;
    constructor();
    executeProxy(params: InstrumentParam, type?: ExecuteCoverageType): Promise<unknown>;
    private dequeue;
    protected innerExecuteProxy(params: InstrumentParam): Promise<void>;
}
export declare const deviceCoverageQueueCenter: DeviceCoverageQueueCenter;
export {};
