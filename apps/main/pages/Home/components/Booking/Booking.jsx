import React, { Component, PropTypes } from 'react'
import './Booking.styl'
import superagent from 'superagent'
import Dropdown from '../../../../components/Dropdown'

class Booking extends Component {

  state = {
    selectedValue: null,

  }

  render () {
    return (
      <div className='Booking-content'>
        <div className='Booking-form'>

          <div className='Booking-form-dropdown'>
            <Dropdown getNameValue={this._setSelectedValue}/>
          </div>

          <div className='Booking-form-row'>
            <label htmlFor='input1'>Ваше имя</label>
            <input id='input-name' type='text'/>
          </div>

          <div className='Booking-form-row'>
            <label htmlFor='input2'>Ваш телефон</label>
            <input id='input-tel' type='tel'/>
          </div>

          <div className='Booking-form-row'>
            <label htmlFor='input3'>Ваша электропочта</label>
            <input id='input-email' type='email'/>
          </div>

          <div className='Booking-form-row -clear'>
            <button className='Booking-form-submit' onClick={this._sendEmail.bind(this)}>Забронировать</button>
          </div>
        </div>
      </div>
    )
  }

  _setSelectedValue = (value) => {
    this.setState({selectedValue: value})
  }

  _sendEmail () {
    let data = {
      type: this.state.selectedValue,
      name: document.getElementById('input-name').value,
      tel: document.getElementById('input-tel').value,
      email: document.getElementById('input-email').value
    }
    
    superagent
      .post('/api/send-email')
      .send(data)
      .end((err, data) => {
        console.log(err, data)
      })
  }
}

export default Booking
