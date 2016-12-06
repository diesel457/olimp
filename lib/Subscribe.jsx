import _ from 'lodash'
import React from 'react'
import model from './model'
import hoistStatics from 'hoist-non-react-statics'

// TODO: Explore the possibilities to optimize _.isEqual and _.clone
// http://stackoverflow.com/q/122102

/**
 * ShareDB subscriptions decorator.
 * @param [reactiveProp]... {string} - names of the props which trigger resubscribe
 *    Update subscription when any of them changes.
 * @param getSubscriptions {Function} - (props, state) Retrieve initial subscriptions data
 * @returns {Function}
 * @constructor
 * @example
 * |  @Subscribe('toContentIds', 'fromContentIds', (props) => {
 * |    return {
 * |      template: ['templates', props.templateId],
 * |      sections: ['sections', { instructions: true, $sort: { createdAt: -1 } }],
 * |      toTexts: ['texts', { _id: { $in: props.toContentIds } }],
 * |      fromTexts: ['texts', { _id: { $in: props.fromContentIds } }]
 * |    }
 * |  })
 */
export default function Subscribe () {
  let getSubscriptions = arguments[arguments.length - 1]
  if (typeof getSubscriptions !== 'function') {
    throw new Error('[@Subscribe] last argument (getSubscriptions) must be a function.')
  }
  let reactiveProps = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
  if (reactiveProps.some(i => typeof i !== 'string')) {
    throw new Error('[@Subscribe] reactiveProps must be strings.')
  }
  return function decorateTarget (DecoratedComponent) {
    class SubscriptionsContainer extends React.Component {

      constructor (props) {
        super(props)
        this.subscriptions = this.getCurrentSubscriptions(props)
        this.state = {}
        this.listeners = {}
        this.subscribe()
      }

      componentWillUnmount () {
        this.unmounted = true
        for (let key in this.listeners) {
          let {ee, eventName, fn} = this.listeners[key]
          ee.removeListener(eventName, fn)
        }
        delete this.listeners
        model.unsubscribe(this.subscriptionsArray || [])
      }

      // Update only after everything loaded
      shouldComponentUpdate (nextProps, nextState) {
        return !!this.loaded
      }

      getCurrentSubscriptions (props) {
        return getSubscriptions && getSubscriptions(props) || {}
      }

      // Update queries when reactiveProps change.
      // Right now it only supports changes to the existing queries.
      // TODO: Implement support for removing/adding queries
      componentWillReceiveProps (nextProps) {
        let updateQueries = false
        reactiveProps.forEach((reactiveProp) => {
          if (!_.isEqual(this.props[reactiveProp], nextProps[reactiveProp])) {
            updateQueries = true
          }
        })
        if (updateQueries) {
          let prevSubscriptions = this.subscriptions
          this.subscriptions = this.getCurrentSubscriptions(nextProps)
          for (let key in this.subscriptions) {
            let [collection, queryParams] = this.subscriptions[key]
            // Do updates only for queries (if you want a reactive doc subscription -
            // create a query { _id: props.myId })
            if (typeof queryParams === 'object') {
              let [, prevQueryParams] = prevSubscriptions[key]
              if (!_.isEqual(queryParams, prevQueryParams)) {
                this.updateQuery(key, collection, queryParams)
              }
            }
          }
        }
      }

      subscribe () {
        let subscriptions = []
        for (let key in this.subscriptions) {
          let [collection, queryParams] = this.subscriptions[key]
          if (typeof queryParams === 'string') {
            subscriptions.push({
              key: key,
              doc: model.scope(`${collection}.${queryParams}`)
            })
          } else {
            subscriptions.push({
              key: key,
              query: model.query(collection, queryParams)
            })
          }
        }
        this.subscriptionsArray = subscriptions.map(i => i.query || i.doc)
        model.subscribe(this.subscriptionsArray, (err) => {
          if (err) return console.error(err)
          if (this.unmounted) return model.unsubscribe(this.subscriptionsArray)
          subscriptions.forEach((subscription) => {
            if (subscription.doc) {
              this.initDocData(subscription.key, subscription.doc)
            } else if (subscription.query) {
              this.initQueryData(subscription.key, subscription.query)
            }
          })
          this.loaded = true
          this.forceUpdate()
        })
      }

      initDocData (key, doc) {
        let [collection, docId] = doc.path().split('.')
        this.updateDocData(key, doc, collection, docId)
        let fn = () => this.updateDocData(key, doc, collection)
        this.listenDoc(collection, docId, key, fn)
      }

      listenDoc (collection, docId, key, fn) {
        let shareDoc = model.root.connection.get(collection, docId)
        if (!shareDoc) return console.error('Doc not found:', collection, docId)
        ;['op', 'del', 'create'].forEach((eventName) => {
          shareDoc.on(eventName, fn)
          let listenerName = `${collection}_${docId}_${key}_${eventName}`
          this.listeners[listenerName] = {
            ee: shareDoc,
            eventName: eventName,
            fn: fn
          }
        })
      }

      clearDocListeners (collection, docId, key) {
        ;['op', 'del', 'create'].forEach((eventName) => {
          let listenerName = `${collection}_${docId}_${key}_${eventName}`
          let {ee, fn} = this.listeners[listenerName]
          ee.removeListener(eventName, fn)
          delete this.listeners[listenerName]
        })
      }

      updateDocData = (key, doc, collection, docId) => {
        let update = false
        let newValues = {}
        let value = doc.get()
        // FIXME: HACK 'texts' collection to always update since
        //        it's not properly syncronized with the racer model
        if (collection === 'texts' || !_.isEqual(value, this.state[key])) {
          update = true
          // clone before setting
          newValues[key] = _.cloneDeep(doc.get())
        }
        if (update) this.setState(newValues)
      }

      initQueryData (key, query) {
        let updateFn = () => this.updateQueryData(key, query)

        // Do the initial data update
        updateFn()

        // - Listen for changes to update query data

        // [update of query documents]
        let docIds = query.getIds()
        let collection = query.collectionName
        docIds.forEach((docId) => {
          this.listenDoc(collection, docId, key, updateFn)
        })

        // [insert]
        let insertFn = (shareDocs) => {
          // Update query data
          updateFn()
          // Start listening to changes to the new docs
          let ids = getShareResultsIds(shareDocs)
          ids.forEach((docId) => {
            this.listenDoc(collection, docId, key, updateFn)
          })
        }
        query.shareQuery.on('insert', insertFn)
        this.listeners[`${collection}_${key}_insert`] = {
          ee: query.shareQuery,
          eventName: 'insert',
          fn: insertFn
        }

        // [remove]
        let removeFn = (shareDocs) => {
          // Update query data
          updateFn()
          // Stop listening the removed docs
          let ids = getShareResultsIds(shareDocs)
          ids.forEach((docId) => {
            this.clearDocListeners(collection, docId, key)
          })
        }
        query.shareQuery.on('remove', removeFn)
        this.listeners[`${collection}_${key}_remove`] = {
          ee: query.shareQuery,
          eventName: 'remove',
          fn: removeFn
        }

        // [move] Do the regular update
        query.shareQuery.on('move', updateFn)
        this.listeners[`${collection}_${key}_move`] = {
          ee: query.shareQuery,
          eventName: 'move',
          fn: updateFn
        }
      }

      updateQuery (key, collection, newQuery) {
        let shareQuery = this._getShareQuery(key, collection)
        if (!shareQuery) return console.error('No share query found', key, collection)
        console.log('>>>>>>> UPDATE QUERY', {newQuery})
        shareQuery.setQuery(newQuery)
      }

      // A little hacky way to get the sharedQuery from from
      // saved listeners
      _getShareQuery (key, collection) {
        let listener = this.listeners[`${collection}_${key}_insert`]
        return listener && listener.ee
      }

      updateQueryData (key, query) {
        let time = Date.now()
        let update = false
        let newValues = {}
        let ids = []
        let value = query.get().filter(doc => {
          if (doc) {
            ids.push(doc.id)
            return true
          } else {
            return false
          }
        })
        if (!_.isEqual(value, this.state[key])) {
          // Clone before writing
          newValues[key] = _.cloneDeep(value)
          update = true
        }
        let idsName = getIdsName(key)
        if (!_.isEqual(ids, this.state[idsName])) {
          newValues[idsName] = ids
          update = true
        }
        // console.log('>>>>>>> IDS', idsName)
        // console.log('prev >', this.state[idsName])
        // console.log('new >', ids)
        // console.log('old value >', this.state[key])
        // console.log('new value', value)
        console.log('> time', (Date.now() - time) / 1000 + 's')
        if (update) console.log('++++++++++++++++ DO UPDATE')
        if (update) this.setState(newValues)
      }

      render () {
        return (
          this.loaded
          ? <DecoratedComponent
            {...this.props}
            {...this.state}
          />
          : <div className='Loading' />
        )
      }

    }

    return hoistStatics(SubscriptionsContainer, DecoratedComponent)
  }
}

function getShareResultsIds (results) {
  let ids = [];
  for (let i = 0; i < results.length; i++) {
    let shareDoc = results[i]
    ids.push(shareDoc.id)
  }
  return ids
}

function getIdsName (plural) {
  return plural.replace(/s$/i, '') + 'Ids'
}
