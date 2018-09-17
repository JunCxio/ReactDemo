import * as types from '../../constants/ActionTypes'

const initialState = {
  lists: [], //列表
  total: '' //总数
}

//Reducer
const Counter = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_LIST:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default Counter
