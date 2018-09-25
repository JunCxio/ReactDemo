import * as types from '../constants/ActionTypes'
import request from '../utils/request'
import { api } from '../constants/API'
import { message } from 'antd'

/**
 * 请求用户列表
 * @param id 用户id
 * @param comment 评论
 */
export const comment = dataObj => {
  return dispatch => {
    return request({
      method: 'post',
      url: api.comment,
      data: {
        ...dataObj
      }
    }).then(res => {
      if (res.respCode == 10000000) {
        message.success(res.repMessage)
        return true
      } else {
        message.error(res.repMessage)
        return false
      }
    })
  }
}

/**
 * 获取评论
 * @param page 页码
 */
export const getCommentList = page => {
  return dispatch => {
    request({
      method: 'post',
      url: api.getCommentList,
      data: {
        page
      }
    }).then(res => {
      if (res.respCode == 10000000) {
        dispatch({
          type: types.GET_COMMENT,
          payload: {
            lists: res.data,
            total: res.total
          }
        })
      } else {
        dispatch({
          type: types.GET_COMMENT,
          payload: {
            lists: [],
            total: 0
          }
        })
        message.error(res.repMessage)
      }
    })
  }
}
