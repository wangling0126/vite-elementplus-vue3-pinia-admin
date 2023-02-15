import Router from 'koa-router'
import p1 from '../controller/public.js'
const router = new Router({ prefix: '/p1' })
router.get('/getPublicKey', p1.getPublicKey)
export default router
