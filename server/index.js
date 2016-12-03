import '../config'
import http from 'http'
import promisify from 'es6-promisify'
import { Server as WebSocketServer } from 'ws'
import store from './store'

const port = process.env.PORT

const nodeEnvToShow = [
  'NODE_ENV',
  'PORT',
  'BASE_URL',
  'MONGO_URL']

let prepareEnvDisplayObject = nodeEnvToShow.map(i => {
  return {[i]: process.env[ i ]}
})

async function init () {
  await store.init()

  let server = http.createServer()

  let app = require('./app')

  server.on('request', app)

  console.log('----------------- ENV_VARIABLES ------------------- ')
  console.log(prepareEnvDisplayObject)

  let wsServer = new WebSocketServer({server})

  wsServer.on('connection', store.onConnection)

  await promisify(server.listen, server)(port)

  console.info(`${process.pid} listening. Go to: http://localhost:${port}`)
}

export default init()
