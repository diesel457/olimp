import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import { model, Subscribe } from 'lib'
import './AboutUs.styl'

@Subscribe((props) => {
  return {
    about: ['about', {}]
  }
})

class AboutUs extends Component {

  constructor (props) {
    super()
    this.state = {
      content: props.about[0] && props.about[0].content,
      isEdit: false
    }
  }

  componentDidMount () {
    this._setHtml(this.props.about)
  }

  render () {
    let { content = '', isEdit } = this.state
    return (
      <div className='AboutUs'>
        <Header path={this.props.route.path} />
        <div className='Content'>
          <div className='AboutUs-inner'>
            {!isEdit && <a className='Admin-edit' onClick={this._goEdit.bind(this)}>Edit&nbsp;&darr;</a>}
            <div ref='htmlRender' className={!isEdit ? 'AboutUs-html' : 'AboutUs-html -hide'}></div>
            <div className={isEdit ? 'AboutUs-editBox' : 'AboutUs-editBox -hide'}>
              <textarea ref='edit'
                className='AboutUs-editable'
                value={content}
                onChange={this._changeArea}></textarea>
              <button className='Admin-btn' onClick={this._save.bind(this)}>Сохранить</button>
            </div>
          </div>
        </div>
        <Footer path={this.props.route.path} />
      </div>
    )
  }

  _goEdit () {
    this.setState({isEdit: true})
  }

  _setHtml = (about) => {
    let _content = about[0] && about[0].content
    if(!_content) return false;
    let { htmlRender } = this.refs
    htmlRender.innerHTML = _content
  }

  _changeArea (e) {
    this.setState({content: e.target.value})
  }

  _save () {
    let { edit } = this.refs
    if(!edit.value) return false;

    let { about } = this.props
    let _about = about[0]

    let _content = {
      content: edit.value
    }

    if(!_about){
      model.add('about', _content, () =>{
        window.location.pathname = '/about'
      })
    }else{
      model.set(`about.${_about.id}`, _content, () =>{
        window.location.pathname = '/about'
      })
    }

  }
}

export default AboutUs
