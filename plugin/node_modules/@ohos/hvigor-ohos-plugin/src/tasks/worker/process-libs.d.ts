import { NativeLibraryModel } from '../../model/cxx/native-library-model.js';
import { NapiLibFilterOpt, PkgSelection } from '../../options/build/build-opt.js';
import { Dependency } from '../../project/dependency/core/dependency-interface.js';
export interface ProcessLibsOptions {
    outputDir: string;
    filterRule?: NapiLibFilterOpt;
    allHarLibs: LibWithPkgInfo[];
    localLibs: LibWithPkgInfo[];
    outputLibs: LibWithPkgInfo[];
    profilePath: string;
    moduleName: string;
    cangjieLibs: LibWithPkgInfo[];
    collectAllLibs: boolean | undefined;
    readElf?: string;
    localOutputDir?: string;
    compileCommandsPath: string[] | undefined;
    isHarType: boolean | undefined;
    nativeOptionArg?: string | string[] | undefined;
    nativeLibs?: Map<string, NativeLibraryModel>[] | undefined;
}
export declare const buildLibs: (libsInfo: string[], pkg: Dependency, cwd: string) => LibWithPkgInfo[];
export declare const filterBySelection: (collections: LibWithPkgInfo[], select: PkgSelection[]) => LibWithPkgInfo[];
export declare const applyForSelectionRule: (collections: LibWithPkgInfo[], rule: PkgSelection) => void;
export declare function processLibs(config: ProcessLibsOptions): Promise<void>;
export interface LibWithPkgInfo {
    name: string;
    path: string;
    relativePath: string;
    pkgName: string;
    pkgVersion: string;
    isLocal: boolean;
    selected: number;
}
