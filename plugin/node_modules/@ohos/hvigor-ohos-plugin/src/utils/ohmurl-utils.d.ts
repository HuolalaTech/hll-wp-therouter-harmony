import { PkgContextInfoOpt } from '@ohos/hvigor-arkts-compose';
import { Dependency } from '../project/dependency/core/dependency-interface.js';
import { TargetTaskService } from '../tasks/service/target-task-service.js';
/**
 * @normalized:<isSO>&<module name>&<bundle name>&<标准import路径>&<version>
 *
 * @param pkgInfo 信息表中收集的信息
 */
export declare function generateOhmUrl(pkgInfo: PkgContextInfoOpt): string;
/**
 * @normalized:<isSO>&<module name>&<bundle name>&<标准import路径>&<version>
 *
 * @param pkgInfo 信息表中收集的信息
 * @param sourceFile  文件路径sourceFile
 */
export declare function generateOhmUrlForSourceFile(pkgInfo: PkgContextInfoOpt, sourceFile: string): string;
/**
 * 生成旧的ohmurl，注意这个方法只生成旧的hap/hsp自己模块编译时针对自己的srcEntry的ohmurl，依赖的har模块生成规则不同，在下面的generateOhmurlForSrcEntry方法里
 * @param targetService
 * @param srcEntry
 * @param moduleName
 */
export declare function getOldOhmUrlForSrcEntry(targetService: TargetTaskService, srcEntry: string, moduleName: string): string;
/**
 * 生成so文件的ohmurl
 *
 * @param soPkgInfo so文件pkgContextInfo
 * @param srcEntry
 */
export declare function generateOhmUrlForSo(soPkgInfo: PkgContextInfoOpt, srcEntry: string): string;
/**
 * 生成so文件的旧格式ohmurl
 * @param targetService
 * @param srcEntry
 * @param moduleName
 */
export declare function generateOldOhmUrlForSo(targetService: TargetTaskService, srcEntry: string, moduleName: string): string;
/**
 * 去除主入口文件的后缀
 *
 * @param packageMainName
 */
export declare function removeSuffix(packageMainName: string): string;
/**
 * 生成hap/hsp收集到依赖har中的ability-srcEntry的ohmurl
 *
 * @param targetService
 * @param moduleName
 * @param dependency
 * @param originSrcEntry
 */
export declare function generateOhmurlForSrcEntry(targetService: TargetTaskService, moduleName: string, dependency: Dependency, originSrcEntry: string): string;
