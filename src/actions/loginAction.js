import * as types from '../constants/ActionTypes'
import request from '../utils/request'
import { api } from '../constants/API'
import { message } from 'antd'

/**
 * 登录
 */
export const login = (dataObj, props) => {
  return dispatch => {
    request({
      url: api.login,
      method: 'post',
      data: {
        ...dataObj
      }
    }).then(res => {
      if (res.respCode == 10000000) {
        const { history } = props
        history.push('/app')
        message.success(res.repMessage)
      } else {
        message.error(res.repMessage)
      }
    })
  }
}

/**
 * 获取验证码
 */
export const getCode = () => {
  return dispatch => {
    request({ url: api.getCode, method: 'get', data: {} }).then(res => {
      if (res.respCode == 10000000) {
        dispatch({
          type: types.GET_CODE,
          payload: { code: res.data.code.toLowerCase(), imgUrl: res.data.img }
        })
      } else {
        dispatch({
          type: types.GET_CODE,
          payload: { code: '', imgUrl: '' }
        })
      }
    })
  }
}
