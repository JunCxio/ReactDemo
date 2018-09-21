import { connect } from 'react-redux'
import Login from '../Components/Login/index'
import { login, getCode } from '../actions/loginAction'

//Map Redux state to component props
const mapStateToProps = state => {
  return { ...state.Login }
}

export default connect(
  mapStateToProps,
  {
    login,
    getCode
  }
)(Login)
