// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __filename 的 ESM 写法
const getFilename = () => fileURLToPath(import.meta.url)

// 获取 __dirname 的 ESM 写法
const getDirname = () => () => fileURLToPath(import.meta.url)

export { getFilename, getDirname }
