import MongoStorage from 'amelisa-mongo/MongoStorage'
import { Store } from 'amelisa'

let storage = new MongoStorage(process.env.MONGO_URL)

const options = {
  version: 1,
  storage,
  collections: {
    auths: {
      client: false
    },
    users: {
      client: true
    }
  },
  projections: {
    users: {
      collectionName: 'auths',
      fields: {
        id: true,
        email: true,
        name: true
      }
    }
  },
  saveOps: false
}

let store = new Store(options)

export default store
