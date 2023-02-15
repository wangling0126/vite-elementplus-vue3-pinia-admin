import request from '../request'

export const getPublicKey = () => {
  return request.get('/p1/getPublicKey')
}
