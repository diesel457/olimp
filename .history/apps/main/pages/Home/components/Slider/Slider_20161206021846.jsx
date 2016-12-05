import React, { Component, PropTypes } from 'react'
import ReactSwipe from 'react-swipe'
import './Slider.styl'

class Slider extends Component {
  render () {
    return (
      <div className='Swiper'>
        <ReactSwipe swipeOptions={{startSlide: 2}} onSwipeLeft={this.handleLeftSwipe}>
          <div className='Swiper-slide'>PANE 1</div>
          <div className='Swiper-slide'>PANE 2</div>
          <div className='Swiper-slide'>PANE 3</div>
        </ReactSwipe>
      </div>
    )
  }

  handleLeftSwipe (e) {
    console.log(e)
  }

}

export default Slider
