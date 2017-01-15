import React, { Component, PropTypes } from 'react'
import './TopAdmin.styl'
import { model } from 'lib'

class TopAdmin extends Component {

  constructor (props) {
    super()
    this.state = {
      isAdmin: model.get('_session.isAdmin')
    }
  }

  render () {
    let {isAdmin} = this.state
    return (
      <div className={isAdmin ? 'TopAdmin' : 'TopAdmin-hide'}>
        <span className=''>Здравствуйте, Алексей.</span>
        <span className='TopAdmin-separator'>|</span>
				<a className='' href='/logout'>Сменить логин и пароль</a>
        <span className='TopAdmin-separator'>|</span>
        <a className='' href='/logout'>Выйти</a>
      </div>

    )
  }

}

export default TopAdmin
