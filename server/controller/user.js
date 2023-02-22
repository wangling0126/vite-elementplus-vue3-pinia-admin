import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/index.js'
import { decryptCode } from '../utils/crypto.js'
import userModel from '../model/userModel.js'

class User {
  async login(ctx) {
    let { username, password } = ctx.request.body
    username = decryptCode(username)
    password = decryptCode(password)
    const user = await userModel.queryUser(username, password)
    if (user.length) {
      const token = jwt.sign(
        {
          userId: user[0].id
        },
        jwtConfig.SECRET,
        {
          expiresIn: 60 * 60
        }
      )
      return ctx.commonSuccessWithData({
        token,
        userInfo: user[0]
      })
    }
    ctx.error({
      code: 400,
      message: `用户名或者密码错误`
    })
  }
  test(ctx) {
    ctx.body = {
      code: 200,
      data: {
        list: ['a', 'b', 'c']
      }
    }
  }
  async getUserInfo(ctx) {
    const token = ctx.header.authorization.split(' ')?.[1]
    if (!token) {
      ctx.error({
        msg: '请登录',
        code: 401
      })
    }
    var decoded = jwt.decode(token)
    const userId = decoded.userId
    const userList = await userModel.getUserInfo(userId)
    const userInfo = userList.reduce((result, item) => {
      const { roleId, name, rolesName, avatar, ...rest } = item
      if (!Object.keys(result).length) {
        Object.assign(result, {
          ...rest,
          avatar:
            avatar ||
            'https://t9.baidu.com/it/u=1186391898,804431409&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1669741200&t=2c39d51f80411450242c9c364ffb8e70',
          rolesList: [{ roleId, name, rolesName }]
        })
      } else {
        result.rolesList.push({ roleId, name, rolesName })
      }
      return result
    }, {})
    ctx.commonSuccessWithData(userInfo)
  }
}

export default new User()
