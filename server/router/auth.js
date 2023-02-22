import Router from 'koa-router'
import auth from '../controller/auth.js'
const router = new Router({ prefix: '/auth' })
router.get('/getAllRolesList', auth.getAllRolesList)
router.get('/getAllMenuList', auth.getAllMenuList)
router.get('/checkRepeatMenuRouterName', auth.checkRepeatMenuRouterName)
router.post('/addMenu', auth.addMenu)
router.post('/updateMenu', auth.updateMenu)
router.get('/deleteMenuById', auth.deleteMenuById)
export default router
