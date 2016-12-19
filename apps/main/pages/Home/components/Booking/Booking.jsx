import React, { Component, PropTypes } from 'react'
import './Booking.styl'
import superagent from 'superagent'
import Dropdown from '../../../../components/Dropdown'

class Booking extends Component {

  state = {
    selectedValue: null
  }

  render () {
    return (
      <div className='Booking-content'>
        <div className='Booking-form'>

          <div className='Booking-form-dropdown'>
            <Dropdown change={this._setSelectedValue}/>
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
    console.log(this.state.selectedValue)
    // console.log(this.state)
    // superagent
    //   .post('/api/hello')
    //   .send({ name: 'Manny', species: 'cat' })
    //   .end((err, data) => {
    //     console.log(err, data)
    //   })
  }
}

export default Booking
