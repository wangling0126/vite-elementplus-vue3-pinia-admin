import Router from 'koa-router'
import user from '../controller/user.js'
const router = new Router({ prefix: '/user' })
router.post('/login', user.login)
router.get('/test', user.test)
router.get('/getUserInfo', user.getUserInfo)
export default router
