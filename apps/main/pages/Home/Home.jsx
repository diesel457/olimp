import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import './Home.styl'
import { Slider, AboutBox, GalleryPreview } from './components'

class Home extends Component {

  render () {
    return (
      <div className='Home'>
        <Header />
      </div>
    )
  }
}

export default Home
