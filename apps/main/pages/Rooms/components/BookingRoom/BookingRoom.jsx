import React, { Component, PropTypes } from 'react'
import './BookingRoom.styl'
import superagent from 'superagent'
import Dropdown from '../../../../components/Dropdown'

class BookingRoom extends Component {

  constructor (props) {
    super()
    this.state = {
      selectedValue: null,
      name: props.data.title,
      price: props.data.price
    }
  }

  render () {

    let { data = {} } = this.props

    return (
      <div className='BookingRoom-content'>
        <div className='BookingRoom-form'>

          <div className='BookingRoom-form-row'>
            <label htmlFor='input1'>Ваше имя</label>
            <input id='input1' type='text' />
          </div>

          <div className='BookingRoom-form-row'>
            <label htmlFor='input2'>Ваш телефон</label>
            <input id='input2' type='tel' />
          </div>

          <div className='BookingRoom-form-row'>
            <label htmlFor='input3'>Ваша электропочта</label>
            <input id='input3' type='email' />
          </div>

          <div className='AddRoom-form-row -textarea'>
            <label htmlFor='input4'>Ваши пожелания</label>
            <textarea id='input4' ref='description'></textarea>
          </div>

          <div className='BookingRoom-form-row -clear'>
            <button className='BookingRoom-form-submit' onClick={this._sendEmail.bind(this)}>Забронировать</button>
          </div>
        </div>
      </div>
    )
  }

  _sendEmail () {
    // superagent
    //   .post('/api/hello')
    //   .send({ name: 'Manny', species: 'cat' })
    //   .end((err, data) => {
    //     console.log(err, data)
    //   })
  }
}

export default BookingRoom
