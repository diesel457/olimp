import React, { PropTypes } from 'react'
import { RootComponent } from 'react-amelisa'
import Loading from 'project-components/Loading'
let isServer = process.title !== 'browser'

class Root extends RootComponent {

  static propTypes = {
    children: PropTypes.element
  }

  render () {
    let { children } = this.props
    // server rendering is disabled intentionally, because we do not need it
    // TODO: Make server rendering properly with faster loading api pages
    if (isServer) return <Loading />

    return {children}
  }
}

export default Root
