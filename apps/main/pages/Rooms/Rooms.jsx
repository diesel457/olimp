import React, { Component, PropTypes } from 'react'
import { Footer, Header, Popup } from './../../components'
import { RoomList, AddRoom } from './components'
import './Rooms.styl'
import Subscribe from 'lib/Subscribe'

@Subscribe((props) => {
  return {
    cards: ['cards', {}]
  }
})

class Rooms extends Component {

  state = {
    isPopup: false
  }

  render () {
    let { isPopup } = this.state
    let { cards } = this.props
    return (
      <div className='Rooms'>
        { isPopup && <Popup toggleState={this.toggleState} title='Создать карточку номера'><AddRoom /></Popup> }
        <Header path={this.props.route.path} />
        <a className='Admin-btn' onClick={this.toggleState}>Добавить комнату</a>
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
