/**
 * hvigor-ohos-plugin项目的打点数据声明
 */
export interface OhosTraceData {
    BUILD_MODE?: string;
    MODULES: ModuleData[];
    USE_NORMALIZED_OHMURL?: boolean;
    NATIVE_COMPILER: string;
}
export interface ModuleData {
    MODULE_NAME: string;
    API_TYPE?: string;
    RESTOOL_COMPRESSION?: RestoolCompressionTrace;
    INCREMENTAL_TASKS?: Record<TraceIncrement, boolean>;
    IS_USE_COMPILE_PLUGIN?: boolean;
    IS_USE_TRANSFORMLIB?: boolean;
    IS_AUTO_LAZY_IMPORT?: boolean;
}
/**
 * 纹理压缩打点
 */
export interface RestoolCompressionTrace {
    /** 时间 */
    TIMESTAMP: number;
    /** 转换总个数 */
    TRANSCODE_FILES: number;
    /** 转换成功率 */
    TRANSCODE_SUCCESS_RATE: number;
    /** 转换总耗时 */
    TRANSCODE_TOTAL_TIME: number;
    /** 转换总膨胀率 */
    TRANSCODE_EXPANSION_RATE: number;
}
export type TraceIncrement = 'BUILD_NATIVE_WITH_CMAKE' | 'COMPILE_ARKTS';
