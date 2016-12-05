import React, { Component, PropTypes } from 'react'
import './AboutBox.styl'
import WifiIcon from './../../icons/wifi.svg'
import TvIcon from './../../icons/tv.svg'
import FridgeIcon from './../../icons/fridge.svg'
import ShowerIcon from './../../icons/shower.svg'
import SafeIcon from './../../icons/safe.svg'
import FoodIcon from './../../icons/food.svg'

class AboutBox extends Component {

  render () {
    return (
      <div className='AboutBox'>
        <div className='AboutBox-inner'>
          <h2>Доступно для каждого клиента, в каждом номере</h2>
          <div className='AboutBox-items'>
            <div className='AboutBox-item'>
              <WifiIcon width='26' height='19' />
              <span>Wi-Fi</span>
            </div>
            <div className='AboutBox-item'>
              <TvIcon width='28' height='19' />
              <span>Телевизор</span>
            </div>
            <div className='AboutBox-item'>
              <FridgeIcon width='18' height='25' />
              <span>Холодильник</span>
            </div>
            <div className='AboutBox-item'>
              <ShowerIcon width='30' height='24' />
              <span>Санузел</span>
            </div>
            <div className='AboutBox-item'>
              <SafeIcon width='25' height='21' />
              <span>Сейф</span>
            </div>
            <div className='AboutBox-item'>
              <FoodIcon width='18' height='22' />
              <span>Питание</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default AboutBox
