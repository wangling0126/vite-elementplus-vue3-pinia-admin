import authModel from '../model/authModel.js'
class Auth {
  // 获取所有权限列表
  async getAllRolesList(ctx) {
    const roleList = await authModel.getAllRolesList()
    ctx.commonSuccessWithData(roleList)
  }
  // 获取菜单列表
  async getAllMenuList(ctx) {
    const menuList = await authModel.getAllMenuList()
    ctx.commonSuccessWithData(transMenuTree(menuList))
  }
  // 检查菜单routerName是否重复
  async checkRepeatMenuRouterName(ctx) {
    const repeatList = await authModel.checkRepeatMenuRouterName(
      ctx.request.query.routerName
    )
    ctx.commonSuccessWithData(transMenuTree(repeatList))
  }
  // 增加菜单
  async addMenu(ctx) {
    const { routerName, label, status, parent_id, parent_path } =
      ctx.request.body
    authModel
      .addMenu({
        routerName,
        label,
        status,
        parent_id
      })
      .then((res) => {
        const insertId = res.insertId
        authModel.updateMenuPath({
          id: insertId,
          path: parent_path ? `${parent_path}-${insertId}` : insertId
        })
      })

    ctx.commonSuccessWithoutData()
  }
  // 更新菜单
  async updateMenu(ctx) {
    const { routerName, label, status, id } = ctx.request.body
    const menuList = await authModel.getAllMenuList()
    const ids = getSubIds(menuList, id).filter((item) => item !== id)

    await authModel.updateMenu({ routerName, label, status, id })
    ids.forEach(async (item) => {
      await authModel.updateMenuStatus({ id: item, status })
    })
    return ctx.commonSuccessWithoutData()
  }
  // 删除菜单通过id
  async deleteMenuById(ctx) {
    const { id } = ctx.request.query
    const menuList = await authModel.getAllMenuList()
    getSubIds(menuList, id).forEach(async (id) => {
      await authModel.deleteMenuById(id)
    })

    return ctx.commonSuccessWithoutData()
  }
}

function transMenuTree(data) {
  let result = []
  let map = {}
  if (!Array.isArray(data)) {
    //验证data是不是数组类型
    return []
  }
  data.forEach((item) => {
    //建立每个数组元素id和该对象的关系
    map[item.id] = item //这里可以理解为浅拷贝，共享引用
  })
  data.forEach((item) => {
    let parent = map[item.parent_id] //找到data中每一项item的爸爸
    if (parent) {
      //说明元素有爸爸，把元素放在爸爸的children下面
      ;(parent.children || (parent.children = [])).push(item)
    } else {
      //说明元素没有爸爸，是根节点，把节点push到最终结果中
      result.push(item) //item是对象的引用
    }
  })
  return result //数组里的对象和data是共享的
}

function getSubIds(data, id) {
  const allDeletePath = data
    .map((item) => item.path)
    .filter((path) => path.split('-').includes(id + ''))
  let allDeleteIds = []
  allDeletePath.forEach((path) => {
    const list = path.split('-')
    const len = list.length
    const id = list[len - 1]
    allDeleteIds.push(id)
  })
  return [...new Set(allDeleteIds)]
}
export default new Auth()
