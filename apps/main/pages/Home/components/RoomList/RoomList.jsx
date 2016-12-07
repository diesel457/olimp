import React, { Component, PropTypes } from 'react'
import './RoomList.styl'
class RoomList extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div className='RoomList'>
        <div className='RoomList-item'>
          <img className='RoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='RoomList-item-bottom'>
            <div className='RoomList-item-name'>2-х местный эконом</div>
            <div className='RoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='RoomList-item-price'>1500 руб/сутки</div>
          </div>
        </div>
        <div className='RoomList-item'>
          <img className='RoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='RoomList-item-bottom'>
            <div className='RoomList-item-name'>2-х местный стандарт</div>
            <div className='RoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='RoomList-item-price'>2200 руб/сутки</div>
          </div>
        </div>
        <div className='RoomList-item'>
          <img className='RoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='RoomList-item-bottom'>
            <div className='RoomList-item-name'>3-х местный стандарт</div>
            <div className='RoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='RoomList-item-price'>2300 руб/сутки</div>
          </div>
        </div>
        <div className='RoomList-item'>
          <img className='RoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='RoomList-item-bottom'>
            <div className='RoomList-item-name'>Люкс</div>
            <div className='RoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='RoomList-item-price'>3000 руб/сутки</div>
          </div>
        </div>
      </div>
    )
  }

}

export default RoomList
