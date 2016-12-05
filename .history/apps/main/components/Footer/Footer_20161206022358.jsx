import React, { Component, PropTypes } from 'react'
import VKIcon from 'icons/stop.svg'
import './Footer.styl'
import InstIcon from './icons/instagram.svg'
import FBIcon from './icons/fb.svg'

class Footer extends Component {

  render () {
    return (
      <footer className='Footer'>
        <div className='Footer-col'>
          <h2>Акции и новости</h2>
          <div className='Footer-description'>Мы в социальных сетях</div>
          <div className='Footer-widget'>
            <a href='#'><VKIcon /></a>

          </div>
        </div>
        <div className='Footer-col'>
          <h2>Погода</h2>
          <div className='Footer-description'>Севастополь, Любимовка</div>
        </div>
        <div className='Footer-col'>
          <h2>Телефоны</h2>
          <div className='Footer-description'>Предзаказ, бронирование, трансфер</div>
					<div className='Footer-widget'>
						<div>+7(978) 224-91-55</div>
            <div>+7(978) 224-91-68</div>
					</div>
        </div>
        <div className='Footer-col'>
          <h2>Навигация по сайту</h2>
          <nav className='Footer-nav'>
            <a href='#'>Главная</a>
            <a href='#'>Номера</a>
            <a href='#'>Контакты</a>
          </nav>
        </div>
      </footer>
    )
  }
}

export default Footer
