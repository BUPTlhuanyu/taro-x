/* eslint-disable taro/function-naming */
// 隐藏bug： touch事件多端实现是不同的，目前微信和h5是没问题的

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

import './index.scss'


const VIRTUAL_LIST_NUM = 5 // 标记得位置上方渲染得数量以及下方渲染的数量
const ABOVE_INDICATOR_LINES = 3 // picker__group__indicator元素上面行数，列表最大可以向下滑动的行数
const LINE_HEIGHT = 40
const TOP = ABOVE_INDICATOR_LINES * LINE_HEIGHT // picker__group__indicator元素上面行数的高度,列表最大可以向下滑动的高度
// const MASK_TOP_WINDOW_BOTTOM = LINE_HEIGHT * 5 + 12
// const MASK_BOTTOM_WINDOW_BOTTOM = LINE_HEIGHT * 4 + 12
const PICKER_GROUP_PADDING_BOTTOM = 12
const INDICATOR_CENTER_WINDOW_BOTTOM = LINE_HEIGHT * 3.5 + PICKER_GROUP_PADDING_BOTTOM




import AtComponent from '../../../common/component'
import { IPickerGroupProps, IPickerGroupState } from 'types/picker'
import { TouchEvent } from 'react'


export default class PickerGroup extends AtComponent<IPickerGroupProps, IPickerGroupState> {
  index: number  // 中间放大
  startY: number
  preY: number
  hadMove: boolean
  touchEnd: boolean
  static defaultProps: IPickerGroupProps
  constructor (props) {
    super(...arguments)
    this.index = props.index   // 中间放大，一开始应该是第四个列表项为放大的
    this.state = {
      height: - LINE_HEIGHT * (this.index - ABOVE_INDICATOR_LINES) 
    }
  }

  componentWillReceiveProps(nextProps){
    // 在index变化的时候，需要更新滚动的高度，显示正确的item
    this.touchEnd = false
    this.index = nextProps.index
    this.setState({
      height: - LINE_HEIGHT * (this.index - ABOVE_INDICATOR_LINES) 
    })
  }

  getPosition (aboveHeight: string, belowHeight: string) {
    // @ts-ignore
    const transition = this.touchEnd ? 0.3 : 0
    return `padding: ${aboveHeight} 0px ${belowHeight};transform: translate3d(0, ${
      // @ts-ignore
      this.state.height 
    }px, 0);transition: transform ${transition}s;`
  }

  render () {
    
    const onTouchStart = e => {
      console.log('eeee', e)
      // 记录第一次的点击位置
      this.startY = e.changedTouches[0].clientY
      this.preY = e.changedTouches[0].clientY
      this.hadMove = false
    }

    const onTouchMove = e => {
       /**
        * 实时缩放
        */
      // 当前高度
      const {height} = this.state
      // 列表中滑动到标记位置的列表项的index
      this.index = Math.round(height / -LINE_HEIGHT) + 3

    
      // 当滑动的时候，记录此时手指的位置
      const y = e.changedTouches[0].clientY
      // 滑动的距离
      const deltaY = y - this.preY
      // 将当前滑动的位置记录下来，作为下一次滑动时间中上一次的位置
      this.preY = y
      // 滑动是否结束
      this.touchEnd = false
      // 滑动距离大于10才算滑动
      if (Math.abs(y - this.startY) > 10) this.hadMove = true


      // 新的坐标位置
      // let newPos = this.state.height + deltaY
      this.setState((prev) => {
        return {
          height: prev.height + deltaY
        }
      })
      // this.props.updateHeight(newPos, this.props.columnId)

      e.preventDefault()
    }

    const onTouchEnd = e => {
      e.preventDefault()
      const {height} = this.state
      const {range} = this.props
      const max = TOP // 列表最大可以往下滑动的高度
      const min = -LINE_HEIGHT * (range.length - 1) + TOP // 列表最大可以往上滑动的高度的负值
      const endY = e.changedTouches[0].clientY
      this.touchEnd = true

      console.log('max', max, 'min', min);
      
      // touchEnd 时的高度，可能带小数点，需要再处理
      let absoluteHeight
      if (!this.hadMove) {
        /** 点击 */
        // 屏幕高度
        let windowHeight
        if(process.env.TARO_ENV === 'h5'){
           windowHeight = window.innerHeight
        }else{
           windowHeight = Taro.getSystemInfoSync().windowHeight;
        }
        // picker__mask 垂直方向距离屏幕顶部的高度
        const relativeY = windowHeight - endY // 算出点击区域距离屏幕底部的距离
        absoluteHeight = height + (relativeY - INDICATOR_CENTER_WINDOW_BOTTOM) //当前的高度需要加上 点击区域距离标记区域中线的距离
      } else {
        /** 滚动 */
        absoluteHeight = height 
      }
      
      // console.log('absoluteHeight', absoluteHeight);
      // 边界情况处理
      if (absoluteHeight > max) absoluteHeight = max
      if (absoluteHeight < min) absoluteHeight = min 
      // 先按公式算出 index, 再用此 index 算出一个整数高度
      const index = Math.round(absoluteHeight / -LINE_HEIGHT) // 四舍五入
      const relativeHeight =  - LINE_HEIGHT * index 
      
      // @ts-ignore
      this.index = index + 3
      
      this.setState({
        height: relativeHeight
      })
    }
    const len = this.props.range.length
    const start = this.index - VIRTUAL_LIST_NUM > 0 ? this.index - VIRTUAL_LIST_NUM : 0
    const end = this.index + VIRTUAL_LIST_NUM < len ? this.index + VIRTUAL_LIST_NUM : len - 1
    const aboveHeight = start * LINE_HEIGHT + 'px'
    const belowHeight = (len - end) * LINE_HEIGHT + 'px'
    // const range = this.props.range || []
    const range = this.props.range.slice( start , end + 1 ) || []
    // console.log('range.length', start, end, range.length)
    const pickerItem = range.map((item, index) => {
      let style = {transform: 'scale(1)'}
      // console.log('pickerItem', this.index, start, index)
      // @ts-ignore
      if(this.index === start + index){
        style = {transform: 'scale(1.2)'}
      }
      return <View className='picker__group__content__item' style={style} >{item}</View>
    })
    
    // header
    return (
      <View
        className='picker__group'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <View className='picker__group__mask'/>
        <View className='picker__group__indicator' />
        <View className='picker__group__content' style={this.getPosition(aboveHeight, belowHeight)}>
          {/* <View style={{height: aboveHeight}}></View> */}
          {pickerItem}
          {/* <View style={{height: belowHeight}}></View> */}
        </View>
      </View>
    )
  }
}

PickerGroup.defaultProps = {
  range: [],
  index: 0
}