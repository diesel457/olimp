import React, { Component, PropTypes } from 'react'
import './Room.styl'
import Popup from '../../../../components/Popup'
import BookingRoom from '../BookingRoom'

class Room extends Component {

  state = {
    isPopup: false,
    activeImage: 0
  }

  render () {
    let { data } = this.props
    let { isPopup, activeImage } = this.state
    let images = data.images.map((data, index) => {
      return <img src={data.path} className={activeImage === index && '-active'} key={index} onClick={this._changeActiveImage.bind(this, index)}/>
    });

    return (
      <div className='Room'>
        { isPopup && <Popup title='Забронировать номер'><BookingRoom data={data}/></Popup> }
        <div className='Room-left'>
					<img src={data.images[activeImage].path} />
          <div className='Room-imagesList'>
            {images}
          </div>
				</div>
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

  _changeActiveImage (index) {
    this.setState({activeImage: index})
  }

}

export default Room
