import request from '@/utils/request'

export default {
  Multidata(data) {
    return request({
      url: '/home/multidata',
      method: 'get',
      params: data
    })
  },

  GetData(data) {
    return request({
      url: '/home/data',
      method: 'get',
      params: data
    })
  }
}