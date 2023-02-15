import Router from 'koa-router'
import auth from '../controller/auth.js'
const router = new Router({ prefix: '/auth' })
router.get('/getAllRolesList', auth.getAllRolesList)
router.get('/getAllMenuList', auth.getAllMenuList)
export default router
