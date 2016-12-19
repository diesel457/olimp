import React, { Component, PropTypes } from 'react'

class ImageList extends Component {
  render () {
    let {images, progress} = this.props
    let imageList = images.map((item, index) => {return (
      <div className='AddRoom-imagePreview' key={index}>
        <img src={item.path} />
        <div className='AddRoom-delete' onClick={this.props.deleteImg.bind(this, index)}>×</div>
      </div>
    )})

		return(
      <div className='AddRoom-form-row -imagesList'>
        <div className='AddRoom-imagePreviewList'>{imageList}</div>
        <div className='AddRoom-progress'>{!!progress && progress + '%'}</div>
      </div>
		)
  }
}

export default ImageList
