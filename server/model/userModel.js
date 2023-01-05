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
}
export default new UserModel()
