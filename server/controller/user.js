class User {
  getUserInfo(ctx) {
    console.log(ctx)
    ctx.body = {
      userName: 'wangling',
      password: '123456'
    }
  }
}

export default new User()
