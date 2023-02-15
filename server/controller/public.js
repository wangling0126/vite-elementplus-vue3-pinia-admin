import { getPublicKey } from '../utils/crypto.js'
class PublicIntetface {
  getPublicKey(ctx) {
    ctx.body = {
      code: 200,
      message: '',
      data: getPublicKey()
    }
  }
}

export default new PublicIntetface()
