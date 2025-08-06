import { DebugSymbol } from '../../options/build/build-opt.js';
export interface StripOptions {
    debugSymbol: DebugSymbol | undefined;
    strip: boolean;
    exclude: string[];
    intermediatesProcessLibs: string;
    sdkLlvmStripPath: string;
    strippedNativeLibs: string;
    moduleName: string;
    taskName: string;
    cacheFilePath: string;
    lastCache: string;
    collectAllLibs: boolean | undefined;
}
export declare function strip(stripOptions: StripOptions): Promise<void>;
/**
 * 清除掉processStrippedLibsDir中上次编译但本次已经在processLibsDir文件夹下没有了的.so文件以及清除所有软连接
 */
export declare function clearExpiredSoInStrippedDir(processStrippedLibsDir: string, processLibsDir: string): void;
