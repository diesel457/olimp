import React, { Component, PropTypes } from 'react'
import './Room.styl'

class Room extends Component {

  render () {
    return (
			<div className='Room'>
        <div className='Room-left'><img src='/img/Mask.jpg' /></div>
				<div className='Room-right'>
          <div className='Room-title'>2-х местный эконом</div>
          <div className='Room-description'>
            Прямолинейное равноускоренное движение основания горизонтально
            позволяет пренебречь колебаниями корпуса, хотя этого в любом случае
            требует апериодический момент силы трения. Время набора максимальной
            скорости, несмотря на некоторую погрешность, активно. Отсутствие
            трения вращательно не зависит от скорости вращения внутреннего кольца
            подвеса, что не кажется странным, если вспомнить о том, что мы не
            исключили из рассмотрения центр подвеса.
          </div>
          <div className='Room-price'>1500 руб/сутки</div>
          <button className='Room-btn'>Забронировать</button>
        </div>
      </div>
    )
  }

}

export default Room
