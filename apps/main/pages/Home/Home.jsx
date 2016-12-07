import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import './Home.styl'
import { Slider, AboutBox, GalleryPreview, RoomList } from './components'
import {model} from 'lib'

class Home extends Component {

	state = {
		isScrolled: ''
  }

	componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this));
		model.on('change', '_page.asdasdasd', function(dd){
			console.log(dd)
		})
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  render () {
    return (
      <div className='Home'>
        <Header />
				<div className='_content'>
					<div className='_row Home-slider'>
						<a id='anchor' href='#second_box'></a>
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

	handleScroll (e) {
		let spinner = document.getElementById('spinner');
		let windowHeight = window.innerHeight;
		let spinnerBottomPosition = spinner.getBoundingClientRect().bottom;
		let wrapper = document.querySelector('.Home-slider');
		let header = document.querySelector('.Header');
		let anchor = document.getElementById('anchor');

		if(Math.floor(spinnerBottomPosition) <= windowHeight){
			wrapper.classList.add('-noFixed');
			header.classList.add('-noFixed');
			spinner.style.top = 'auto'
			model.set('_page.asdasdasd', true)
		}else{
			wrapper.classList.remove('-noFixed');
			header.classList.remove('-noFixed');
			spinner.style.top = -window.pageYOffset + 'px'
		}
	}

}

export default Home
