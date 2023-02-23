/**
 * 全局统一返回信息
 * @param option 配置项
 *              option.type: 类型 默认为json
 *              option.successCode: 成功返回码
 *              option.successMsg: 成功返回消息
 *              option.failCode: 错误返回码
 *              option.failMsg: 错误返回消息
 * @returns {function(...[*]=)}
 */
function routerResponseMiddle(option = {}) {
  return async (ctx, next) => {
    /**
     * 通用成功且带数据
     * @param data
     */
    ctx.commonSuccessWithData = function (data) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: option.successCode || 200,
        msg: ctx.$t(option.successMsg || 'success'),
        data: data,
        success: true
      }
    }

    /**
     * 通用成功且不带数据
     * @param data
     */
    ctx.commonSuccessWithoutData = function ({ message } = {}) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: option.successCode || 200,
        msg: ctx.$t(message || option.successMsg || 'success'),
        success: true
      }
    }

    /**
     * 自定义成功返回
     * @param data
     */
    ctx.customerSuccess = function ({ msg, code, data } = {}) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || 200,
        msg: ctx.$t(msg || 'success'),
        data: data,
        success: true
      }
    }

    /**
     * 自定义错误返回
     * @param msg 错误信息，默认为fail
     * @param code 错误码，默认为500
     */
    ctx.error = function ({ msg, code } = {}) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 500,
        msg: msg || ctx.$t(option.failMsg || 'fail'),
        success: false
      }
    }
    await next()
  }
}

export default routerResponseMiddle
