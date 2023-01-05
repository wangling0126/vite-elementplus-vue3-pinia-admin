import { query } from '../mysql/query.js'
class UserModel {
  //获取用户
  async getUserManageList() {
    return await query(`SELECT * FROM user`)
  }
  async getAllRoles() {
    return await query(`SELECT * FROM roles`)
  }
}
export default new UserModel()
