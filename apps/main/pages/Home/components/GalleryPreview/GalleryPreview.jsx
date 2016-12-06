import React, { Component, PropTypes } from 'react'

class GalleryPreview extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div className='GalleryPreview'>
        <a className='GalleryPreview-link' href='#'>Перейти в галлерею</a>
      </div>
    )
  }

}

export default GalleryPreview
