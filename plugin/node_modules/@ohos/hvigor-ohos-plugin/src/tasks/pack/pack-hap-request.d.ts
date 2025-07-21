export interface PackParams {
    command: string[];
}
export declare function sendPackRequest(packToolJarPath: string, packParams: PackParams): Promise<import("../java-daemon/websocket.js").SocketResp>;
