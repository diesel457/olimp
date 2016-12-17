import React, { Component, PropTypes } from 'react'

class ImageList extends Component {
  render () {
    let {images} = this.props
    let imageList = images.map((item, index) => {return (
      <div className='AddRoom-imagePreview' key={index}>
        <img src={item.path} />
        <div className='AddRoom-delete' onClick={this.props.deleteImg.bind(this, index)}>×</div>
      </div>
    )})

		return(
      <div className='AddRoom-form-row'>{imageList}</div>
		)
  }
}

export default ImageList
