import React, { Component, PropTypes } from 'react'
import './GalleryPreview.styl'
import GalleryIcon from 'icons/gallery.svg'

class GalleryPreview extends Component {

  render () {
    return (
      <div className='GalleryPreview'>
        <a className='GalleryPreview-link' href='#'>
          Перейти в галлерею
          <GalleryIcon className='GalleryPreview-link-icon' width='28' height='22'/>
        </a>
      </div>
    )
  }

}

export default GalleryPreview
