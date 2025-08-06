import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import SigningConfigBuildOpt = ProjectBuildProfile.SigningConfigBuildOpt;
export interface SignParams {
    mode: string;
    keyAlias: string;
    keyPwd: string;
    appCertFile: string;
    profileFile?: string;
    profileSigned?: number;
    inForm?: string;
    signAlg: string;
    keystoreFile: string;
    keystorePwd: string;
    signCode?: number;
    inFile: string;
    outFile: string;
}
export interface HarSignParams {
    keyAlias: string;
    keyPwd: string;
    signCertFile: string;
    profileFile?: string;
    inForm?: string;
    inFileForm?: string;
    signAlg: string;
    keystoreFile: string;
    keystorePwd: string;
    inFile: string;
}
export interface VerifyProfileParams {
    inFile: string;
    outFile: string;
}
export declare function sendSignRequest(signToolJarPath: string, signParams: SignParams): Promise<import("../java-daemon/websocket.js").SocketResp>;
export declare function sendSignHarRequest(signToolJarPath: string, signParams: HarSignParams): Promise<import("../java-daemon/websocket.js").SocketResp>;
export declare function sendVerifyProfileRequest(signToolJarPath: string, verifyProfileParams: VerifyProfileParams): Promise<import("../java-daemon/websocket.js").SocketResp>;
export declare function constructSignParams(signingConfig: SigningConfigBuildOpt, inFile: string, outFile: string, keystorePwd: string, keyPwd: string, inForm: string, mode?: string): SignParams;
export declare function constructHarSignParams(signingConfig: SigningConfigBuildOpt, inFile: string, outFile: string, keystorePwd: string, keyPwd: string): HarSignParams;
