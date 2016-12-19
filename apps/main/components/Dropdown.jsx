import React, { Component, PropTypes } from 'react'
import Arrow from 'icons/select-arrow.svg'

class Dropdown extends Component {

  state = {
    isOpened: false,
    options: ['2-х местный эконом', '2-х местный стандарт', '3-х местный стандарт', 'Люкс']
  }

  render () {
    let {isOpened, options} = this.state
    let content = options.map((item, index) => {
      return <div key={index} ref={'option-' + index} className='Dropdown-option' onClick={this._selectItem.bind(this, index)}>{item}</div>
    }) 

    return (
      <div className={isOpened ? 'Dropdown -open' : 'Dropdown'}>
        <div className='Dropdown-selected' onClick={this._toggleDrop.bind(this)}>
          <span ref='selected'>Выберите тип номера</span> <Arrow />
          <input className='Dropdown-input' ref='input' type='text' />
        </div>
        <div className='Dropdown-content'>
          {content}
        </div>
      </div>
    )
  }

  _toggleDrop () {
    this.setState({isOpened: !this.state.isOpened})
  }

  _selectItem = (index) => {
    let { input, selected } = this.refs
    let optinName = 'option-' + index
    let _currentOption = this.refs[optinName]

    selected.textContent = _currentOption.textContent
    input.value = _currentOption.textContent

    this._toggleDrop()
  }
}

export default Dropdown
