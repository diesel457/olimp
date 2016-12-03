import React, { Component, PropTypes } from 'react'
import { createContainer } from 'react-amelisa'

class Page extends Component {

  static contextTypes = {
    model: PropTypes.object,
    router: PropTypes.any
  }

  static propTypes = {
    user: PropTypes.any,
    children: PropTypes.any
  }

  subscribe () {
    let userId = this.context.model.get('_session.userId')

    return {
      user: ['users', userId, {fetch: false}]
    }
  }

  render () {
    let { children, user = {} } = this.props
    return React.cloneElement(children, {me: user})
  }
}

export default createContainer(Page)
