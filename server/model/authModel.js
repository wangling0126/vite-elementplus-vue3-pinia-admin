import { query } from '../mysql/query.js'

class AuthModel {
  async getAllRolesList() {
    return await query(`SELECT * FROM roles`)
  }
  async getAllMenuList() {
    return await query(`SELECT * FROM menu where isDelete = 0`)
  }
  async checkRepeatMenuRouterName(routerName) {
    return await query(
      `SELECT * from menu m where m.routerName = '${routerName}' and m.isDelete = 0`
    )
  }
  async queryMenuMaxId() {
    return query(`SELECT max(id) from menu`)
  }
  async addMenu({ routerName, label, parent_id, status }) {
    return await query(`INSERT INTO menu
    (routerName, label, parent_id, status,  update_time, order_id, path)
    VALUES('${routerName}', '${label}', ${parent_id}, ${status}, CURRENT_TIMESTAMP, 1, '')`)
  }
  async updateMenuPath({ path, id }) {
    return query(`UPDATE menu
    SET update_time=CURRENT_TIMESTAMP,path='${path}'
    WHERE id=${id};`)
  }
  async updateMenu({ routerName, label, status, id }) {
    return query(`UPDATE menu
    SET update_time=CURRENT_TIMESTAMP,routerName='${routerName}',label='${label}',status='${status}'
    WHERE id=${id};`)
  }
  async updateMenuStatus({ status, id }) {
    return query(`UPDATE menu
    SET update_time=CURRENT_TIMESTAMP,status='${status}'
    WHERE id=${id};`)
  }
  async deleteMenuById(id) {
    return query(`UPDATE menu
    SET update_time=CURRENT_TIMESTAMP,isDelete=1
    WHERE id=${id};`)
  }
}

export default new AuthModel()
