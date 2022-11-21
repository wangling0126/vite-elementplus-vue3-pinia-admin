import Router from 'koa-router'
import user from '../controller/user.js'
const router = new Router({ prefix: '/user' })
router.post('/login', user.login)
router.get('/test', user.test)
export default router
