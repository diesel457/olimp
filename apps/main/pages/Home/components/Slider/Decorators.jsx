import React, { Component, PropTypes } from 'react'
import ArrowLeft from 'icons/arrow-left.svg'
import ArrowRight from 'icons/arrow-right.svg'
let Decorators = [
	{
		component: React.createClass({
			render() {
				return (
					<button
						style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround)}
						onClick={this.handleClick}><ArrowRight /></button>
				)
			},
			handleClick(e) {
				e.preventDefault();
				this.props.nextSlide();
			},
			getButtonStyles(disabled) {
				return {
					background: 'transparent',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					marginRight: '25px'
				}
			}
		}),
		position: 'CenterRight'
	},
	{
		component: React.createClass({
			render() {
				return (
					<button
						style={this.getButtonStyles(this.props.currentSlide + this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround)}
						onClick={this.handleClick}><ArrowLeft /></button>
				)
			},
			handleClick(e) {
				e.preventDefault();
				this.props.previousSlide();
			},
			getButtonStyles(disabled) {
				return {
					background: 'transparent',
					border: 'none',
					outline: 'none',
					cursor: 'pointer',
					marginLeft: '25px'
				}
			}
		}),
		position: 'CenterLeft'
	},
	{
    component: React.createClass({
      render() {
        var self = this;
        var indexes = this.getIndexes(self.props.slideCount, self.props.slidesToScroll);
        return (
          <ul style={self.getListStyles()}>
            {
              indexes.map(function(index) {
                return (
                  <li style={self.getListItemStyles()} key={index}>
                    <button className={self.props.currentSlide === index ? 'Slider-active' : ''} style={self.getButtonStyles(self.props.currentSlide === index)} onClick={self.props.goToSlide.bind(null, index)}>
                      &bull;
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      },
      getIndexes(count, inc) {
        var arr = [];
        for (var i = 0; i < count; i += inc) {
          arr.push(i);
        }
        return arr;
      },
      getListStyles() {
        return {
          position: 'relative',
          margin: 0,
          top: -10,
          padding: 0
        }
      },
      getListItemStyles() {
        return {
          listStyleType: 'none',
          display: 'inline-block',
					width: '56px',
					textAlign: 'center'
        }
      },
      getButtonStyles(active) {
        return {
          border: 0,
          background: 'transparent',
          color: 'white',
          cursor: 'pointer',
          padding: 10,
          outline: 0,
          fontSize: 24
        }
      }
    }),
    position: 'BottomRight'
  }
]

export default Decorators
