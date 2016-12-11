import React, { Component, PropTypes } from 'react'
import { Footer, Header, Popup } from './../../components'
import './Home.styl'
import { Slider, AboutBox, GalleryPreview, RoomList } from './components'

class Home extends Component {

	state = {
		isPopup: false
	}

  render () {
		let { isPopup } = this.state
    return (
      <div className='Home'>
				{ isPopup && <Popup toggleState={this.toggleState} /> }
        <Header path={this.props.route.path} />
				<div className='_content'>
					<div className='_row Home-slider'>
						<Slider toggleState={this.toggleState}/>
						<AboutBox />
					</div>
					<div id='second_box' className='_row'>
						<GalleryPreview />
						<RoomList />
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
