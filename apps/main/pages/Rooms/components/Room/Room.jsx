import React, { Component, PropTypes } from 'react'
import './Room.styl'
import Popup from '../../../../components/Popup'
import BookingRoom from '../BookingRoom'
import AddRoom from '../AddRoom'
import { model } from 'lib'

class Room extends Component {

  constructor (props) {
    super()
    let data = props.data || {}
    this.state = {
      isPopup: false,
      activeImage: 0,
      isEdit: false,
      data: props.data,
      isMoreText: data.description && data.description.length < 200 ? false : true,
      moreTextIsActive: false
    }

  }

  // componentDidMount () {
  //   let { data = {} } = this.props
  //   console.log(data, 'Component Did mount')
  //   if (data.description && data.description.length < 200){
  //     this.setState({isMoreText: true})
  //   }
  // }

  render () {
    let { isPopup, isEdit, activeImage, isMoreText, data, moreTextIsActive } = this.state
    let images = data.images.map((data, index) => {
      return <img src={data.path} className={activeImage === index && '-active'} key={index} onClick={this._changeActiveImage.bind(this, index)}/>
    });

    return (
      <div id={data.id} className={moreTextIsActive ? 'Room -showMore' : 'Room' }>
        { isPopup && <Popup title='Забронировать номер' toggleState={this._toggleState}><BookingRoom data={data} /></Popup> }
        { isEdit && <Popup title='Изменить карточку номера' toggleState={this._editCard}><AddRoom data={data} submit='Обновить карточку' /></Popup> }
        <div className='Room-left'>
					<img src={data.images[activeImage].path} />
          <div className='Room-imagesList'>
            {images.length > 1 && images}
          </div>
				</div>
        <div className='Room-right'>
          {model.get('_session.isAdmin') && <a className='Admin-edit' onClick={this._editCard.bind(this)}>Edit</a>}
          <div className='Room-title'>{data.title}</div>
          <div className='Room-description'>
            {this._replaceString(data.description, moreTextIsActive)}
            {isMoreText && !moreTextIsActive && <a className='Room-showMore' onClick={this._showMoreText.bind(this)}>ещё...</a>}
            {isMoreText && moreTextIsActive && <a className='Room-showMore' onClick={this._showMoreText.bind(this)}>скрыть...</a>}
          </div>
          <div className='Room-price'>{data.price} руб./сутки</div>
          <button className='Room-btn' onClick={this._toggleState.bind(this)}>Забронировать</button>
        </div>
      </div>
    )
  }

  _toggleState = () => {
		this.setState({isPopup: !this.state.isPopup})
	}

  _showMoreText () {
    this.setState({moreTextIsActive: !this.state.moreTextIsActive})
  }

  _editCard = () => {
		this.setState({isEdit: !this.state.isEdit})
	}

  _changeActiveImage (index) {
    this.setState({activeImage: index})
  }

	_replaceString (string = '', moreTextIsActive) {
    if(string.length < 200 || moreTextIsActive){
      return string
    }else{
      return string.slice(0, 200)
    }
	}

}

export default Room
