import React, { PropTypes } from 'react'

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
