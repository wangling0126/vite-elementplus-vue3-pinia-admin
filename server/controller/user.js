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
    console.log(user, username, password)
    if (user.length) {
      const token = jwt.sign(
        {
          username: username
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
      message: ctx.$t('loginError')
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
  getUserInfo(ctx) {
    ctx.commonSuccessWithData({
      avatar:
        'https://t9.baidu.com/it/u=1186391898,804431409&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1669741200&t=2c39d51f80411450242c9c364ffb8e70'
    })
  }
}

export default new User()
