import React, { Component, PropTypes } from 'react'
import { Footer, Header, Popup } from './../../components'
import { RoomList, AddRoom } from './components'
import './Rooms.styl'
import Subscribe from 'lib/Subscribe'
import { model } from 'lib'

@Subscribe((props) => {
  return {
    cards: ['cards', {}]
  }
})

class Rooms extends Component {
  constructor (props){
    super()
    this.state = {
      isPopup: false,
      isAdmin: model.get('_session.isAdmin') || false
    }
  }

  render () {
    let { isPopup, isAdmin } = this.state
    let { cards } = this.props
    return (
      <div className='Rooms'>
        { isPopup && <Popup toggleState={this.toggleState} title='Создать карточку номера'><AddRoom submit='Создать карточку' /></Popup> }
        <Header path={this.props.route.path} />
        {isAdmin && <a className='Admin-btn' onClick={this.toggleState}>Добавить комнату</a>}
				<div className='_content'>
					<RoomList cards={cards}/>
				</div>
        <Footer path={this.props.route.path} />
      </div>
    )
  }

  toggleState = () => {
		this.setState({isPopup: !this.state.isPopup})
	}
}

export default Rooms
