import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import './Slider.styl'

class Slider extends Component {
  render () {
    mixins: [Carousel.ControllerMixin]

    return (
      <div className='Slider'>
        <img src="/img/firts-slide.jpg"/>
        {/* <Carousel>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
        </Carousel> */}
        <div className='Slider-animation'>
          <div className='Slider-animation-circle'></div>
          Листайте вниз
        </div>
      </div>
    )
  }

}

export default Slider
