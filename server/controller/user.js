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
}

export default new User()
