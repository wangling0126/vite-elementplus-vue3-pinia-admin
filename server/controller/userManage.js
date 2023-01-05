import userModel from '../model/userModel.js'
class UserManage {
  async getUserManageList(ctx) {
    const { current, size } = ctx.request.query
    console.log(current, size)
    const data = await userModel.getUserManageList(current || 1, size || 10)
    const allRoles = await userModel.getAllRoles()
    const totalRes = await userModel.getUserManageTotal()
    data.forEach((item) => {
      const rolesId = item.rolesId.split(',')
      item.roles = allRoles.filter((item) => rolesId.includes(item.id + ''))
    })
    ctx.body = {
      code: 200,
      message: '请求成功',
      data: {
        data,
        total: totalRes[0].total,
        current: +current,
        size: +size
      }
    }
  }
}

export default new UserManage()
