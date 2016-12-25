import React, { Component, PropTypes } from 'react'
import './Promo.styl'

class Promo extends Component {

  render () {
    return (
      <div className='Promo'>
				<form action="/api/login" method="post">
          <div>
            <label>Username:</label>
            <input type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password"/>
          </div>
          <div>
            <input type="submit" value="Log In"/>
          </div>
        </form>

      </div>
    )
  }

}

export default Promo
