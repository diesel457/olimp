import React, { Component, PropTypes } from 'react'
import './Footer.styl'
import VKIcon from 'icons/vk.svg'
import InstIcon from 'icons/instagram.svg'
import FBIcon from 'icons/fb.svg'

class Footer extends Component {

  render () {
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
        </div>

        <div className='Footer-item'>
          <h2>Телефоны</h2>
          <div className='Footer-item-description'>Предзаказ, бронирование, трансфер</div>
          <div className='Footer-item-telephones'>
            <span>+7(978) 224-91-55</span>
            <span>+7(978) 224-91-68</span>
          </div>
        </div>

        <div className='Footer-item'>
          <h2>Навигация по сайту</h2>
          <div className='Footer-item-description'>Предзаказ, бронирование, трансфер</div>
          <nav className='Footer-item-nav'>
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
