import React, { Component } from 'react'
import './Room.styl'
import Popup from '../../../../components/Popup'
import BookingRoom from '../BookingRoom'
import AddRoom from '../AddRoom'
import ArrowLeft from 'icons/arrow-left.svg'
import ArrowRight from 'icons/arrow-right.svg'
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
      isMoreText: data.description && data.description.length < 320 ? false : true,
      moreTextIsActive: false
    }
  }

  componentDidMount () {
    const { data = {} } = this.state
    const el = document.createElement('script')
    const button = document.createElement('button')
    const wrapper = document.getElementById(data.id).querySelector('.Room-crm-article')
    el.id = 'bx24_form_button'
    el['data-skip-moving'] = 'true'
    el.innerHTML = `(function(w,d,u,b){w['Bitrix24FormObject']=b;w[b] = w[b] || function(){arguments[0].ref=u;
      (w[b].forms=w[b].forms||[]).push(arguments[0])};
      if(w[b]['forms']) return;
      var s=d.createElement('script');s.async=1;s.src=u+'?'+(1*new Date());
      var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);
    })(window,document,'https://olimpkrym.bitrix24.ru/bitrix/js/crm/form_loader.js','b24form');

    b24form({'id':'4','lang':'ru','sec':'va6233','type':'button','click':''});`
    button.className = 'Room-btn b24-web-form-popup-btn-4'
    button.innerHTML = 'Забронировать'
    wrapper.appendChild(el)
    wrapper.appendChild(button)
  }

  render () {
    let { isPopup, isEdit, activeImage, isMoreText, data, moreTextIsActive } = this.state
    let images = data.images.map((data, index) => {
      return <img src={data.path} className={activeImage === index && '-active'} key={index} />
    })

    return (
      <div id={data.id} className={moreTextIsActive ? 'Room -showMore' : 'Room' }>
        { isPopup && <Popup title='Забронировать номер' toggleState={this._toggleState}><BookingRoom data={data} /></Popup> }
        { isEdit && <Popup title='Изменить карточку номера' toggleState={this._editCard}><AddRoom data={data} submit='Обновить карточку' /></Popup> }
        <div className='Room-left'>
          <div className='Room-swiper'>
            <div className='Room-swiper-images'>{images}</div>
            {
              images.length > 1 && (
                <div className='Room-swiper-arrows'>
                  <div className='Room-swiper-arrow' onClick={this._changeImage.bind(this, -1)}>
                    <ArrowLeft width='16' height='16' />
                  </div>
                  <div className='Room-swiper-arrow -right' onClick={this._changeImage.bind(this, 1)}>
                    <ArrowRight width='16' height='16' />
                  </div>
                </div>
              )
            }
          </div>
				</div>
        <div className='Room-right'>
          {model.get('_session.isAdmin') && <a className='Admin-edit' onClick={this._editCard.bind(this)}>Edit&nbsp;&darr;</a>}
          <div className='Room-title'>{data.title}</div>
          <div className='Room-description'>
            {this._replaceString(data.description, moreTextIsActive)}
            {isMoreText && !moreTextIsActive && <a className='Room-showMore' onClick={this._showMoreText.bind(this)}>далее...</a>}
            {isMoreText && moreTextIsActive && <a className='Room-showMore' onClick={this._showMoreText.bind(this)}>скрыть...</a>}
          </div>
          <div className='Room-price'>{data.price} руб./сутки</div>
          <article className='crm-article'></article>
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

  _changeImage = (iteration) => {
    let { activeImage, data } = this.state
    if (activeImage === 0 && iteration === -1) return
    if ((data.images.length - 1) === activeImage && iteration === 1) return
    let newState = activeImage + iteration
    this.setState({activeImage: newState})
  }

  _replaceString (string = '', moreTextIsActive) {
    if (string.length < 320 || moreTextIsActive) {
      return string
    } else {
      return string.slice(0, 320)
    }
  }

}

export default Room