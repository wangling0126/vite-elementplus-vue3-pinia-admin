import fs from 'fs'
import { require } from '../utils/typeModulesPolyfill.js'
const { pathToFileURL } = require('url')
// type:modules模式没有__dirname,下面是替代方法
import path from 'path'
import { fileURLToPath } from 'url'
const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)

export default (app) => {
  fs.readdirSync(__dirnameNew).forEach((file) => {
    if (file === 'index.js') return
    const url = path.resolve(__dirnameNew, `./${file}`)
    // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/util/loadFileConfig.js#L28
    import(pathToFileURL(url).href).then((res) => {
      const router = res.default
      app.use(router.routes())
      app.use(router.allowedMethods())
    })
  })
}
