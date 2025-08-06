import { TargetTaskService } from '../tasks/service/target-task-service.js';
import { OhosLogger } from './log/ohos-logger.js';
interface IByteCodeHarInfo {
    abcPath: string;
    packageName: string;
    sourceMapsPath?: string;
}
/**
 * 根据targetService收集依赖中字节码HAR的相关信息，目前应用于HAP/HSP/HAR(预览、OhosTest、LocalTest)
 * 收集的数据如下：
 * byteCodeHarInfo: 依赖链上的字节码HAR，包括abc路径，sourceMaps路径
 * otherCompileEntrances: 一些需要额外编译的代码文件，有以下几种：
 *    1.被字节码HAR直接依赖的源码HAR下的ets文件夹路径和入口文件（已经被bundle进字节码HAR的依赖，不需要再写入）
 *    2.被字节码HAR直接依赖的npm三方包的入口文件路径
 *    3.字节码HAR的extraImportees对应的文件路径
 * 已经被bundle进字节码HAR的依赖，这个怎么理解？
 * 字节码HAR有个开关，bundledDependencies，该特性开启后，会把该字节码HAR依赖链上的源码HAR（未被HSP和字节码HAR阻断），都编译到自身的modules.abc中。
 * 举个例子，以编译har为例，同时开启bundleDependencies（->为依赖）：
 * har -> har1(源码) -> har2(源码) -> hsp -> har3(源码)
 * har -> har4(源码) -> har5(字节码) -> har6(源码)
 * har -> har7(源码) -> dayjs(npm)
 * 在编译har时，har1, har2, har4, har7都会编译到自身的modules.abc中，其他则不会。
 * 那么，har的产物在后续被集成到hap/hsp中时，hsp/har3不需要收集，har5需要收集到byteCodeHarInfo中，har6的入口文件和ets文件夹、dayjs的入口文件需要收集到otherCompileEntrances。
 * 假设，在har被集成时，工程级设置overrides，将har5设置为源码HAR，那么此时har5的入口文件和ets文件夹就需要收集到otherCompileEntrances，har6则不再需要收集。
 * 同时，为了提高性能，增加了缓存处理：
 *    1.已经收集过的，或者正在收集的依赖，不再遍历，这块逻辑由childrenPendingOrProcessed承载
 *    2.npm三方包不存在依赖字节码HAR的可能性，其子依赖不需要收集
 * 最后，还有extraImportees的处理，该字段是储存被字节码HAR使用到的NPM三方包的包名+路径引用，形如：dayjs/plugin/etc。
 * 从上文可以看到，被字节码HAR直接依赖的NPM三方包，只会收集入口，如果某个importee（dayjs/plugin/etc）对应的文件没有被入口文件import，就会引起运行时异常，增加该字段，为了补充这部分逻辑的缺失。
 * 在收集时，找到对应的文件，并加入otherCompileEntrances。
 * @param targetService
 */
export declare const collectByteCodeInfoAndOtherCompileEntrances: (targetService: TargetTaskService) => {
    byteCodeInfo: Map<string, IByteCodeHarInfo>;
    otherCompileEntrances: Map<string, boolean>;
};
export declare const checkByteCodeHar: ({ logger, compileApiVersion, compatibleApiVersion, useNormalizedOHMUrl, }: {
    logger: OhosLogger;
    compileApiVersion: number;
    compatibleApiVersion: number;
    useNormalizedOHMUrl?: boolean | undefined;
}) => void;
/**
 * 以下场景下，需要忽略字节码har本身的相关特性，把har当做hap来处理
 * 1. localTest
 * 2. ohosTest
 * 3. 预览
 */
export declare const shouldTreatHarAsHap: (targetName: string) => boolean;
export {};
