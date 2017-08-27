import React, { Component } from 'react'
import './App.css'
class ImgFigure extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse(this.props.index)
    } else {
      this.props.center(this.props.index)
    }

    e.stopPropagation()
    e.preventDefault()
  }

  render () {
    let styleObj = {}
    // 如果props属性中指定了这张图片的位置，则使用
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }

    // 如果图片的旋转角度有值并且不为0， 添加旋转角度
    if (this.props.arrange.rotate) {
      (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)'
      }.bind(this))
    }

    let imgFigureClassName = 'img-figure'
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : ''

    // 如果是居中的图片， z-index设为11
    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    return (
      <figure
        style={styleObj}
        className={imgFigureClassName}
        onClick={this.handleClick}>
        <img
          src={this.props.data.imgUrl}
          alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default ImgFigure
