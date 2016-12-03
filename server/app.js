import express from 'express'
import React from 'react'
import session from 'express-session'
import { createElement, renderToStaticMarkup } from 'react-amelisa/server'
import { match, RouterContext } from 'react-router'
import compression from 'compression'
import bodyParser from 'body-parser'
let MongoStore = require('connect-mongo')(session)
import favicon from 'serve-favicon'
import healthcheck from 'healthcheck-middleware'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.dev.babel'
import mainRoutes from '../apps/main/Routes'
import store from './store'
import HtmlLayout from '../components/HtmlLayout'
import wrap from './wrap'

const appsRoutes = {
  main: mainRoutes
}

const sessionOptions = {
  resave: false,
  secret: 'secret',
  saveUninitialized: true,
  store: new MongoStore({
    db: store.storage.db // reuse same connection
  })
}

let compiler = webpack(webpackConfig)

let app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer))
  app.use(webpackHotMiddleware(compiler))
}

app
  .use('/healthcheck', healthcheck())
  .use(compression())
  .use(favicon(process.cwd() + '/public/img/favicon.ico'))
  .use(express.static(process.cwd() + '/public', {maxAge: '5 min'}))
  .use(session(sessionOptions))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(store.modelMiddleware())

function matchUrl (location, routes) {
  return new Promise((resolve, reject) => {
    match({routes, location}, (err, redirectLocation, renderProps) => {
      if (err) return reject(err)
      resolve({redirectLocation, renderProps})
    })
  })
}

async function matchAppRoutes (location) {
  for (let app in appsRoutes) {
    let routes = appsRoutes[app]

    let { redirectLocation, renderProps } = await matchUrl(location, routes)
    if (redirectLocation || renderProps) {
      return {
        app,
        redirectLocation,
        renderProps
      }
    }
  }
  return {}
}

app.use(wrap(async (req, res, next) => {
  let { app, redirectLocation, renderProps } = await matchAppRoutes(req.url)

  if (redirectLocation) {
    return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  }

  if (!renderProps) return res.status(404).send('Not found')

  let model = req.getModel()

  model.prepareBundle()
  // FIXME: hack for passing model through react-router
  renderProps.location.model = model
  // FIXME: hack to be able overwrite React.createElement
  renderProps.createElement = createElement
  let children = <RouterContext {...renderProps} />
  let html = await renderToStaticMarkup(HtmlLayout, {model, app}, children)
  return res.status(200).send(html)
}))

export default app
