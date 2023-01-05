import Router from 'koa-router'
import userManage from '../controller/userManage.js'
const router = new Router({ prefix: '/userManage' })
router.get('/getList', userManage.getUserManageList)
export default router
