export declare enum MessageType {
    SIGN_APP = "SIGN_APP",
    VERIFY_PROFILE = "VERIFY_PROFILE",
    SIGN_SDK = "SIGN_SDK",
    PACK_APP = "PACK_APP"
}
export declare enum ErrorCode {
    SUCCESS = 0,
    FAIL = -1,
    NETWORK_ERROR = 1006,
    CLASS_NOT_FOUND = 1007
}
export interface SocketResp {
    code: ErrorCode;
    message: string;
}
export interface SocketRequest {
    type: MessageType;
    data?: string;
}
export declare function sendSocketRequest(signRequest: object, toolJarPath: string): Promise<SocketResp>;
