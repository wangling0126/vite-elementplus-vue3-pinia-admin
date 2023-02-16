export const jwtConfig = {
  SECRET: 'my_token' // jwt密钥
}

export const bcryptConfig = {
  saltRounds: 12 // 生成salt迭代次数
}

export const cryptoConfig = {
  JOINSTR: 'custom' // md5拼接字符串
}

/**
 * 跨域请求配置  这里我只配置所有域名可跨域访问，别的配置可以参考koa-cros官网
 * @type {{origin: string}}
 */
const CROS_OPTIONS = {
  origin: '*' // 允许跨域的地址， 默认为所有（*）
}
/**
 * 全局返回设置
 * @type {{}}
 */
const RESPONSE_OPTIONS = {
  type: 'json', // 返回类型
  successCode: 200, // 成功后默认状态码
  successMsg: 'request.ok', // 成功请求后的默认消息
  failMsg: 'request.fail', // 请求失败后的默认消息
  failCode: 500 // 请求失败后的默认状态码
}

/**
 * i18n国际化配置
 * @type {{}}
 */
const I18N_OPTIONS = {
  dirPath: './i18n', //相对app.js的位置
  preload: ['en', 'zh'], // 地区设置， i18n文件必须跟这里匹配
  fallbackLocale: 'en', // 未匹配到语种时使用什么语言代替
  modes: [
    'query', //  通过 url query 获取 - `/?locale=en-US`
    'subdomain', //  通过二级域名获取   - `zh-CN.koajs.com`
    'cookie', //  通过cookie获取      - `Cookie: locale=zh-TW`
    'header', //  通过header头的accept-language获取      - `Accept-Language: zh-CN,zh;q=0.5`
    'tld', //  通过国际域名获取，此案例为cn - `koajs.cn`
    function (ctx) {
      //  通过自定函数获取，返回语种 (ctx为app context)
      return ctx.request.header['lang'] || 'en'
    }
  ] // 获取语种的方式，获取语种的优先级根据数组顺序排列，取到白名单语种为止，如果均没有获取到，则使用fallbackLocale设置的语种
}

export { CROS_OPTIONS, RESPONSE_OPTIONS, I18N_OPTIONS }
