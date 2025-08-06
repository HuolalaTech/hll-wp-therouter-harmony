import { CacheStoreManager } from '@ohos/hvigor';
import { CompileEvent, ProjectConfig } from '@ohos/hvigor-arkts-compose';
export declare const errorCallback: (error: Error) => void;
export declare const run: (config: ProjectConfig, cacheStoreManager?: CacheStoreManager) => Promise<CompileEvent[] | Error>;
export declare const runArkLint: (config: {
    config: ProjectConfig;
    entry: Record<string, unknown>;
}) => Promise<void>;
