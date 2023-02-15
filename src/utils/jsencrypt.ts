/*****
 * RSA加密解密工具类
 * **/

import { JSEncrypt } from 'jsencrypt'
import { useGlobalStore } from '@/stores/global'
// 加密
export function encrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(useGlobalStore().publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}
