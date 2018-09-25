import axios from 'axios'
import qs from 'qs' //引入qs模块,用来序列化post类型的数据
import { message } from 'antd'
import lodash from 'lodash'

//拦截请求
axios.interceptors.request.use(
  function(config) {
    //这里可以做loading show处理
    return config
  },
  error => Promise.reject(error)
)

//拦截响应
axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

//get请求拼接url&params
// function buildParam(url, params) {
//   return url.replace(
//     /\/:(\w+)/gm,
//     index =>
//       `/${index === '/:id' ? '' : index.replace(/\/:/g, '') + '/'}${
//         params[`${index.replace(/\/:/g, '')}`]
//       }`
//   )
// }

const fetch = options => {
  let { method = 'get', data, url } = options
  // try {
  //   url = buildParam(url, data.urlParams)
  // } catch (error) {
  //   console.log(error, 'e')
  //   throw new Error('请求链接参数错误!')
  // }

  // delete data.urlParams
  const cloneData = lodash.cloneDeep(data)

  //配置axios请求默认值
  axios.defaults.baseURL = 'http://192.168.9.31:3022'

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData
      })
    case 'delete':
      return axios.delete(url, {
        params: cloneData
      })
    case 'post':
      return axios.post(url, cloneData)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    case 'form':
      return axios.post(url, qs.stringify(cloneData), {
        headers: {
          Accept: 'application/json, text/javascript, */*; q=0.01',
          token: 'Basic c3VwZXJ1c2VyOjEyMzQ1Ng==',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
    case 'upload':
      if (options.progress) {
        return axios.post(url, data, {
          onUploadProgress: options.progressCallback
        })
      } else {
        return axios.post(url, data, {
          headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01'
          }
        })
      }
    default:
      return axios(options)
  }
}

export default function request(options) {
  return fetch(options)
    .then(response => {
      const { data } = response
      return Promise.resolve({
        ...data
      })
    })
    .catch(error => {
      const { response } = error
      let msg, statusCode
      if (response && response instanceof Object) {
        const { data, status, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
        if (response.status === 401) {
          console.log('status', 401)
        } else if (
          status === 403 &&
          statusText === 'Forbidden' &&
          error.message &&
          error.message.indexOf('no privilege') !== -1
        ) {
          message.error('接口没配置权限，自动退出系统')
        } else if (
          status === 405 &&
          statusText === 'Forbidden' &&
          error.message &&
          error.message.indexOf('no privilege') !== -1
        ) {
          message.error('禁止IP，自动退出系统')
        }
      } else {
        message.error('系统服务异常，自动退出系统')
      }
      return Promise.resolve({
        error: true,
        statusCode: statusCode,
        statusMessage: msg
      })
    })
}
