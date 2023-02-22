import { query } from '../mysql/query.js'
class UserModel {
  async getUserInfo(id) {
    return await query(`select u.*,r.* from
    (select id, username, mobile ,avatar, is_admin from user where id = ${id} ) as u
      left join user_role ur  on u.id = ur.user_id
      left join (select id as roleId, rolesName, name from roles ) as r on r.roleId  = ur.role_id ;`)
  }
  //获取用户
  async getUserManageList(currentPage, size) {
    return await query(
      `select u.*,r.* from
      (select id, username, mobile ,is_admin from user limit ${
        (currentPage - 1) * size
      }, ${size}) as u
        left join user_role ur  on u.id = ur.user_id
        left join (select id as roleId, rolesName from roles ) as r on r.roleId  = ur.role_id `
    )
  }
  // 获取所有用户
  async getAllUserManageList() {
    return await query(`SELECT * FROM user where delete_flag = '0' `)
  }
  async getUserManageTotal() {
    return await query(
      `SELECT count('*') total FROM user where delete_flag = '0' `
    )
  }
  // 用户账号和密码查询是否存在
  async queryUser(username, password) {
    return await query(
      `select * from user u where username = '${username}' and password = '${password}' and delete_flag = '0';`
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
