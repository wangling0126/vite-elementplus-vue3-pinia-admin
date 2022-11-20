import Router from 'koa-router'
import user from '../controller/user.js'
const router = new Router({ prefix: '/user' })
router.get('/userInfo', user.getUserInfo)
export default router
