// 参考连接  https://blog.csdn.net/qq_42427109/article/details/127793465
// koa项目编程结构与非对称加密 https://blog.csdn.net/weixin_46560512/article/details/123551153
import { writeFile, readFileSync } from 'fs'
import { dirname } from 'node:path'
import { resolve } from 'node:path'
import NodeRSA from 'node-rsa'
let key = NodeRSA({ b: 1024 })
key.setOptions({ encryptionScheme: 'pkcs1' })
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))
//创建公钥和私钥,并进行文件读写。保证实际使用的公钥和私钥是一套，
//而不是每次请求重新生成，这样容易导致公钥与私钥不匹配的现象。
function generateKey() {
  const PUBLIC_KEY = key.exportKey('pkcs8-public-pem')
  const PRIVATE_KEY = key.exportKey('pkcs8-private-pem')
  writeFile(resolve(__dirname, '../cert/public.pem'), PUBLIC_KEY, (err) => {
    if (!err) {
      // console.log('公钥写入成功')
    }
  })
  writeFile(resolve(__dirname, '../cert/private.key'), PRIVATE_KEY, (err) => {
    if (!err) {
      // console.log('私钥写入成功')
    }
  })
}
function getPublicKey() {
  return readFileSync(resolve(__dirname, '../cert/public.pem')).toString(
    'utf-8'
  )
}
function decryptCode(data) {
  key.importKey(readFileSync(resolve(__dirname, '../cert/private.key'))) //导入私钥
  return key.decrypt(data, 'utf8')
}

export { getPublicKey, decryptCode, generateKey }
