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

    return {children}
  }
}

export default Root
