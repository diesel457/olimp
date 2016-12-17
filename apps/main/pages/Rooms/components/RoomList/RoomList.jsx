import React, { Component, PropTypes } from 'react'
import Room from '../Room'
import './RoomList.styl'

class RoomList extends Component {

  render () {
		let {cards} = this.props
    let cardList = cards.map((item, index) => { return <Room key={index} data={item}/>})
    return (
			<div className='RoomList'>
        {cardList}
      </div>
    )
  }

}

export default RoomList
