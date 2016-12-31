import React, { Component, PropTypes } from 'react'
import superagent from 'superagent'
import './Footer.styl'
import VKIcon from 'icons/vk.svg'
import InstIcon from 'icons/instagram.svg'
import FBIcon from 'icons/fb.svg'
import Cloudy_Weather from 'icons/cloudy_weather.svg'

class Footer extends Component {

  state = {
    weather: null,
    translatedConditions: [
      "торнадо", "тропическая буря", "ураган", "сильные грозы",
      "гроза", "дождь со снегом", "дождь со снегом", "дождь со снегом", "гололёд", "мелкий дождь",
      "град", "ливень", "ливень", "снег с перерывами", "не значительный снег с ливнем", "метель", "снег",
      "град", "дождь со снегом", "буря", "туман", "лёгкий туман", "густой туман", "сильный ветер", "ветер",
      "холодно", "облачно", "ночью пасмурно", "днём пасмурно", "ночью переменная облачность",
      "днём переменная облачность", "ясная ночь",, "солнечно", "ночью прояснения", "днём прояснения",
      "дождь с градом", "жарко", "местами грозы", "в отдельных районах грозы", "в отдельных районах грозы",
      "в отдельных районах ливни", "сильный снег", "в отдельных районах снег с пролевным дождём", "сильный снег",
      "частиная облачность", "ливень с грозой", "ливень со снегом", "местами проливной дождь с грозой"
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
            {weather && <Cloudy_Weather />}
            <span className='Footer-weather-temp'>{weather && weather.temp}</span>
            <span className='Footer-weather-cel'>
              {weather && '°' + weather.unit}
              <span className='Footer-weather-cond'>{weather && translatedConditions[weather.code] || 'Получаем метеоданные ...'}</span>
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
