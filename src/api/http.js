/*
 * @Autor: zhenjun
 * @Date: 2024-09-02 16:25:30
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-02 18:25:37
 * @Description:
 */
import axios from 'axios'
// 创建一个 axios 实例
let instance = axios.create({
  baseURL: 'http://localhost:1145',
  timeout: 60000, // 请求超时时间毫秒
  headers: {
    // 设置后端需要的传参类型
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

//拦截器 请求拦截
instance.interceptors.request.use(
  (config) => {
    //做点什么
    //根据后端约定执行相关 结束

    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

//拦截器 响应拦截
instance.interceptors.response.use(
  (response) => {
    //做点什么----根据后端约定状态判断执行 这里是判断状态移除token

    //根据后端约定状态判断执行 结束

    //可将 return response ↑放在做点什么中↑
    return response
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default instance
