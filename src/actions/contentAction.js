import * as types from '../constants/ActionTypes'
import request from '../utils/request'
import { api } from '../constants/API'
import { message } from 'antd'

/**
 * 请求用户列表
 * @param page 页码
 * @param pageSize 每页显示条数
 */
export const getUserList = dataObj => {
  return dispatch => {
    request({
      method: 'post',
      url: api.getUserList,
      data: {
        ...dataObj
      }
    }).then(res => {
      if (res.respCode == 10000000) {
        dispatch({
          type: types.GET_USER_LIST,
          payload: { lists: res.data, total: res.total }
        })
      } else {
        dispatch({
          type: types.GET_USER_LIST,
          payload: { lists: [], total: 0 }
        })
        message.error('获取用户列表失败!')
      }
    })
  }
}

/**
 * 删除用户
 * @param id 用户ID
 */
export const deleteUser = id => {
  return dispatch => {
    return request({
      method: 'post',
      url: api.deleteUser,
      data: {
        id
      }
    }).then(res => {
      if (res.respCode == 10000000) {
        message.success(res.repMessage)
      } else {
        message.error(res.repMessage)
      }
    })
  }
}
