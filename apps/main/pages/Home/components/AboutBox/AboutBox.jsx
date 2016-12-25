import React, { Component, PropTypes } from 'react'
import './AboutBox.styl'
import WifiIcon from 'icons/wifi.svg'
import TvIcon from 'icons/tv.svg'
import FridgeIcon from 'icons/fridge.svg'
import ShowerIcon from 'icons/shower.svg'
import SafeIcon from 'icons/safe.svg'
import FoodIcon from 'icons/food.svg'
import Subscribe from 'lib/Subscribe'

@Subscribe((props) => {
  return {
    homeAd: ['homeAd', {}]
  }
})

class AboutBox extends Component {

  state = {
    isEdit: false
  }

  render () {
    let {isEdit} = this.state
    let homeAd = this.props.homeAd[0]
    let paragraphs = homeAd.paragraphs || []
    let content = paragraphs.map((p, index) => {
      return(<p key={index}>{p}</p>)
    })

    return (
      <div className='AboutBox'>
				<div id='spinner' className='AboutBox-spinner'>
          <a className='Admin-edit' onClick={this._getEdit.bind(this)}>Edit</a>
          <h2 ref='title'>{homeAd.title}</h2>
          <div className='AboutBox-description-first' ref='descriptionFirst'>{homeAd.subTitle}</div>
          <div className='AboutBox-description-second' ref='descriptionSecond'>
            {content}
          </div>
          {isEdit && <button className='AboutBox-save' onClick={this._saveChanges.bind(this, homeAd.id)}>Сохранить</button>}
        </div>
        <div className='AboutBox-inner'>
          <h2>Доступно для каждого клиента, в каждом номере</h2>
          <div className='AboutBox-items'>
            <div className='AboutBox-item'>
              <WifiIcon width='26' height='19' />
              <span>Wi-Fi</span>
            </div>
            <div className='AboutBox-item'>
              <TvIcon width='28' height='19' />
              <span>Телевизор</span>
            </div>
            <div className='AboutBox-item'>
              <FridgeIcon width='18' height='25' />
              <span>Холодильник</span>
            </div>
            <div className='AboutBox-item'>
              <ShowerIcon width='30' height='24' />
              <span>Санузел</span>
            </div>
            <div className='AboutBox-item'>
              <SafeIcon width='25' height='21' />
              <span>Сейф</span>
            </div>
            <div className='AboutBox-item'>
              <FoodIcon width='18' height='22' />
              <span>Питание</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getEdit () {
    this.setState({isEdit: true})
    let {title, descriptionFirst, descriptionSecond} = this.refs
    let tags = descriptionSecond.querySelectorAll('p')
    title.setAttribute('contenteditable', true)
    descriptionFirst.setAttribute('contenteditable', true)

    for(let i = 0; i < tags.length; i++){
      tags[i].setAttribute('contenteditable', true)
    }

    title.focus()
  }

  _endEdit (){
    for(key in this.refs){
      let el = this.refs[key]
      console.log(el)
      el.setAttribute('contenteditable', false)
    }
  }

  _saveChanges (homeAdId = false) {
    let {title, descriptionFirst, descriptionSecond} = this.refs
    let tags = descriptionSecond.querySelectorAll('p')
    let paragraphs = []

    for(let i = 0; i < tags.length; i++){
      paragraphs.push(tags[i].textContent)
    }

    let homeAdNewFields = {
      title: title.textContent,
      subTitle: descriptionFirst.textContent,
      paragraphs: paragraphs
    }
    if(!homeAdId) return

    model.set(`homeAd.${homeAdId}`, homeAdNewFields, () => {
      this.setState({isEdit: false})
      this._endEdit()
    })
  }

}

export default AboutBox
