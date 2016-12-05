import express from 'express'
import fs from 'fs'
import shareDbServer from 'dm-sharedb-server'
import mainRoutes from '../main/Routes'
import ShareDB from 'sharedb'
import derbyAr from 'derby-ar'
import Racer from 'racer'
import ormEntities from '../model'
import api from './api'

const ROOT_PATH = process.cwd()
const TMP_PATH = ROOT_PATH + '/tmp'
let getHead

// Init ORM
Racer.use(derbyAr)
Racer.use(ormEntities)

export default (done) => {
  shareDbServer({
    appRoutes: {
      main: mainRoutes
    },
    getHead: getHead,
    beforeStart: beforeStart
  }, (ee, options) => {
    ee.on('middleware', (expressApp) => {
      expressApp.use('/js/quill', express.static('node_modules/quill/dist'))
      expressApp.use('/css/react-treeview.css',
          express.static('node_modules/react-treeview/react-treeview.css'))
      if (!fs.existsSync(TMP_PATH)) fs.mkdirSync(TMP_PATH)
      expressApp.use('/tmp', express.static(TMP_PATH))
    })

    ee.on('routes', (expressApp) => {
      expressApp.use(api)
    })

    ee.on('done', () => {
      if (done != null) done()
    })
  })
}

function beforeStart (backend, cb) {
  cb()
}

getHead = (appName) => `
<link href='/js/quill/quill.bubble.css' rel='stylesheet' />
<link href='/css/react-treeview.css' rel='stylesheet' />
`
