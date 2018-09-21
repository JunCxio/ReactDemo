import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

//登录页面
import Login from '../containers/LoginContainer'
//注册页面
import Register from '../Components/register'

import App from '../containers/ContentContainer'

export default class CRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/comment" component={App} />
      </Switch>
    )
  }
}
