import React, { Component, PropTypes } from 'react'
import ReactSwipe from 'react-swipe'

class Slider extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div className='Swiper'>
        <button className='Swiper-booking'>забронировать</button>
        <img className='img' src='/img/firts-slide.jpg' />
      </div>
    )
  }

}

export default Slider
