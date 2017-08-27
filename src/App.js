import React, { Component } from 'react'
import './App.css'
import ImgFigure from './ImgFigure'
import { imageData } from './imageData'

class App extends Component {
  constructor (props) {
    super(props)
    this.imgFigures = []
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: { // 水平方向的取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: { // 垂直方向的取值范围
        x: [0, 0],
        topY: [0, 0]
      }
    }
    this.state = {
      imgsArrangeArr: [
        /* {
         pos: {
         left: '0',
         top: '0'
         },
         rotate: 0,    // 旋转角度
         isInverse: false,    // 图片正反面
         isCenter: false,    // 图片是否居中
         } */
      ]
    }
    this.rearrange = this.rearrange.bind(this)
    this.getRangeRandom = this.getRangeRandom.bind(this)
    this.get30DegRandom = this.get30DegRandom.bind(this)
    this.inverse = this.inverse.bind(this)
    this.center = this.center.bind(this)
  }

  /*
   * 获取区间内的一个随机值
   */
  getRangeRandom (low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }

  /*
   * 获取 0~30° 之间的一个任意正负值
   */
  get30DegRandom () {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30))
  }

  componentDidMount () {
    // 首先拿到舞台的大小
    let stageW = this.stage.scrollWidth
    let stageH = this.stage.scrollHeight
    let halfStageW = Math.ceil(stageW / 2)
    let halfStageH = Math.ceil(stageH / 2)

    let imgW = 320
    let imgH = 360
    let halfImgW = Math.ceil(imgW / 2)
    let halfImgH = Math.ceil(imgH / 2)
    // 计算中心图片的位置点
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW
    this.Constant.hPosRange.y[0] = -halfImgH
    this.Constant.hPosRange.y[1] = stageH - halfImgH

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    this.Constant.vPosRange.x[0] = halfStageW - imgW
    this.Constant.vPosRange.x[1] = halfStageW

    let imgsArrangeArr = []
    imageData.map((v) => {
      imgsArrangeArr.push({
        pos: {
          left: 0,
          top: 0
        },
        rotate: 0,
        isInverse: false,
        isCenter: false
      })
    })
    this.setState({
      imgsArrangeArr
    }, () => {
      this.rearrange(0)
    })
  }

  rearrange (centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr
    let Constant = this.Constant
    let centerPos = Constant.centerPos
    let hPosRange = Constant.hPosRange
    let vPosRange = Constant.vPosRange
    let hPosRangeLeftSecX = hPosRange.leftSecX
    let hPosRangeRightSecX = hPosRange.rightSecX
    let hPosRangeY = hPosRange.y
    let vPosRangeTopY = vPosRange.topY
    let vPosRangeX = vPosRange.x

    // 居中
    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1)
    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true
    }

    // 上
    let imgsArrangeTopArr = []
    let topImgNum = Math.floor(Math.random() * 2)
    let topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum))
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum)

    // 布局位于上侧的图片
    imgsArrangeTopArr.forEach((value, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
          left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
        },
        rotate: this.get30DegRandom(),
        isCenter: false
      }
    })

    // 布局左右两侧的图片
    for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      let hPosRangeLORX = null

      // 前半部分布局左边， 右半部分布局右边
      if (i < k) {
        hPosRangeLORX = hPosRangeLeftSecX
      } else {
        hPosRangeLORX = hPosRangeRightSecX
      }

      imgsArrangeArr[i] = {
        pos: {
          top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
          left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate: this.get30DegRandom(),
        isCenter: false
      }
    }

    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }

    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
  }

  inverse (index) {
    let imgsArrangeArr = this.state.imgsArrangeArr
    imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
  }

  center (index) {
    this.rearrange(index)
  }

  render () {
    return (
      <div className="container">
        <section className="stage" ref={(stage) => { this.stage = stage }}>
          <section className="img-sec">
            {
              imageData.map((v, i) => {
                return (
                  <ImgFigure
                    key={i}
                    data={v}
                    index={i}
                    center={this.center}
                    inverse={this.inverse}
                    arrange={this.state.imgsArrangeArr[i] ? this.state.imgsArrangeArr[i] : {}} />
                )
              })
            }
          </section>
          <nav className="controller-nav">
          </nav>
        </section>
      </div>
    )
  }
}

export default App
