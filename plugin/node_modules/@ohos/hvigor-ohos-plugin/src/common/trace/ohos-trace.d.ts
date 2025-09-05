import { RestoolCompressionTrace, TraceIncrement } from './type.js';
declare class OhosTrace {
    static readonly TRACE_KEY = "HVIGOR_OHOS_PLUGIN";
    private data;
    constructor();
    /**
     * 传输数据给打点管理中心并且在落盘后清理数据
     */
    transmitDataToManager(): void;
    traceBuildMode(buildMode: string): void;
    traceNativeCompiler(compiler?: string): void;
    /**
     * 以替换的方式记录模块数据
     * @param {string} moduleName
     * @param {string} apiType
     */
    traceModules(moduleName: string, apiType?: string): void;
    /**
     * 获取打点数据里的模块数据
     * @param {string} moduleName
     * @returns {ModuleData | undefined}
     * @private
     */
    private getModule;
    traceRestoolCompression(moduleName: string, restoolCompressionReport: RestoolCompressionTrace): void;
    traceIncrement(moduleName: string, field: TraceIncrement, hasIncrement: boolean): void;
    traceIsUseCompilePlugin(moduleName: string | undefined): void;
    traceIsUseTransformLib(moduleName: string | undefined): void;
    traceUseNormalizedOHMUrl(useNormalizedOHMUrl?: boolean): void;
    traceIsAutoLazyImport(moduleName: string | undefined, isAutoLazyImport?: boolean): void;
}
export declare const ohosTrace: OhosTrace;
export {};
