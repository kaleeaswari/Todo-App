import React from 'react'
import { applyRouterMiddleware, hashHistory, IndexRoute, Route, Router } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { useScroll } from 'react-router-scroll'
import configureStore from './store/configureStore'
import { syncHistoryWithStore } from 'react-router-redux'

import Todo from './components/Todo'

require('./assets/stylesheets/main.scss')

const app = document.querySelector('.app')

const store = configureStore({})
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll())}
    >
      <Route path="/" component={Todo}>
      </Route>
    </Router>
  </Provider>,
  app,
)
