import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Page from './Page'
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

render(Page)

//模块热替换的API
if (module.hot) {
  module.hot.accept('./Page', () => {
    render(Page)
  })
}
