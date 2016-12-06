import React, { Component, PropTypes } from 'react'
import { Header } from './../../components'
import { Slider, AboutBox, GalleryPreview, RoomList } from './components'

class Home extends Component {

  static contextTypes = {
    model: PropTypes.object
  }
  
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
            <RoomList />
          </div>

        </div>
      </div>
    )
  }
}

export default Home
