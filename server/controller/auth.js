import authModel from '../model/authModel.js'
class Auth {
  // 获取所有权限列表
  async getAllRolesList(ctx) {
    const roleList = await authModel.getAllRolesList()
    ctx.body = {
      code: 200,
      message: '',
      data: roleList
    }
  }
  // 获取菜单列表
  async getAllMenuList(ctx) {
    const menuList = await authModel.getAllMenuList()
    ctx.body = {
      code: 200,
      message: '',
      data: transMenuTree(menuList)
    }
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
export default new Auth()
