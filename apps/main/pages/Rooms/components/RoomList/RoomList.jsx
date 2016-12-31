import React, { Component, PropTypes } from 'react'
import Room from '../Room'
import './RoomList.styl'

class RoomList extends Component {

	componentDidMount () {
    let roomId = this.props.roomId
    this._scrollToRoom(roomId)
	}

  render () {
		let {cards} = this.props
    let cardList = cards.map((item, index) => { return <Room key={index} data={item}/>})
    return (
			<div className='RoomList'>
        {cardList}
      </div>
    )
  }

  _scrollToRoom (roomId) {
    let room = document.getElementById(roomId) || false
    if(!room) return false
    let positionY = room.offsetTop || 0
    let headerHeight = 72
    window.scrollTo(0, positionY - headerHeight)
  }

}

export default RoomList
