import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './router/index.js'
import koajwt from 'koa-jwt'
import { jwtConfig, I18N_OPTIONS, RESPONSE_OPTIONS } from './config/index.js'
import { generateKey } from './utils/crypto.js' //引入密钥生成工具
import routerResponseMiddle from './middlewares/routerReponseMiddleware.js'
const app = new koa()
app.use(bodyParser())
// import locale from 'koa-locale'
// import i18n from 'koa-i18n'
// locale(app)
import koaI18nNext from 'koa-i18n-next'
app.use(koaI18nNext(I18N_OPTIONS))
generateKey()
// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      // ctx.status = 401
      // ctx.body = 'Protected resource, use Authorization header to get access\n'
      ctx.body = {
        code: 401,
        message: 'token过期'
      }
    } else {
      throw err
    }
  })
})

// 统一返回格式
app.use(routerResponseMiddle(RESPONSE_OPTIONS))
//  koa2实现用户登录、jwt签发token https://juejin.cn/post/6921493257578872845
// 注意：放在路由前面
app.use(
  koajwt({
    secret: jwtConfig.SECRET
  }).unless({
    // 配置白名单
    path: [
      /\/user\/register/,
      /\/user\/login/,
      /\/userManage\/getList/,
      /\/p1\/getPublicKey/
    ]
  })
)
//  注册路由
router(app)

app.listen(3000, () => {
  console.log('服务启动: http://localhost:3000')
})
