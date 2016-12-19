import React, { Component, PropTypes } from 'react'
import './Room.styl'
import Popup from '../../../../components/Popup'

class Room extends Component {

  state = {
    isPopup: false
  }

  render () {
    let { data } = this.props
    let { isPopup } = this.state

    return (
      <div className='Room'>
        { isPopup && <Popup title='Забронировать номер'/> }
        <div className='Room-left'><img src={data.images[0].path} /></div>
        <div className='Room-right'>
          <div className='Room-title'>{data.title}</div>
          <div className='Room-description'>{data.description}</div>
          <div className='Room-price'>{data.price} руб/сутки</div>
          <button className='Room-btn' onClick={this._toggleState.bind(this)}>Забронировать</button>
        </div>
      </div>
    )
  }

  _toggleState = () => {
		this.setState({isPopup: !this.state.isPopup})
	}

}

export default Room
