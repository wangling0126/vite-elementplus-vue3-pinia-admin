import { query } from '../mysql/query.js'
class UserModel {
  //获取用户
  async getUserManageList(currentPage, size) {
    return await query(
      `SELECT * FROM user where delete_flag = '0' limit ${
        (currentPage - 1) * size
      }, ${size}`
    )
  }
  async getUserManageTotal() {
    return await query(
      `SELECT count('*') total FROM user where delete_flag = '0' `
    )
  }
  async getAllRoles() {
    return await query(`SELECT * FROM roles`)
  }
  async getAllRoleIds() {
    return await query(`SELECT id FROM roles`)
  }
  async insertUserManage(data) {
    let res = `INSERT INTO user ( openTime, username,mobile,rolesId) VALUES `
    data.forEach(({ openTime, username, mobile, rolesId }, index) => {
      res = res + `('${openTime}', '${username}', '${mobile}', '${rolesId}')`
      if (index === data.length - 1) {
        res += ';'
      } else {
        res += ','
      }
    })
    return await query(res)
  }
  // 批量删除通过id
  async batchDeleteUserByIds(ids) {
    let str = `UPDATE user SET delete_flag = '1' where `
    ids.forEach((id, index) => {
      str = str + `id = ${id}` + (index === ids.length - 1 ? `;` : ` or `)
    })
    return await query(str)
  }
  // 删除通过id
  async deleteUserById(id) {
    return await query(`UPDATE user SET delete_flag = '1' where id = ${id}`)
  }
}

export default new UserModel()
