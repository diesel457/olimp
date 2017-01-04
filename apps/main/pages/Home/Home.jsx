import React, { Component, PropTypes } from 'react'
import { Footer, Header, Popup } from './../../components'
import './Home.styl'
import { Slider, AboutBox, GalleryPreview, PreviewRoomList, Booking } from './components'

class Home extends Component {

	state = {
		isPopup: false
	}

  render () {
		let { isPopup, selectedValue } = this.state
    return (
      <div className='Home'>
				{ isPopup && <Popup toggleState={this.toggleState} title='Бронирование номеров'><Booking /></Popup> }
        <Header path={this.props.route.path} />
				<div className='Content'>
					<div className='_row Home-slider'>
						<Slider toggleState={this.toggleState}/>
						<AboutBox />
					</div>
					<div id='second_box' className='_row'>
						<GalleryPreview />
						<PreviewRoomList />
					</div>
				</div>
				<Footer path={this.props.route.path} />
      </div>
    )
  }

	toggleState = () => {
    this.setState({isPopup: !this.state.isPopup})
	}

}

export default Home
