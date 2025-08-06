/**
 * <p>密钥解码器</p>
 * <p>主要方法是#getKey()，用于读取工作密钥。</p>
 * <p>工作密钥采用AES-GCM方式进行解密，填充参数是NoPadding，密钥长度16 byte(128 bit)，iv长度12 byte(96bit)，iv每次都是采用SecureRandom生成，
 * tag参数长度128 bit。</p>
 * <p>根密钥由存储在文件中的组件以及硬编码在代码中的组件做异或操作得到一个组件，然后将该组件使用PBKDF2WithHmacSHA256迭代10000次生成</p>
 * <p>根据密钥管理规范，存储组件的文件名以及目录已采用一般化名称存储，未体现其是密钥等信息</p>
 * <p>主要参考文档《密钥管理安全规范 V1.3.docx》、《密码算法应用规范 V1.4.docx》、《对称加密算法应用方案.docx》</p>
 *
 * @since 2022/03/07
 */
export declare class DecipherUtil {
    private static component;
    private static dirs;
    private static _logger;
    private static macDSStore;
    private static materialDir;
    /**
     * 使用aes-gcm算法解密消息
     * AesGcmKit，其实现符合《密码算法应用规范 V1.4.docx》中针对于AES-GCM的使用要求
     * 填充参数是NoPadding，密钥长度16 byte(128 bit)，iv长度12 byte(96bit)，iv每次都是采用SecureRandom生成，tag参数长度16 byte(128 bit)。
     *
     * @param materialDir 签名材料地址
     * @param encryptedPwd 加密密码
     * @return string
     */
    static decryptPwd(materialDir: string, encryptedPwd: string): string;
    /**
     * 获取解密密钥
     *
     * @param materialDir 签名材料地址
     * @private Int8Array
     */
    private static getKey;
    /**
     * PBKDF2WithHmacSHA256迭代10000次生成rootKey
     *
     * @param components
     * @param salt
     * @private
     */
    private static getRootKey;
    /**
     * 根据密钥解密, 获取明文密码
     * 被加密后的数据格式如下
     * 其中content数据中包含tag数据
     * -------------------------------------------------------------------------------
     * | content length (4byte) | iv key (12 byte) | encrypted | auth tag ( 16 byte ) |
     *  ------------------------------------------------------------------------------
     *
     * @param key 密钥
     * @param msg 加密密码
     * @private Buffer.Buffer
     */
    private static decrypt;
    private static xorComponents;
    /**
     * 异或
     *
     * @param b1
     * @param b2
     * @private
     */
    private static xor;
    /**
     * 读取./material/fd
     *
     * @param dir
     * @private
     */
    private static readFd;
    /**
     * 读取盐值./material/ac
     *
     * @param dir
     * @private
     */
    private static readSalt;
    /**
     * workMaterial ./material/ce
     *
     * @param dir
     * @private
     */
    private static readWorkMaterial;
    /**
     * 读取目录中文件 默认一个文件
     *
     * @param dir
     * @private
     */
    private static readDirBytes;
    /**
     * 读取默认的密钥库密码
     *
     * @param DEFAULT_STORE_PASS_FILE 存储加密后的密钥库密码的文件路径
     * @return string 文件中存储的加密的密码信息
     */
    static decryptPluginDataFromResource(DEFAULT_STORE_PASS_FILE: string): string;
    private static getProjectBuildProfilePath;
}
