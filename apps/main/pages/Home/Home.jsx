import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import './Home.styl'
import { Slider, AboutBox, GalleryPreview, RoomList } from './components'
import {model} from 'lib'

class Home extends Component {

	state = {
		d: ''
	}

	componentDidMount (){
		this.setState({d: 1})
	}

  render () {
		let {d} = this.state
    return (
      <div className='Home'>
        <Header />
				<div className='_content'>
					<div className='_row Home-slider'>
						<Slider />
						<AboutBox />
					</div>
					<div id='second_box' className='_row'>
						<GalleryPreview />
						<RoomList />
					</div>
				</div>
				<Footer />
      </div>
    )
  }

}

export default Home
