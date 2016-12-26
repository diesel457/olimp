import React, { Component, PropTypes } from 'react'
import './PreviewRoomList.styl'
class PreviewRoomList extends Component {

	constructor (props) {
    super()
    this.state = {
      cards: props.cards || []
      // image: props.cards.images || [],
      // title: props.cards.title || '',
      // description: props.cards.description || '',
      // price: props.cards.price || 0
    }
	}

  render () {
    let {cards} = this.state
    let content = cards.map((card, index) => {
      let {images = [], title, price, description} = card
			return(
        <div key={index} className='PreviewRoomList-item'>
          <img className='PreviewRoomList-item-img' src={images[0].path} />
          <div className='PreviewRoomList-item-bottom'>
            <div className='PreviewRoomList-item-name'>{title}</div>
            <div className='PreviewRoomList-item-description'>{description}</div>
            <div className='PreviewRoomList-item-price'>{price} руб./сутки</div>
          </div>
        </div>
      )
		});
    return (
      <div className='PreviewRoomList'>{content}</div>
    )
  }



}

export default PreviewRoomList
