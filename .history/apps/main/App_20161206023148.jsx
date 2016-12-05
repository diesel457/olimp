import 'babel-polyfill'
import Promise from 'promise-polyfill'
window.Promise = Promise
import React from 'react'
import 'racer-highway/lib/browser/index.js'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { setLoading } from 'react-amelisa'
import Routes from './Routes'
import Loading from 'project-components/Loading'
import ormEntities from '../model'
setLoading(Loading)


function onUpdate () {
  window.scrollTo(0, 0)
}

let createElement = (Component, props) => {
  console.log('>> CHaNGE PATH', props.route.path, props)
  return <Component key={props.route.path + JSON.stringify(props.routeParams)} {...props} />
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
