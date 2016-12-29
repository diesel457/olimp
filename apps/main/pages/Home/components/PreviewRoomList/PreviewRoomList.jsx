import React, { Component, PropTypes } from 'react'
import './PreviewRoomList.styl'
import Subscribe from 'lib/Subscribe'

@Subscribe((props) => {
  return {
    cards: ['cards', {toHome: true}]
  }
})

class PreviewRoomList extends Component {

  render () {
    let {cards} = this.props
    let content = cards.map((card, index) => {
      let {id, images = [], title, price, description} = card
			return(
        <div key={index} className='PreviewRoomList-item'>
          <a className='PreviewRoomList-item-goToRooms' href={'/rooms#' + id}></a>
          <img className='PreviewRoomList-item-img' src={images[0].path} />
          <div className='PreviewRoomList-item-bottom'>
            <div className='PreviewRoomList-item-name'>{title}</div>
            <div className='PreviewRoomList-item-description'>{this._replaceString(description)}...</div>
            <div className='PreviewRoomList-item-price'>{price} руб./сутки</div>
          </div>
        </div>
      )
		});
    return (
      <div className='PreviewRoomList'>{content}</div>
    )
  }

	_replaceString (string = '') {
    return string.slice(0, 200)
	}

}

export default PreviewRoomList
