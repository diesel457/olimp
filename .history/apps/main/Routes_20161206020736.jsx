import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import Root from './pages/Root'
import HomePage from './pages/Home/Home'

let Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRedirect to='home' />
      <Route path='/home' component={HomePage} />
    </Route>
  </Router>
)

export default Routes
