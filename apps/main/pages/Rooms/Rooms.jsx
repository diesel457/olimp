import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import { RoomList } from './components'
import './Rooms.styl'

class Rooms extends Component {

  render () {
    return (
      <div className='Rooms'>
        <Header path={this.props.route.path} />
				<div className='_content'>
					<RoomList />
				</div>
        <Footer path={this.props.route.path} />
      </div>
    )
  }
}

export default Rooms
