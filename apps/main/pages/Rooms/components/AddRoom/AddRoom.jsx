import React, { Component, PropTypes } from 'react'
import './AddRoom.styl'
import model from 'lib/model'
import superagent from 'superagent'
import ImageList from './ImageList.jsx'

class AddRoom extends Component {
  state = {
    process: 0,
    images: []
  }

  componentWillUnmount () {
    this._deleteImage()
  }

  render () {
    let { process, images } = this.state

    return (
      <div className='AddRoom'>
        <div className='AddRoom-content'>
          <div className='AddRoom-form'>

            <div className='AddRoom-form-row'>
              <label htmlFor='input1'>Загрузить фотографию карточки комнаты</label>
              <input id='input1' type='file' ref='photo' onChange={this._uploadPhoto.bind(this)}/>
            </div>

            {!!images.length && <ImageList images={images} deleteImg={this._deleteImage}/>}

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
      }
    }
  }

  _createCard () {
    let {title, price, description} = this.refs
    let cardObject = {
      title: title.value,
      price: price.value,
      description: description.value
    }
    if(!cardObject.title || !cardObject.price || !cardObject.description){return}
    model.add('cards', cardObject, () =>{
      window.location.pathname = '/rooms'
    })
  }

  _onProgress (e) {
    this.setState({process: e.loaded / e.total * 100})
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
