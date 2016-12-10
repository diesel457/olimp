import React, { Component, PropTypes } from 'react'
import './Header.styl'
import LogoIcon from 'icons/logo.svg'
import {model} from 'lib'

class Header extends Component {

  render () {
    return (
      <div className='Header'>
        <a className='Header-logo' href='/home'><LogoIcon width='40' height='35' /></a>
        <nav className='Header-nav'>
          <a href='/home'>Главная</a>
          <a href='/rooms'>Номера</a>
          <a href='/about'>Контакты</a>
        </nav>
        <div className='Header-info'>
          <span className='Header-address'>Севастополь, пос.Любимовка, ул. Южногородская,18</span>
          <span>+7(978) 224-91-55</span>
          <span>+7(978) 224-91-67</span>
        </div>
      </div>
    )
  }
}

export default Header
