import express from 'express'
import fs from 'fs'
import shareDbServer from 'dm-sharedb-server'
import mainRoutes from '../apps/main/Routes'
import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy
import derbyAr from 'derby-ar'
import Racer from 'racer'
import api from './api'
import middle from './middle'
import bcrypt from 'bcrypt-nodejs'

const ROOT_PATH = process.cwd()
const TMP_PATH = ROOT_PATH + '/tmp'
let getHead

// Init ORM
Racer.use(derbyAr)
// Racer.use(ormEntities)

passport.serializeUser((userId, done) => {
  done(null, userId)
})

passport.deserializeUser((userId, done) => {
  done(null, userId)
})

passport.use('local-signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback : true
},
function(req, username, password, done){
  let {model} = req
  let $admin = model.query('auths', {username: username, admin: true})
  model.fetch($admin, function(){
    let admin = $admin.get()[0]
    let validPass = bcrypt.compareSync(password, admin.password)

    if(!admin || !validPass) return done(null, false)

    return done(null, {username, password})
  })
}))

export default (done) => {
  shareDbServer({
    appRoutes: {
      main: mainRoutes
    },
    beforeStart: beforeStart
  }, (ee, options) => {
    ee.on('middleware', (expressApp) => {
      if (!fs.existsSync(TMP_PATH)) fs.mkdirSync(TMP_PATH)
      expressApp.use('/tmp', express.static(TMP_PATH))
      expressApp.use(passport.initialize())
      expressApp.use(passport.session())
      expressApp.use(middle.passportSessionSetup)
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
