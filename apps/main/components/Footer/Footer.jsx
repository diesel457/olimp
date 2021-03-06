import React, { Component, PropTypes } from 'react'
import superagent from 'superagent'
import './Footer.styl'
import VKIcon from 'icons/vk.svg'
import InstIcon from 'icons/instagram.svg'
import FBIcon from 'icons/fb.svg'
import Cloudy_Weather from 'icons/cloudy.svg'
import Storm_Weather from 'icons/storm.svg'
import Rain_Weather from 'icons/rain.svg'
import RainWithStorm_Weather from 'icons/rainWithStorm.svg'
import Snow_Weather from 'icons/snow.svg'
import Sun_Weather from 'icons/sun.svg'

class Footer extends Component {

  state = {
    weather: null,
    translatedConditions: [
			{name: "торнадо", icon: <Storm_Weather />},
      {name: "тропическая буря", icon: <Storm_Weather />},
      {name: "ураган", icon: <Storm_Weather />},
      {name: "сильные грозы", icon: <Storm_Weather />},
      {name: "гроза", icon: <Storm_Weather />},
      {name: "дождь со снегом", icon: <Snow_Weather />},
      {name: "дождь со снегом", icon: <Snow_Weather />},
      {name: "гололёд", icon: <Snow_Weather />},
      {name: "незначительный дождь", icon: <Snow_Weather />},
      {name: "град", icon: <Snow_Weather />},
      {name: "сильный дождь", icon: <Rain_Weather />},
      {name: "сильный дождь", icon: <Rain_Weather />},
      {name: "незначительный снег", icon: <Snow_Weather />},
      {name: "не значительный снег с ливнем", icon: <Rain_Weather />},
      {name: "метель", icon: <Rain_Weather />},
      {name: "снег", icon: <Snow_Weather />},
      {name: "град", icon: <Storm_Weather />},
      {name: "дождь со снегом", icon: <Storm_Weather />},
      {name: "буря", icon: <Snow_Weather />},
      {name: "туман", icon: <Cloudy_Weather />},
      {name: "незначительный туман", icon: <Cloudy_Weather />},
      {name: "густой туман", icon: <Cloudy_Weather />},
      {name: "сильный ветер", icon: <Sun_Weather />},
      {name: "ветер", icon: <Sun_Weather />},
      {name: "холодно", icon: <Snow_Weather />},
      {name: "облачно", icon: <Cloudy_Weather />},
      {name: "ночью пасмурно", icon: <RainWithStorm_Weather />},
      {name: "днём пасмурно", icon: <RainWithStorm_Weather />},
      {name: "ночью переменная облачность", icon: <Cloudy_Weather />},
      {name: "днём переменная облачность", icon: <Cloudy_Weather />},
      {name: "ясная ночь", icon: <Cloudy_Weather />},
      {name: "солнечно", icon: <Sun_Weather />},
      {name: "ночью прояснения", icon: <Cloudy_Weather />},
      {name: "днём прояснения", icon: <Sun_Weather />},
      {name: "дождь с градом", icon: <Storm_Weather />},
      {name: "жарко", icon: <Sun_Weather />},
      {name: "местами грозы", icon: <RainWithStorm_Weather />},
      {name: "в отдельных районах грозы", icon: <RainWithStorm_Weather />},
      {name: "в отдельных районах грозы", icon: <RainWithStorm_Weather />},
      {name: "в отдельных районах проливной дождь", icon: <Rain_Weather />},
      {name: "сильный снег", icon: <Snow_Weather />},
      {name: "в отдельных районах снег с проливным дождём", icon: <Snow_Weather />},
      {name: "сильный снег", icon: <Snow_Weather />},
      {name: "частиная облачность", icon: <Cloudy_Weather />},
      {name: "ливень с грозой", icon: <RainWithStorm_Weather />},
      {name: "ливень со снегом", icon: <Snow_Weather />},
      {name: "местами проливной дождь с грозой", icon: <RainWithStorm_Weather />}
    ]
  }

  componentDidMount() {
    setInterval(() => {
      if(!this.state.weather){
        this._getWeather()
      }
    }, 3000)

    setInterval(() => {
      this._getWeather()
    }, 86400000)

  }

  render () {
		let { path } = this.props
    let { weather, translatedConditions } = this.state

    return (
      <footer className='Footer'>
        <div className='Footer-item'>
          <h2>Акции и новости</h2>
          <div className='Footer-item-description'>Мы в социальных сетях</div>
          <div className='Footer-item-social'>
            <a href='#'><VKIcon width='22' height='22'/></a>
            <a href='#'><FBIcon width='22' height='22'/></a>
            <a href='#'><InstIcon width='22' height='22'/></a>
          </div>
        </div>

        <div className='Footer-item'>
          <h2>Погода</h2>
          <div className='Footer-item-description'>Севастополь, Любимовка</div>
          <div className='Footer-weather'>
            {weather && translatedConditions[weather.code].icon}
            {weather && <span className='Footer-weather-temp'>{weather.temp}</span>}
            <span className='Footer-weather-cel'>
              {weather && '°' + weather.unit}
              <span className='Footer-weather-cond'>{weather && translatedConditions[weather.code].name || 'Получаем метеоданные ...'}</span>
            </span>
          </div>
        </div>

        <div className='Footer-item'>
          <h2>Телефоны</h2>
          <div className='Footer-item-description'>Предзаказ, бронирование, трансфер</div>
          <div className='Footer-item-telephones'>
            <span>+7(978) 224-91-55</span>
            <span>+7(978) 224-91-68</span>
          </div>
        </div>

        <div className='Footer-item -noMobile'>
          <h2>Навигация по сайту</h2>
          <nav className='Footer-item-nav'>
            <a href='/home' className={path === '/home' ? '-active' : ''}>Главная</a>
            <a href='/rooms' className={path === '/rooms' ? '-active' : ''}>Номера</a>
            <a href='/about' className={path === '/about' ? '-active' : ''}>Контакты</a>
          </nav>
        </div>

      </footer>
    )
  }

  _getWeather () {
    superagent
      .post('/api/weather')
      .send({ woeid: 20070189 })
      .end((err, res) => {
        if(res.body){
          let condition = res.body.channel.item.condition
          this.setState({weather:{temp: condition.temp, code: condition.code, unit: res.body.channel.units.temperature}})
        }
      })
  }

}

export default Footer
