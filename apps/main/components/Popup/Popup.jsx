import React, { Component, PropTypes } from 'react'
import superagent from 'superagent'
import './Popup.styl'
import XMark from 'icons/xmark.svg'
import LogoIcon from 'icons/logo.svg'
import Dropdown from './Dropdown'

class Popup extends Component {

  state = {
    isActive: false
  }

  componentDidMount (){
    setTimeout( () =>{
      this.setState({isActive: true})
    }, 100)
  }

  render () {
    let { isActive } = this.state
    return (
      <div className={isActive ? 'Popup -active' : 'Popup'}>
        <div className='Popup-top'>
          <div className='Popup-logo' width='40' height='35'><LogoIcon /></div>
          <div className='Popup-title'>
            <span>Бронирование номеров</span>
          </div>
          <div className='Popup-xMark' onClick={this._closePopup.bind(this)}>
            <XMark width='16' height='16'/>
          </div>
        </div>
        <div ref='inner' className='inner'>
          <div className='Popup-content'>
            <div className='Popup-form'>

              <div className='Popup-form-dropdown'>
                <Dropdown />
              </div>

              <div className='Popup-form-row'>
                <label htmlFor='input1'>Ваше имя</label>
                <input id='input1' type='text'/>
              </div>

              <div className='Popup-form-row'>
                <label htmlFor='input2'>Ваш телефон</label>
                <input id='input2' type='tel'/>
              </div>

              <div className='Popup-form-row'>
                <label htmlFor='input3'>Ваша электропочта</label>
                <input id='input3' type='email'/>
              </div>

              <div className='Popup-form-row -clear'>
                <button className='Popup-form-submit'>Забронировать</button>
              </div>
            </div>
          </div>
				</div>
      </div>
    )
  }

  _closePopup (e) {
    if(e.target === this.refs.inner || e.target.closest('.Popup-content')){ return false }
    this.setState({isActive: false})
    this.props.toggleState()
  }

  _sendEmail () {
    superagent
      .post('/api/hello')
      .send({ name: 'Manny', species: 'cat' })
      .end((err, data) => {
        console.log(err, data)
      })
  }

}

export default Popup
