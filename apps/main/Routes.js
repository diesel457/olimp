import React from 'react'
import { Route, IndexRedirect, browserHistory } from 'react-router'
import Root from './pages/Root'
import HomePage from './pages/Home/Home'
import RoomsPage from './pages/Rooms/Rooms'
import PromoPage from './pages/Promo/Promo'
import AboutUsPage from './pages/AboutUs/AboutUs'

let Routes = (
  <Route path='/' component={Root}>
    <IndexRedirect to='home' />
    <Route path='/home' component={HomePage} />
    <Route path='/rooms' component={RoomsPage} />
		<Route path='/rooms/:roomId' component={RoomsPage} />
		<Route path='/aleksandra007' component={PromoPage} />
		<Route path='/about' component={AboutUsPage} />
  </Route>
)

export default Routes
