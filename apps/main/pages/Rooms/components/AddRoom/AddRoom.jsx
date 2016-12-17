import React, { Component, PropTypes } from 'react'
import './AddRoom.styl'

class AddRoom extends Component {

  render () {
    return (
      <div className='AddRoom'>
        <div className='AddRoom-content'>
          <div className='AddRoom-form'>

            <div className='AddRoom-form-row'>
              <label htmlFor='input1'>Загрузить фотографию карточки комнаты</label>
              <input id='input1' type='file'/>
            </div>

  					<div className='AddRoom-form-row'>
              <label htmlFor='input2'>Заголовок карточки комнаты</label>
              <input id='input2' type='text'/>
            </div>

            <div className='AddRoom-form-row -textarea'>
              <label htmlFor='input3'>Описание карточки комнаты</label>
              <textarea id='input3'></textarea>
            </div>

            <div className='AddRoom-form-row'>
              <label htmlFor='input4'>Прайс карточки комнаты</label>
              <input id='input4' type='number'/>
            </div>

  				</div>
        </div>
      </div>
    )
  }

}

export default AddRoom
