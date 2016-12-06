import React, { Component, PropTypes } from 'react'

class RoomList extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div className='RoomList'>
        <div className='RoomList-item'>
          <img className='img' src='/img/room-img-first.jpg' />
        </div>
      </div>
    )
  }

}

export default RoomList
