import React from 'react'
import { Route, IndexRedirect, browserHistory } from 'react-router'
import Root from './pages/Root'
import HomePage from './pages/Home/Home'
import RoomsPage from './pages/Rooms/Rooms'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRedirect to='home' />
    <Route path='/home' component={HomePage} />
		<Route path='/rooms' component={RoomsPage} />
  </Route>
)

export default Routes
