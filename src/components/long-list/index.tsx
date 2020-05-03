/* eslint-disable taro/function-naming */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import _isFunction from 'lodash/isFunction'

import AtComponent from '../../common/component'

import {IProps, IState} from 'types/long-list'

/**
 * 这里传入值都是PX，固定高度
 */
export default class AtLongList extends AtComponent<IProps, IState> {
  index: number  // 需要中间放大的元素所在数组的下标
  itemHeight : number // 每行的盒子高度
  top : number // long__list__indicator元素上面行数的高度,列表最大可以向下滑动的高度
  indicatorTopFromWindow: number // 标记的盒子dom元素距离可视区顶端的距离

  indicatorTop: number // 标记位置到列表顶部的距离
  longListMaskStyle: Object // mask的背景size
  longListStyle: Object // 列表组件的样式
  longListIndicatorStyle: Object

  startY: number
  preY: number
  hadMove: boolean
  touchEnd: boolean
  static defaultProps: IProps
  constructor (props) {
    super(...arguments)
    this.handleProps.call(this)
    this.state = {
      height: - this.itemHeight * (this.index - props.aboveIndicatorLines) 
    }
  }

  /**
   * 计算出每个元素的style样式
   * 公式见代码注释
   */
  handleProps(){
    const {
      longListPadding, 
      longListItemPadding, 
      aboveIndicatorLines,
      longListHeight,
      index,
      longListItemLineHeight,
      range
    } = this.props
    // 边界处理，如果需要展示的item不在传入的数组的范围内，小于0标记位置展示下标为0的，如果超出数组返回则展示最后一个
    let len = range.length
    if(index < 0 ){
      this.index = 0
    }else if(index >= len){
      this.index = len -1
    }else{
      this.index = index
    }
   
    this.itemHeight = longListItemPadding * 2 + longListItemLineHeight // 每行盒子行高

    // 处理边界，如果传入的列表组件高度小于aboveIndicatorLines
    if(longListHeight <  ( aboveIndicatorLines + 1 + 1 ) * this.itemHeight){
      throw new Error('请为组件传入一个正确的高度，必须大于 ( aboveIndicatorLines + 1 + 1 ) * this.itemHeight ')
    } 

    this.top = aboveIndicatorLines * this.itemHeight // 列表最大可以往下滑动的高度
    this.indicatorTop = aboveIndicatorLines * this.itemHeight + longListPadding  // 标记位置到列表顶部的距离
    const longListAboveMaskBackgroundSize = aboveIndicatorLines * this.itemHeight + longListItemPadding // 上半部分mask的高度 = 标记位置以上的列表元素数量 * 每个元素高度 + 列表组件的上padding
    const longListBelowMaskBackgroundSize = longListHeight - longListAboveMaskBackgroundSize - this.itemHeight // 下半部分mask的高度 = 传入的列表组件的高度 - 上半部分mask的高度 - 标记位置元素的高度
    this.longListMaskStyle = {backgroundSize: `100% ${longListAboveMaskBackgroundSize}px, 100% ${longListBelowMaskBackgroundSize}px`} // 组装mask的style样式
    this.longListStyle = {padding: `${longListPadding}px 0`, height: `${longListHeight}px`} // 计算列表组件的样式
    this.longListIndicatorStyle = {height: `${this.itemHeight}px`, top: `${this.indicatorTop}px`} // 用于标记的选中元素的dom的style样式
  }

  componentDidMount(){
    // 将选择器的选取范围更改为自定义组件 component 内。
    if(process.env.TARO_ENV === 'h5'){
      const dom = document.querySelector(`#indicator`)
      if (!dom) return
      this.indicatorTopFromWindow = dom.getBoundingClientRect().top
    }else{
      const query = process.env.TARO_ENV === 'weapp' ? Taro.createSelectorQuery().in(this.$scope) : Taro.createSelectorQuery()
      query.select(`#indicator`).boundingClientRect().exec(res => {
        this.indicatorTopFromWindow = res[0].top
      })
    }
  }

  /**
   * 计算整个虚拟列表需要滚动的高度，在滚动结束时会有0.3秒的动画
   */
  getPosition () {
    const transition = this.touchEnd ? 0.3 : 0
    return `transform: translate3d(0, ${
      // @ts-ignore
      this.state.height 
    }px, 0);transition: transform ${transition}s;`
  }

  render () {
    
    /* 触摸开始的事件处理函数 */
    const onTouchStart = e => {
      
      // 记录第一次的触摸的位置
      this.startY = e.changedTouches[0].clientY
      this.preY = e.changedTouches[0].clientY
      // 此时还未滑动，将标记设置为false
      this.hadMove = false
      e.preventDefault()
      e.stopPropagation()
    }

    /* 触摸并滑动事件处理函数,在TouchStart之后的滑动会多次触发TouchMove事件 */
    const onTouchMove = e => {
      // 当前高度
      const {height} = this.state
      // 列表中滑动到标记位置的列表项的index
      this.index = Math.round(height / -this.itemHeight) + 3

    
      // 当滑动的时候，记录此时手指的位置
      const y = e.changedTouches[0].clientY
      // 滑动的距离
      const deltaY = y - this.preY
      // 将当前滑动的位置记录下来，作为下一次滑动时上一次的位置
      this.preY = y
      // 滑动是否结束的标记
      this.touchEnd = false
      // 当前手指的位置距开始触摸的位置的距离大于10才算滑动，将标记设置true，用于onTouchEnd的时候点击进行滚动的处理
      if (Math.abs(y - this.startY) > 10) this.hadMove = true


      // 新的高度：上一次TouchMove的heigh加上这一次的滑动的距离，最终结果会是多个TouchMove滑动的距离加上TouchStart的时候的state.height
      this.setState((prev) => {
        return {
          height: prev.height + deltaY
        }
      })

      e.preventDefault()
      e.stopPropagation()
    }

    const onTouchEnd = e => {
      const {height} = this.state
      const {range, aboveIndicatorLines} = this.props
      const max = this.top // 列表最大可以往下滑动的高度
      const min = -this.itemHeight * (range.length - 1) + this.top // 列表最大可以往上滑动的高度的负值
      const endY = e.changedTouches[0].clientY
      this.touchEnd = true
      
      // 保存当前long__list__content盒子滚动的高度 
      // 滑动的情况下：  等于当前滚动的高度
      // 点击的情况下：  等于当前滚动的高度 + 点击位置距离
      let absoluteHeight
      // 如果滑动距离不够10，那么当作点击，如果滑动距离大于10，则当作滑动
      if (!this.hadMove) {
        // 点击位置距离标记位置的距离，如果点击比标记位置高，则差值为正，然后加到height上
        absoluteHeight = height + (this.indicatorTopFromWindow + this.itemHeight / 2 - endY)
      } else {
        /** 滚动 */
        absoluteHeight = height 
      }
      
      // console.log('absoluteHeight', absoluteHeight);
      // 滚动范围的边界情况处理
      if (absoluteHeight > max) absoluteHeight = max
      if (absoluteHeight < min) absoluteHeight = min 
      // 盒子高度是以列表组件的顶部为基准，下面根据当前long__list__content盒子滚动的高度计算出列表组件顶部第一个item所在总列表中的下标
      const index = Math.round(absoluteHeight / -this.itemHeight) // 四舍五入
      console.log('index', index);
      
      // 计算出滚动的距离，这个距离是以列表组件的顶部为基准
      const relativeHeight =  - this.itemHeight * index 
      
      // 计算出标记的位置显示的item是数组中的第几个
      this.index = index + aboveIndicatorLines 
      
      // 设置滚动的高度
      this.setState({
        height: relativeHeight
      })
      e.preventDefault()
      e.stopPropagation()
    }

    const {
      virtualListNum,  // 需要实际渲染的dom数量： virtualListNum * 2 + 1
      longListItemPadding,  // 长列表组件每行盒子的padding
      longListItemLineHeight, // 长列表组件每行盒子的line-height
      indicatorItemScale
    } = this.props
    const len = this.props.range.length // 列表总长度
    const start = this.index - virtualListNum > 0 ? this.index - virtualListNum : 0 // 实际需要渲染的item的开始下标，如果小于0，则从0开始
    const end = this.index + virtualListNum < len ? this.index + virtualListNum : len - 1 // 实际需要渲染的item的结束下标，如果小于列表总长度，则最后一个下标为列表最后一个
    const aboveHeight = start * this.itemHeight + 'px' // 实际渲染的列表上方需要填充的空白盒子高度
    const belowHeight = (len - end) * this.itemHeight + 'px' // 实际渲染的列表下方需要填充的空白盒子高度
    const range = this.props.range.slice( start , end + 1 ) || [] // 根据start与end筛选出需要实际渲染的列表

    console.log('index', this.index);
    

    /* 构造实际渲染的列表jsx */
    const pickerItem = range.map((item, index) => {
      let style = {transform: 'scale(1)', padding: `${longListItemPadding}px 0`, lineHeight: `${longListItemLineHeight}px`}
      // 此次需要放大展示的item处于总列表的位置this.index = 实际渲染的列表起始位置start + 偏移量index，
      if(this.index === start + index){
        style = {transform: `scale(${indicatorItemScale})`, padding: `${longListItemPadding}px 0`, lineHeight: `${longListItemLineHeight}px`}
      }
      return <View className='long__list__content__item' style={style} >{item}</View>
    })    
    // header
    return (
      <View
        className='long__list'
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style = {this.longListStyle}
      >
        <View className='long__list__mask' style = {this.longListMaskStyle}/>
        <View className='long__list__indicator' id='indicator' style={this.longListIndicatorStyle}/>
        <View className='long__list__content' style={this.getPosition()}>
          <View style={{height: aboveHeight}}></View>
          {pickerItem}
          <View style={{height: belowHeight}}></View>
        </View>
      </View>
    )
  }
}

AtLongList.defaultProps = {
  virtualListNum: 10, // 实际渲染的列数： virtualListNum*2+1
  aboveIndicatorLines: 3, // 放大显示的位置上面存在的列数
  longListHeight: 600, // 容器高度
  longListItemPadding: 8, // 每个item的padding
  longListItemLineHeight: 34, // 每个item的行高

  indicatorItemScale: 1.2,

  longListPadding: 12, // 整个列表的padding

  range: [], // 传入的所有元素数组
  index: 0 // 需要展示的元素下标
}