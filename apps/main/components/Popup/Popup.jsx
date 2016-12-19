import React, { Component, PropTypes } from 'react'
import './Popup.styl'
import XMark from 'icons/xmark.svg'
import LogoIcon from 'icons/logo.svg'

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
      <div className={isActive ? 'Popup -active' : 'Popup'}>
        <div className='Popup-top'>
          <div className='Popup-logo' width='40' height='35'><LogoIcon /></div>
          <div className='Popup-title'>
            <span>{this.props.title}</span>
          </div>
          <div className='Popup-xMark' onClick={this._closePopup.bind(this)}>
            <XMark width='16' height='16'/>
          </div>
        </div>
        <div ref='inner' className='inner'>
          { this.props.children }
				</div>
      </div>
    )
  }

  _closePopup (e) {
    if(e.target === this.refs.inner || e.target.closest('.Popup-content')){ return false }
    this.setState({isActive: false})
    this.props.toggleState()
  }

}

export default Popup
