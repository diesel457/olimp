import React, { Component, PropTypes } from 'react'
import './Room.styl'

class Room extends Component {

  render () {
    let { data } = this.props
    return (
      <div className='Room'>
        <div className='Room-left'><img src='/img/Mask.jpg' /></div>
        <div className='Room-right'>
          <div className='Room-title'>{data.title}</div>
          <div className='Room-description'>{data.description}</div>
          <div className='Room-price'>{data.price} руб/сутки</div>
          <button className='Room-btn'>Забронировать</button>
        </div>
      </div>
    )
  }

}

export default Room
