import { query } from '../mysql/query.js'

class AuthModel {
  async getAllRolesList() {
    return await query(`SELECT * FROM roles`)
  }
  async getAllMenuList() {
    return await query(`SELECT * FROM menu`)
  }
}

export default new AuthModel()
