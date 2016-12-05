import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import './Home.styl'
import { Slider, AboutBox, GalleryPreview } from './components'

class Home extends Component {

  render () {
    return (
      <div className='Home'>
        <Header />
        <div className='_content'>

          <div className='_row'>
          <Slider />
          <AboutBox />
          </div>

          <div className='_row'>
          <GalleryPreview />
          </div>

        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
