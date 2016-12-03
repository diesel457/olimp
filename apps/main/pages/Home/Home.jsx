import React, { Component, PropTypes } from 'react'

class Home extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div className='Home'>
        Home Page!
      </div>
    )
  }
}

export default Home
