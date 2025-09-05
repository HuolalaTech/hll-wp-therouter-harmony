import { HvigorLogger } from '@ohos/hvigor';
import { LogEvent } from '@ohos/hvigor-arkts-compose';
import { HvigorOhosPluginAdaptor } from '@ohos/hvigor-logger';
import { Level } from 'log4js';
import { ECM } from '../../error/error-code-map.js';
/**
 * Hvigor-Ohos-Plugin的定制logger
 *
 * @since 2022/3/3
 */
export declare class OhosLogger extends HvigorLogger {
    private messageMap;
    private errList;
    constructor(category?: string);
    /**
     * 获取对应类别的OhosLogger实例
     *
     * @param category 默认是default
     */
    static getLogger(category?: string): OhosLogger;
    static getLoggerWithDurationId(category: string, durationId: string): OhosLogger;
    _buildError(cause: string, errorCode?: string): this;
    /**
     * use _detail instead
     *
     * @deprecated use _detail instead
     * @param solution
     */
    _solution(solution: string): this;
    _detail(detail: string): this;
    _help(help: string): this;
    _record(): void;
    _printAllExit(): void;
    _format(): string;
    _file(file: string, line?: number, column?: number): this;
    _callstack(callstack: string): this;
    _printDebugCommand(toolName: string, command: string[] | object): void;
    _printWarn(moduleName: string): void;
    _printError(moduleName: string): void;
    _printErrorAndExit(moduleName?: string): void;
    private _formatLog;
    _errorCode(dece: ECM.DECE): this;
    protected getAdaptor(errorId: string): HvigorOhosPluginAdaptor;
}
export declare const handleLogs: (logs: LogEvent[], logger: OhosLogger, level: Level) => void;
