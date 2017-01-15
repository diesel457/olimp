import React, { Component, PropTypes } from 'react'
import Arrow from 'icons/select-arrow.svg'

class Dropdown extends Component {

  state = {
    isOpened: false,
    currentValueName: '',
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

  componentDidMount () {
    this._getCurrentName(this.props.currentIndex)
  }

  render () {
    let {isOpened, options, currentValueName} = this.state
		let {currentIndex} = this.props
    let content = options.map((item, index) => {
      return <div key={index} className='Dropdown-option' onClick={this._selectItem.bind(this, index)}>{item.option}</div>
    }) 

    return (
      <div className={isOpened ? 'Dropdown -open' : 'Dropdown'}>
        <div className='Dropdown-selected' onClick={this._toggleDrop.bind(this)}>
          <span ref='selected'>{currentValueName || 'Выберите тип номера'}</span> <Arrow />
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

  _getCurrentName (type) {
    let options = this.state.options
    let currentValueName = ''

    for(let i = 0; i < options.length; i++){
      let item = options[i]
      if(item.value === type){
        currentValueName = item.option
        break;
      }
    }

    this.setState({currentValueName: currentValueName})
  }

  _selectItem = (index) => {

    let { selected } = this.refs
    let { options } = this.state
    let _currentSelect = options[index]

    selected.textContent = _currentSelect.option

    if(!!this.props.change) this.props.change(_currentSelect.value)
    if(!!this.props.getNameValue) this.props.getNameValue(_currentSelect.option)

    this._toggleDrop()
  }
}

export default Dropdown
