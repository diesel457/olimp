import React, { Component, PropTypes } from 'react'
import VKIcon from 'icons/vk.svg'
import './Footer.styl'
import InstIcon from 'icons/instagram.svg'
import FBIcon from 'icons/fb.svg'

class Footer extends Component {

  render () {
    return (
      <footer className='Footer'>
        <div className='col'>
          <h2>Акции и новости</h2>
          <div className='description'>Мы в социальных сетях</div>
          <div className='widget'>
            <a href='#'><VKIcon /></a>
            <a href='#'><InstIcon /></a>
            <a href='#'><FBIcon /></a>
          </div>
        </div>
        <div className='col'>
          <h2>Погода</h2>
          <div className='description'>Севастополь, Любимовка</div>
        </div>
        <div className='col'>
          <h2>Телефоны</h2>
          <div className='description'>Предзаказ, бронирование, трансфер</div>
					<div className='widget'>
						<div>+7(978) 224-91-55</div>
            <div>+7(978) 224-91-68</div>
					</div>
        </div>
        <div className='col'>
          <h2>Навигация по сайту</h2>
          <nav className='nav'>
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
