import React, { Component, PropTypes } from 'react'
import './AddRoom.styl'
import model from 'lib/model'
import superagent from 'superagent'
import ImageList from './ImageList.jsx'
import Dropdown from '../../../../components/Dropdown'

class AddRoom extends Component {

	constructor(props) {
    super()
    this.state = {
      progress: 0,
      images: props.data && props.data.images || [],
      cardId: props.data && props.data.id || false,
      selectedValue: props.data && props.data.type || null,
      title: props.data && props.data.title || '',
      description: props.data && props.data.description || '',
      price: props.data && props.data.price || ''
    }
	}

  componentWillUnmount() {
    let {cardId} = this.state
    let existCard = model.get(`cards.${cardId}`)
    if(!existCard) this._deleteImage()
  }

  render () {
    let { progress, images, title, price, description, cardId, selectedValue } = this.state
    return (
      <div className='AddRoom'>
        <div className='AddRoom-content'>
          <div className='AddRoom-form'>

            <Dropdown change={this._setSelectedValue} currentIndex={selectedValue}/>

            <div className='AddRoom-form-row'>
              <label htmlFor='input1'>Загрузить фотографию карточки комнаты</label>
              <input id='input1' type='file' ref='photo'
                onChange={this._uploadPhoto.bind(this)}
                disabled={images.length >= 5 && 'disabled'}/>
            </div>

            {!!images.length && <ImageList images={images} deleteImg={this._deleteImage} progress={progress}/>}

  					<div className='AddRoom-form-row'>
              <label htmlFor='input2'>Заголовок карточки комнаты</label>
              <input id='input2' type='text' ref='title'
                onChange={this._changeTitle} value={title}/>
            </div>

            <div className='AddRoom-form-row'>
              <label htmlFor='input3'>Прайс карточки комнаты</label>
              <input id='input3' type='number' ref='price'
                onChange={this._changePrice} value={price}/>
            </div>

            <div className='AddRoom-form-row -textarea'>
              <label htmlFor='input4'>Описание карточки комнаты</label>
              <textarea id='input4' ref='description'
                onChange={this._changeDescription} value={description}></textarea>
            </div>

						<div className='AddRoom-form-row -clear'>
	            <button className='AddRoom-form-submit' onClick={this._createCard.bind(this, cardId)}>{this.props.submit}</button>
	          </div>

  				</div>
        </div>
      </div>
    )
  }

  _changeTitle = (e) => {
    this.setState({title: e.target.value})
  }

  _changePrice = (e) => {
    this.setState({price: e.target.value})
  }

  _changeDescription = (e) => {
    this.setState({description: e.target.value})
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

  _createCard (cardId) {
		let {images, selectedValue} = this.state
    let {title, price, description} = this.refs
    let cardObject = {
      type: selectedValue,
      images: images,
      title: title.value,
      price: price.value,
      description: description.value
    }

    if(!cardObject.title || !cardObject.price || !cardObject.description || !cardObject.images || !selectedValue || !cardObject.images.length){return}
    console.log(cardId)
    if(cardId){
      model.set(`cards.${cardId}`, cardObject, () => {
        window.location.pathname = '/rooms'
      })
    }else{
      model.add('cards', cardObject, () => {
        window.location.pathname = '/rooms'
      })
    }
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
      .post('/api/delete-photo')
      .send(data)
      .end((err, res) => {
        let splicedArray = this.state.images
        splicedArray.splice(index, 1)
        this.setState({images: splicedArray})
      })
  }

}

export default AddRoom
