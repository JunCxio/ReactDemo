import * as types from '../../constants/ActionTypes'

const initialState = {
  lists: []
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
