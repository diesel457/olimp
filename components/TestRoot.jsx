import { Component, PropTypes } from 'react'

class TestRoot extends Component {

  static propTypes = {
    children: PropTypes.any,
    history: PropTypes.any,
    model: PropTypes.object
  }

  static childContextTypes = {
    history: PropTypes.any,
    model: PropTypes.object
  }

  getChildContext () {
    let { history, model } = this.props

    return {
      history,
      model
    }
  }

  render () {
    let { children } = this.props

    return children
  }
}

export default TestRoot
