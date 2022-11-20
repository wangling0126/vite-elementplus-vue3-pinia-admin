import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './router/index.js'
const app = new koa()
app.use(bodyParser())
router(app)

app.listen(3000, () => {
  console.log('服务启动: http://localhost:3000')
})
