import Router from 'koa-router'
import userManage from '../controller/userManage.js'
const router = new Router({ prefix: '/userManage' })
router.get('/getList', userManage.getUserManageList)
router.post('/userBatchImport', userManage.userBatchImport)
router.post('/batchDeleteUserByIds', userManage.batchDeleteUserByIds)
router.post('/deleteUserById', userManage.deleteUserById)
export default router
