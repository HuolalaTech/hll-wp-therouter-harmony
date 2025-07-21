import { CoreTask, TaskDetails } from '@ohos/hvigor';
import { BeforeGenerateDeviceCoverage } from '../before-generate-device-coverage.js';
import { BuildProfileTask } from '../build-profile-task.js';
import { CollectDebugSymbol } from '../collect-debug-symbol.js';
import { FastPackageHap } from '../fast-package.js';
import { GenerateDeviceCoverage } from '../generate-device-coverage.js';
import { GenerateLoaderJson } from '../generate-loader-json.js';
import { GenerateMetadata } from '../generate-metadata.js';
import { GeneratePkgContextInfo } from '../generate-pkg-context-info.js';
import { GeneratePkgModuleJson } from '../generate-pkg-module-json.js';
import { ArkLinter } from '../har/ark-linter.js';
import { CreateHarModuleInfo } from '../module-info/create-har-module-info.js';
import { HarBuildProfileTask } from '../har/har-build-profile-task.js';
import { PackageSignHar } from '../har/package-sign-har.js';
import { ProcessObfuscationFiles } from '../har/process-obfuscation-files.js';
import { FastPackageHsp } from '../hsp/fast-package-hsp.js';
import { PackageHsp } from '../hsp/package-hsp.js';
import { PackageSharedHar } from '../hsp/package-shared-har.js';
import { PackageSharedTgz } from '../hsp/package-shared-tgz.js';
import { PrepareSharedHarRes } from '../hsp/prepare-shared-har-res.js';
import { SignHsp } from '../hsp/sign-hsp.js';
import { MakePackInfo } from '../make-pack-info.js';
import { MergeProfile } from '../merge-profile.js';
import { GenerateOhosTestTemplate } from '../ohosTest/generate-ohos-test-template.js';
import { OhosTestCopyMockConfigJson } from '../ohosTest/ohos-test-copy-mock-config-json.js';
import { PackageHap } from '../package-hap.js';
import { PackageHqf } from '../package-hqf.js';
import { PreBuild } from '../pre-build.js';
import { PreCheckSyscap } from '../pre-check-syscap.js';
import { PreviewCompileResource } from '../preview-compile-resource.js';
import { PreviewUpdateAssets } from '../preview-update-assets.js';
import { CopyPreviewProfile } from '../previewer/copy-preview-profile.js';
import { ReplacePreviewerPage } from '../previewer/replace-previewer-page.js';
import { ProcessIntegratedHsp } from '../process-integrated-hsp.js';
import { ProcessProfile } from '../process-profile.js';
import { ProcessRouterMap } from '../process-router-map.js';
import { ProcessStartupConfig } from '../process-startup-config.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { SignHap } from '../sign-hap.js';
import { SignHqf } from '../sign-hqf.js';
import { SignModuleRemoteHsp } from '../sign-module-remote-hsp.js';
import { SignProjectRemoteHsp } from '../sign-project-remote-hsp.js';
import { SyscapTransform } from '../syscap-transform.js';
import { TargetTaskCreator } from '../task-creator.js';
import { BuildUnitTestHook } from '../unitTest/build-unit-test-hook.js';
import { GenerateUnitTestResult } from '../unitTest/generate-unit-test-result.js';
import { GenerateUnitTestTemplate } from '../unitTest/generate-unit-test-template.js';
import { ReplaceSourcemapInCoverageMode } from '../unitTest/replace-sourcemap-in-coverage-mode.js';
import { ReplaceUnitTestIndexFile } from '../unitTest/replace-unit-test-index-file.js';
import { UnitTestCopyMockConfigJson } from '../unitTest/unit-test-copy-mock-config-json.js';
import { UnitTestProcessProfile } from '../unitTest/unit-test-process-profile.js';
import { CreateModuleInfo } from '../module-info/create-module-info.js';
export declare class OhosTestCopyMockConfigJsonCA extends TargetTaskCreator {
    provider: () => OhosTestCopyMockConfigJson;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class UnitTestCopyMockConfigJsonCA extends TargetTaskCreator {
    provider: () => UnitTestCopyMockConfigJson;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PreBuildCA extends TargetTaskCreator {
    provider: () => PreBuild;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    afterConfigure: () => void;
}
export declare class GenerateUnitTestTemplateCA extends TargetTaskCreator {
    provider: () => GenerateUnitTestTemplate;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class GenerateOhosTestTemplateCA extends TargetTaskCreator {
    provider: () => GenerateOhosTestTemplate;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class GenerateUnitTestResultCA extends TargetTaskCreator {
    provider: () => GenerateUnitTestResult;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class GenerateDeviceCoverageCA extends TargetTaskCreator {
    provider: () => GenerateDeviceCoverage;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class BeforeGenerateDeviceCoverageCA extends TargetTaskCreator {
    provider: () => BeforeGenerateDeviceCoverage;
    declareDepends(): string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class GeneratePkgContextInfoCA extends TargetTaskCreator {
    provider: () => GeneratePkgContextInfo;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class ProcessProfileCA extends TargetTaskCreator {
    provider: () => ProcessProfile;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class MergeProfileCA extends TargetTaskCreator {
    provider: () => MergeProfile;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    afterConfigure: () => string[];
}
export declare class HarBuildProfileTaskCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => HarBuildProfileTask;
}
export declare class CreateHarModuleInfoCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CreateHarModuleInfo;
}
export declare class CreateModuleInfoCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CreateModuleInfo;
}
export declare class GenerateLoaderJsonCA extends TargetTaskCreator {
    provider: () => GenerateLoaderJson;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class ProcessRouterMapCA extends TargetTaskCreator {
    provider: () => ProcessRouterMap;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class ProcessStartupConfigCA extends TargetTaskCreator {
    provider: () => ProcessStartupConfig;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageHapCA extends TargetTaskCreator {
    provider: () => PackageHap;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class FastPackageCA extends TargetTaskCreator {
    provider: () => FastPackageHap;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageHqfCA extends TargetTaskCreator {
    provider: () => PackageHqf;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class SignHqfCA extends TargetTaskCreator {
    provider: () => SignHqf;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class GeneratePkgModuleJsonCA extends TargetTaskCreator {
    provider: () => GeneratePkgModuleJson;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class CollectDebugSymbolCA extends TargetTaskCreator {
    provider: () => CollectDebugSymbol;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageHspCA extends TargetTaskCreator {
    provider: () => PackageHsp;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class FastPackageHspCA extends TargetTaskCreator {
    provider: () => FastPackageHsp;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class SignHspCA extends TargetTaskCreator {
    provider: () => SignHsp;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageSignHarCA extends TargetTaskCreator {
    provider: () => PackageSignHar;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class SignProjectRemoteHspCA extends TargetTaskCreator {
    provider: () => SignProjectRemoteHsp;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class SignModuleRemoteHspCA extends TargetTaskCreator {
    provider: () => SignModuleRemoteHsp;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class ProcessIntegratedHspCA extends TargetTaskCreator {
    provider: () => ProcessIntegratedHsp;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageSharedHarCA extends TargetTaskCreator {
    provider: () => PackageSharedHar;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PrepareSharedHarResCA extends TargetTaskCreator {
    provider: () => PrepareSharedHarRes;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageSharedTgzCA extends TargetTaskCreator {
    provider: () => PackageSharedTgz;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PreviewCompileResourceCA extends TargetTaskCreator {
    provider: () => PreviewCompileResource;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PreviewUpdateAssetsCA extends TargetTaskCreator {
    provider: () => PreviewUpdateAssets;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    afterConfigure: () => void;
}
export declare class ReplacePreviewerPageCA extends TargetTaskCreator {
    provider: () => ReplacePreviewerPage;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class CopyPreviewProfileCA extends TargetTaskCreator {
    provider: () => CopyPreviewProfile;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class ReplaceUnitTestIndexFileCA extends TargetTaskCreator {
    provider: () => ReplaceUnitTestIndexFile;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class BuildUnitTestHookCA extends TargetTaskCreator {
    provider: () => BuildUnitTestHook;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class ReplaceSourceMapInCoverageModeCA extends TargetTaskCreator {
    provider: () => ReplaceSourcemapInCoverageMode;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class SignHapCA extends TargetTaskCreator {
    provider: () => SignHap;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PreCheckSyscapCA extends TargetTaskCreator {
    provider: () => PreCheckSyscap;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class SyscapTransformCA extends TargetTaskCreator {
    provider: () => SyscapTransform;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class PackageHarCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CoreTask;
}
export declare class ProcessHarArtifactsCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CoreTask;
}
export declare class ProcessOhPackageJsonCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CoreTask;
}
export declare class ProcessPackageJsonCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CoreTask;
}
export declare class ArkLinterCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => {
        name: string;
    };
    provider: () => ArkLinter;
}
export declare class ProcessObfuscationFilesCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => {
        name: string;
    };
    provider: () => ProcessObfuscationFiles;
}
export declare class GenerateMetadataCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => GenerateMetadata;
}
export declare class MakePackInfoCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => MakePackInfo;
}
export declare class UnitTestProcessProfileCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => UnitTestProcessProfile;
}
export declare class BuildProfileTaskCA extends TargetTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => BuildProfileTask;
}
/**
 * 获取依赖中的CreateBuildProfile、CREATE_HAR_BUILD_PROFILE任务
 */
export declare function getBuildProfileEtsDependencies(targetService: TargetTaskService): string[];
