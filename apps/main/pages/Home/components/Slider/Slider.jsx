import React, { Component, PropTypes } from 'react'
import Carousel from 'nuka-carousel'
import SrollArrow from 'icons/scroll-icon.svg'
import Decorators from './Decorators'
import './Slider.styl'

class Slider extends Component {
  render () {
    mixins: [Carousel.ControllerMixin]

    return (
      <div className='Slider'>
        <Carousel className='Slider-carousel' decorators={Decorators}>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
          <img src="/img/firts-slide.jpg"/>
        </Carousel>
        <div className='Slider-animation'>
          <div className='Slider-animation-circle'>
            <SrollArrow className='Slider-animation-arrow' width='20' height='12'/>
          </div>
          Листайте вниз
        </div>
      </div>
    )
  }

}

export default Slider
