import userModel from '../model/userModel.js'
class UserManage {
  async getUserManageList(ctx) {
    const { current, size } = ctx.request.query
    let data = await userModel.getUserManageList(current || 1, size || 10)
    const totalRes = await userModel.getUserManageTotal()
    const newDataObj = {}
    data.forEach((item) => {
      const { id, roleId, rolesName, ...rest } = item
      if (newDataObj[id]) {
        newDataObj[id].roles.push({ roleId, rolesName })
      } else {
        newDataObj[id] = {
          id,
          ...rest,
          roles: [
            {
              roleId,
              rolesName
            }
          ]
        }
      }
    })
    ctx.commonSuccessWithData({
      data: Object.values(newDataObj),
      total: totalRes[0].total,
      current: +current,
      size: +size
    })
  }
  async getAllUserManageList(ctx) {
    const userList = await userModel.getUserManageList(1, 1000)
    const userInfo = userList.reduce((result, item) => {
      const { id, roleId, name, rolesName, ...rest } = item
      if (!result[id]) {
        result[id] = {
          ...rest,
          roles: [{ roleId, name, rolesName }]
        }
      } else {
        result[id].roles.push({ roleId, name, rolesName })
      }
      return result
    }, {})
    ctx.commonSuccessWithData({
      data: Object.values(userInfo)
    })
  }
  /**
   * @description: 批量导入用户
   * @param {*} ctx
   * @return {*} void
   */
  async userBatchImport(ctx) {
    const data = ctx.request.body
    // 查重 用户名不能重复
    const userList = await userModel.getAllUserNameList()
    const allUserNames = userList.map((item) => item.username)
    const uploadUserName = data.map((item) => item.username)
    const repeatUserName = allUserNames.filter((username) =>
      uploadUserName.includes(username)
    )
    let isRepeat = repeatUserName.length
    if (isRepeat) {
      ctx.error({
        msg: `用户名不能重复, 重复用户名有【${repeatUserName.join(
          '，'
        )}】，请修改后在上传`,
        code: '308'
      })
    } else {
      const insertData = await userModel.insertUserManage(data)
      console.log(insertData)
      const insertDataIds = new Array(insertData.affectedRows)
        .fill(1)
        .map((item, index) => index + insertData.insertId)

      // 对应的id加上查看权限
      userModel.insertUserRoles(insertDataIds)
      ctx.commonSuccessWithoutData({
        message: '插入成功'
      })
    }
  }
  async batchDeleteUserByIds(ctx) {
    const ids = ctx.request.body
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
