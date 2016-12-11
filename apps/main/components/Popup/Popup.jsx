import React, { Component, PropTypes } from 'react'
import superagent from 'superagent'
import './Popup.styl'

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
      <div className='Popup' onClick={this._closePopup.bind(this)}>
        <div className='Popup-xMark' onClick={this._closePopup.bind(this)}>×</div>
        <div ref='inner' className={isActive ? 'Popup-inner -active' : 'Popup-inner'}>
					<h2>Забронируйте номер.</h2>
          <div className='Popup-content'>
            <div className='Popup-form-row'>
              <label>Фамилия</label>
              <input type='text' placeholder='Ваша фамилия'/>
            </div>
            <div className='Popup-form-row'>
              <label>Имя</label>
              <input type='text' placeholder='Ваше имя'/>
            </div>
            <div className='Popup-form-row'>
              <label>Номер телефона</label>
              <input type='tel' placeholder='Ваше номер телефона'/>
            </div>
            <div className='Popup-form-row'>
              <label>Тип Номера</label>
              <select>
                <option>2-x местный эконом</option>
                <option>2-x местный стандарт</option>
                <option>3-x местный стандарт</option>
                <option>Люкс</option>
              </select>
            </div>
            <div className='Popup-form-row'>
              <button className='Popup-form-send' type='submit' onClick={this._sendEmail.bind(this)}>Отправить</button>
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
