import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/index.js'
const userList = [
  {
    username: 'wangling',
    password: '123456'
  },
  {
    username: '张东',
    password: 'a514054'
  }
]

class User {
  login(ctx) {
    const { username, password } = ctx.request.body
    const result = userList.find(
      (item) => item.username === username && item.password === password
    )
    if (result) {
      const token = jwt.sign(
        {
          username: username
        },
        jwtConfig.SECRET,
        {
          expiresIn: 60 * 60
        }
      )
      return (ctx.body = {
        code: 200,
        message: '登录成功',
        data: {
          token
        }
      })
    }

    ctx.body = {
      code: 400,
      message: '用户名或密码错误'
    }
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
    ctx.body = {
      code: 200,
      data: {
        avatar:
          'https://t9.baidu.com/it/u=1186391898,804431409&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1669741200&t=2c39d51f80411450242c9c364ffb8e70'
      }
    }
  }
}

export default new User()
