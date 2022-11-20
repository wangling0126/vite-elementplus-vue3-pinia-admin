//  在type"modules 模式下有一些常用方法不能用，这个文件主要是兼容这些方法

// 替代require()
import { createRequire } from 'module'
export const require = createRequire(import.meta.url)
