import React, { Component, PropTypes } from 'react'
import './AddRoom.styl'
import model from 'lib/model'
import superagent from 'superagent'
import ImageList from './ImageList.jsx'
import Dropdown from '../../../../components/Dropdown'

class AddRoom extends Component {
  state = {
    progress: 0,
    images: [],
    selectedValue: null
  }

  componentWillUnmount () {
    this._deleteImage()
  }

  render () {
    let { progress, images } = this.state

    return (
      <div className='AddRoom'>
        <div className='AddRoom-content'>
          <div className='AddRoom-form'>

            <Dropdown change={this._setSelectedValue}/>

            <div className='AddRoom-form-row'>
              <label htmlFor='input1'>Загрузить фотографию карточки комнаты</label>
              <input id='input1' type='file' ref='photo' onChange={this._uploadPhoto.bind(this)}/>
            </div>

            {!!images.length && <ImageList images={images} deleteImg={this._deleteImage} progress={progress}/>}

  					<div className='AddRoom-form-row'>
              <label htmlFor='input2'>Заголовок карточки комнаты</label>
              <input id='input2' type='text' ref='title'/>
            </div>

            <div className='AddRoom-form-row'>
              <label htmlFor='input3'>Прайс карточки комнаты</label>
              <input id='input3' type='number' ref='price'/>
            </div>

            <div className='AddRoom-form-row -textarea'>
              <label htmlFor='input4'>Описание карточки комнаты</label>
              <textarea id='input4' ref='description'></textarea>
            </div>

						<div className='AddRoom-form-row -clear'>
	            <button className='AddRoom-form-submit' onClick={this._createCard.bind(this)}>Создать</button>
	          </div>

  				</div>
        </div>
      </div>
    )
  }

  _uploadPhoto () {
    let file = this.refs.photo.files[0]
    let formData = new FormData()
    let xhr = new XMLHttpRequest

    formData.append('file', file)

    xhr.open("POST", '/api/upload-photo', true)
    xhr.setRequestHeader("x-file-size", file.size)
    xhr.setRequestHeader("x-data", JSON.stringify({}))
    xhr.upload.addEventListener('progress', this._onProgress.bind(this), false)
    xhr.send(formData)
    xhr.onreadystatechange = () =>{
      if(xhr.readyState != 4){return}
      if(xhr.status != 200){
        alert('Internal server error, try again')
      }else{
        let data = JSON.parse(xhr.responseText)
        let array = this.state.images
        array.push(data)
        this.setState({images: array})

        // Should clear value for upload next image
        this.refs.photo.value = ''
        this.setState({progress: 0})
      }
    }
  }

  _createCard () {
		let {images, selectedValue} = this.state
    let {title, price, description} = this.refs
    let cardObject = {
      type: selectedValue,
      images: images,
      title: title.value,
      price: price.value,
      description: description.value
    }

    if(!cardObject.title || !cardObject.price || !cardObject.description || !cardObject.images || !selectedValue){return}

    model.add('cards', cardObject, () => {
      window.location.pathname = '/rooms'
    })
  }

  _onProgress (e) {
    this.setState({progress: e.loaded / e.total * 100})
  }

	_setSelectedValue = (value) => {
    this.setState({selectedValue: value})
  }

  _deleteImage = (index) => {
    let data = {
      images: index ? [this.state.images[index]] : this.state.images
    }
    superagent
      .post('/api/delete-img')
      .send(data)
      .end((err, res) => {
        let splicedArray = this.state.images
        splicedArray.splice(index, 1)
        this.setState({images: splicedArray})
      })
  }

}

export default AddRoom
