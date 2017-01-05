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
				<div className='Slider-booking' onClick={this.props.toggleState}>Забронировать</div>
        <Carousel className='Slider-carousel' decorators={Decorators}>
          <img src="/img/image-1.png"/>
          <img src="/img/image-2.png"/>
          <img src="/img/image-3.png"/>
          <img src="/img/image-4.png"/>
          <img src="/img/image-5.png"/>
          <img src="/img/image-6.png"/>
					<img src="/img/image-7.png"/>
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
