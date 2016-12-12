import React, { Component, PropTypes } from 'react'
import './PreviewRoomList.styl'
class PreviewRoomList extends Component {

  static contextTypes = {
    model: PropTypes.object
  }

  render () {
    return (
      <div className='PreviewRoomList'>
        <div className='PreviewRoomList-item'>
          <img className='PreviewRoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='PreviewRoomList-item-bottom'>
            <div className='PreviewRoomList-item-name'>2-х местный эконом</div>
            <div className='PreviewRoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='PreviewRoomList-item-price'>1500 руб/сутки</div>
          </div>
        </div>
        <div className='PreviewRoomList-item'>
          <img className='PreviewRoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='PreviewRoomList-item-bottom'>
            <div className='PreviewRoomList-item-name'>2-х местный стандарт</div>
            <div className='PreviewRoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='PreviewRoomList-item-price'>2200 руб/сутки</div>
          </div>
        </div>
        <div className='PreviewRoomList-item'>
          <img className='PreviewRoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='PreviewRoomList-item-bottom'>
            <div className='PreviewRoomList-item-name'>3-х местный стандарт</div>
            <div className='PreviewRoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='PreviewRoomList-item-price'>2300 руб/сутки</div>
          </div>
        </div>
        <div className='PreviewRoomList-item'>
          <img className='PreviewRoomList-item-img' src='/img/room-img-first.jpg' />
          <div className='PreviewRoomList-item-bottom'>
            <div className='PreviewRoomList-item-name'>Люкс</div>
            <div className='PreviewRoomList-item-description'>
              Относительная погрешность небе-зынтересно программирует инте-грал от функции, обращающейся
              в бесконечность в изолированной точке максимума
            </div>
            <div className='PreviewRoomList-item-price'>3000 руб/сутки</div>
          </div>
        </div>
      </div>
    )
  }

}

export default PreviewRoomList
