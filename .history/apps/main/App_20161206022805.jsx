import 'babel-polyfill'
import Promise from 'promise-polyfill'
window.Promise = Promise
import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { setLoading } from 'react-amelisa'
import Routes from './Routes'
import Loading from 'project-components/Loading'
setLoading(Loading)


function onUpdate () {
  window.scrollTo(0, 0)
}

let router = (
  <Router createElement={createElement} history={browserHistory} onUpdate={onUpdate}>
    {Routes}
  </Router>
)

let app = document.getElementById('app')
// HACK: make react happy on overrighting server elements
app.innerHTML = ''
render(router, app)
