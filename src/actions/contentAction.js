import * as types from '../constants/ActionTypes'
import request from '../utils/request'

/**
 * 请求用户列表
 * @param page 页码
 * @param pageSize 每页显示条数
 */
export const getUserList = dataObj => {
  return dispatch => {
    request({
      method: 'post',
      url: '/api/allUsers',
      data: {
        ...dataObj
      }
    }).then(res => {
      dispatch({
        type: types.GET_USER_LIST,
        payload: {
          lists: res.data
        }
      })
    })
  }
}
