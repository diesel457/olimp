import React, { Component, PropTypes } from 'react'
import './Booking.styl'
import Dropdown from '../../../../components/Dropdown'

class Booking extends Component {

  render () {
    return (
      <div className='Booking-content'>
        <div className='Booking-form'>

          <div className='Booking-form-dropdown'>
            <Dropdown />
          </div>

          <div className='Booking-form-row'>
            <label htmlFor='input1'>Ваше имя</label>
            <input id='input1' type='text'/>
          </div>

          <div className='Booking-form-row'>
            <label htmlFor='input2'>Ваш телефон</label>
            <input id='input2' type='tel'/>
          </div>

          <div className='Booking-form-row'>
            <label htmlFor='input3'>Ваша электропочта</label>
            <input id='input3' type='email'/>
          </div>

          <div className='Booking-form-row -clear'>
            <button className='Booking-form-submit'>Забронировать</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Booking
