import React, { Component, PropTypes } from 'react'
import './GalleryPreview.styl'

class GalleryPreview extends Component {

  render () {
    return (
      <div className='GalleryPreview'>
        <a className='GalleryPreview-link' href='#'>Перейти в галлерею</a>
      </div>
    )
  }

}

export default GalleryPreview
