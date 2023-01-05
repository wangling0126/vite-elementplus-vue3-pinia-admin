import userModel from '../model/userModel.js'
class UserManage {
  async getUserManageList(ctx) {
    const data = await userModel.getUserManageList()
    const allRoles = await userModel.getAllRoles()
    data.forEach((item) => {
      const rolesId = item.rolesId.split(',')
      item.roles = allRoles.filter((item) => rolesId.includes(item.id + ''))
    })
    ctx.body = {
      code: 200,
      message: '请求成功',
      data: data
    }
  }
}

export default new UserManage()
