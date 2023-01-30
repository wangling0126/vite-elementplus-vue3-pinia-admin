import { query } from '../mysql/query.js'
class UserModel {
  //获取用户
  async getUserManageList(currentPage, size) {
    return await query(
      `SELECT * FROM user limit ${(currentPage - 1) * size}, ${size}`
    )
  }
  async getUserManageTotal() {
    return await query(`SELECT count('*') total FROM user`)
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
}
export default new UserModel()
