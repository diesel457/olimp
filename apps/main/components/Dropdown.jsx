import React, { Component, PropTypes } from 'react'
import Arrow from 'icons/select-arrow.svg'

class Dropdown extends Component {

  state = {
    isOpened: false,
    options: [
      {
        value: '2simple',
        option: '2-х местный эконом'
      },
      {
        value: '2standart',
        option: '2-х местный стандарт'
      },
      {
        value: '3standart',
        option: '3-х местный стандарт'
      },
      {
        value: 'lux',
        option: 'Люкс'
      }
    ]
  }

  render () {
    let {isOpened, options} = this.state
    let content = options.map((item, index) => {
      return <div key={index} className='Dropdown-option' onClick={this._selectItem.bind(this, index)}>{item.option}</div>
    }) 

    return (
      <div className={isOpened ? 'Dropdown -open' : 'Dropdown'}>
        <div className='Dropdown-selected' onClick={this._toggleDrop.bind(this)}>
          <span ref='selected'>Выберите тип номера</span> <Arrow />
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

    let { selected } = this.refs
    let { options } = this.state
    let _currentSelect = options[index]

    selected.textContent = _currentSelect.option
    this.props.change(_currentSelect.value)

    this._toggleDrop()
  }
}

export default Dropdown
