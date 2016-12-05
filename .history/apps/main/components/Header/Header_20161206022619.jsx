import React, { Component, PropTypes } from 'react'
import './Header.styl'
import LogoIcon from 'icons/logo.svg'

class Header extends Component {

  render () {
    return (
      <div className='Header'>
        <a className='Header-logo' href='#'><LogoIcon /></a>
        <div className='Header-nav'>
          <nav>
            <a href='#'>Главная</a>
            <a href='#'>Номера</a>
            <a href='#'>Контакты</a>
          </nav>
          <div className='Header-info'>
            <span>Севастополь, пос.Любимовка, ул. Южногородская,18</span>
            <span>+7(978) 224-91-55</span>
            <span>+7(978) 224-91-68</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
