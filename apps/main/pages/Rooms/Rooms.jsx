import React, { Component, PropTypes } from 'react'
import { Footer, Header, Popup } from './../../components'
import { RoomList, AddRoom } from './components'
import './Rooms.styl'

class Rooms extends Component {

  state = {
    isPopup: false
  }

  render () {
    let { isPopup } = this.state

    return (
      <div className='Rooms'>
        { isPopup && <Popup toggleState={this.toggleState} title='Создать карточку номера'><AddRoom /></Popup> }
        <Header path={this.props.route.path} />
        <a className='Admin-btn' onClick={this.toggleState}>Добавить комнату</a>
				<div className='_content'>
					<RoomList />
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
