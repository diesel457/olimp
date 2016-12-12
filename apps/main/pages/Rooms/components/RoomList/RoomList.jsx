import React, { Component, PropTypes } from 'react'
import Room from '../Room'
import './RoomList.styl'

class RoomList extends Component {

  render () {
    return (
			<div className='RoomList'>
        <Room />
      </div>
    )
  }

}

export default RoomList
