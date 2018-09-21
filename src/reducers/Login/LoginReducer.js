import * as types from '../../constants/ActionTypes'

const initialState = {
  code: '',
  imgUrl: ''
}

//Reducer
const Login = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CODE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default Login
