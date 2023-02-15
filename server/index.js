import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './router/index.js'
import koajwt from 'koa-jwt'
import { jwtConfig } from './config/index.js'
import { generateKey } from './utils/crypto.js' //引入密钥生成工具
const app = new koa()
app.use(bodyParser())

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
