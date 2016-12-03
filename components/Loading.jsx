import React, { Component } from 'react'

class Loading extends Component {
  render () {
    return (
      <div className='Loading' style={style}>
        <img src='/loading.gif' />
      </div>
    )
  }
}

const style = {
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

export default Loading
