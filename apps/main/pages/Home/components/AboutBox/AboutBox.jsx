import React, { Component, PropTypes } from 'react'
import './AboutBox.styl'
import WifiIcon from 'icons/wifi.svg'
import TvIcon from 'icons/tv.svg'
import FridgeIcon from 'icons/fridge.svg'
import ShowerIcon from 'icons/shower.svg'
import SafeIcon from 'icons/safe.svg'
import FoodIcon from 'icons/food.svg'

class AboutBox extends Component {

  render () {
    return (
      <div className='AboutBox'>
				<div className='AboutBox-spinner'>
          <h2>Гостевой дом «Олимп»</h2>
          <div className='AboutBox-description-first'>
            Гостевой дом «Олимп» расположен в самом центре
            курортного поселка Любимовка, на берегу Черного моря,
            в 2-х минутах ходьбы от большого широкого
            песчано-галечного пляжа.
            За 15-20 минут общественным транспортом можно
            добраться до исторического центра города Севастополя.
          </div>
          <div className='AboutBox-description-second'>
            <p>
              Гостевой дом представляет собой отдельно стоящее 4-х этажное
              здание, расположенное на закрытой и круглосуточно охраняемой
              территории с зоной отдыха. Год постройки 2016.
            </p>
            <p>
              К Вашим услугам круглосуточная стойка регистрации, внимательный
              персонал предоставит Вам всю необходимую информацию,
              а так же поможет с организацией трансфера и заказом экскурсий
              по всему Крымскому побережью.
            </p>
            <p>
              Бронирование номера в нашем гостевом доме станет отличным
              выбором для спокойного размеренного семейного отдыха в дали
              от забот и суеты!
            </p>
          </div>
        </div>
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
