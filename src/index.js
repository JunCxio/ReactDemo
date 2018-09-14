import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './configureStore'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

//模块热替换的API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
