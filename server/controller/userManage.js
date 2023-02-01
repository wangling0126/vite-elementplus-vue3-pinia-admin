import userModel from '../model/userModel.js'
class UserManage {
  async getUserManageList(ctx) {
    const { current, size } = ctx.request.query
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
  async userBatchImport(ctx) {
    const allRolesId = await userModel.getAllRoleIds()
    const data = ctx.request.body
    const isNotValid = isNotValidRoleIds(allRolesId, data)
    if (isNotValid) {
      ctx.body = {
        code: 408,
        message: isNotValid,
        data: []
      }
    } else {
      const result = await userModel.insertUserManage(data)
      console.log(result)
      ctx.body = {
        code: 200,
        message: '插入成功',
        data: []
      }
    }
  }
  async batchDeleteUserByIds(ctx) {
    const ids = ctx.request.body
    console.log(ids, 'ids')
    if (!ids || !ids.length) {
      ctx.body = {
        code: 408,
        message: '参数不对',
        data: ''
      }
      return
    }
    await userModel.batchDeleteUserByIds(ids)
    ctx.body = {
      code: 200,
      message: '',
      data: null
    }
  }
  async deleteUserById(ctx) {
    const id = ctx.request.body.id
    console.log(id, 'id')
    await userModel.deleteUserById(id)
    ctx.body = {
      code: 200,
      message: '',
      data: null
    }
  }
}

function isNotValidRoleIds(ids, uploadData) {
  const idList = ids.map((item) => item.id)
  let noValidIds = new Set()
  uploadData.forEach((item) => {
    item.rolesId = item.rolesId + ''
    const ids = item.rolesId.split(',')
    ids.forEach((id) => {
      if (!idList.includes(+id)) {
        noValidIds.add(+id)
      }
    })
  })
  return noValidIds.size
    ? `无效角色id有${[...noValidIds].join(',')}，请检查id是否写对`
    : null
}
export default new UserManage()
