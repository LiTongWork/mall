import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    function (data) {
      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      return data
    }
  ],
})

service.interceptors.request.use(
  // 请求拦截器 
  config => {
    // do something before request is sent
    // 发送请求之前可以进行的操作
    if (store.getters.token) {
      // 判断是否有token，根据实际情况进行处理
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    // 处理错误请求
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  // 返回值拦截
  response => {
    // 根据不同状态进行处理提示
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  error => {
    // 错误处理
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service