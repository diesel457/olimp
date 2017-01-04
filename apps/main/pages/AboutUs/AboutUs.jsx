import React, { Component, PropTypes } from 'react'
import { Footer, Header } from './../../components'
import './AboutUs.styl'

class AboutUs extends Component {

  render () {
    return (
      <div className='AboutUs'>
        <Header path={this.props.route.path} />
        <div className='Content'>About Us</div>
				<Footer path={this.props.route.path} />
      </div>
    )
  }
}

export default AboutUs
