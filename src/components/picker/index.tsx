/* eslint-disable taro/function-naming */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

import AtComponent from '../../common/component'
import { handleTouchScroll } from '../../common/utils'

import PickerGroup from './pick-group/index'

import * as dateHandle from './date'

import {IProps, IState} from 'types/picker'
import { CommonEvent } from '@tarojs/components/types/common'

/**
 * bug 2019-12-10： taro #5052
 * 注意在map中所有涉及到this的数据，不能直接写在return的jsx上，需要在map函数中先保存下来，利用闭包的原理解决。所以this.props这些需要先解构
 * createRef创建的ref需要先保存下来，或者用函数创建ref的方式，避免map中jsx的this的丢失。两者的原理一样，闭包。
 */
export default class AtPicker extends AtComponent<IProps, IState> {

  index: Array<any>
  pickerDate: any
  date: Array<any> // 存储了年月日数组


  refYear: Taro.RefObject<any>
  refMonth: Taro.RefObject<any>
  refDay: Taro.RefObject<any>
  static defaultProps: IProps
  constructor (props) {
    super(...arguments)
    const { isOpened } = props
    this.refCreator.call(this)
    this.handlePrpos()
    this.state = {
      _isOpened: isOpened
    }
  }

  /**
   * 在创建组件实例的时候，通过props.fields来动态创建ref
   */

  refCreator = () => {
    const {fields} = this.props
    if(fields === 'year'){
      // @ts-ignore
      this.refYear = Taro.createRef()
    }else if(fields === 'month'){
      // @ts-ignore
      this.refYear = Taro.createRef()
      // @ts-ignore
      this.refMonth = Taro.createRef()
    }else{
      // @ts-ignore
      this.refYear = Taro.createRef()
      // @ts-ignore
      this.refMonth = Taro.createRef()
      // @ts-ignore
      this.refDay = Taro.createRef()
    }
  }

  /**
   * 根据传入的开始时间与结束时间来初始化数据
   */
  handlePrpos(nextProps = this.props){
      let { value } = this.props
      // 开始与结束日期，格式为YYYY-MM-DD
      const { start = '', end = '' } = nextProps

      // 判断选中的日期是否正确
      let _value = dateHandle.verifyDate(value)
      // 判断开始与结束的日期是否正确
      let _start = dateHandle.verifyDate(start)
      let _end = dateHandle.verifyDate(end)
      // 设置默认值
      if (!_value) _value = new Date(new Date().setHours(0, 0, 0, 0)) // 没传值或值的合法性错误默认今天时间
      if (!_start) _start = new Date('1970/01/01')
      if (!_end) _end = new Date('2999/01/01')

      // 时间区间有效性
      if (
        _value.getTime() >= _start.getTime() &&
        _value.getTime() <= _end.getTime()
      ) {
        console.log('_value.getFullYear()', _value.getFullYear());
        console.log('_value.getMonth()', _value.getMonth() + 1);
        console.log('_value.getDate()', _value.getDate());
        this.index = [
          _value.getFullYear(),
          _value.getMonth() + 1,
          _value.getDate()
        ]
        if (
          !this.pickerDate ||
          this.pickerDate._value.getTime() !== _value.getTime() ||
          this.pickerDate._start.getTime() !== _start.getTime() ||
          this.pickerDate._end.getTime() !== _end.getTime()
        ) {
          this.pickerDate = {
            _value,
            _start,
            _end,
            _updateValue: [
              _value.getFullYear(),
              _value.getMonth() + 1,
              _value.getDate()
            ]
          }
        }
      } else {
        throw new Error('Date Interval Error')
      }
      // 获取年月日数组
      this.date = this.getDateArr()
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened } = nextProps

    this.handlePrpos(nextProps)

    if (this.props.isOpened !== isOpened) {
      handleTouchScroll(isOpened)
    }

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      })
    }
  }

  shouldComponentUpdate(nextProps: IProps, netxState: IState){
    if(nextProps.isOpened === this.state._isOpened){
      return false
    }
    return true
  }

  close = () => {
    this.setState({
      _isOpened: false
    })
    this.props.onCancel()
  }

  handleTouchMove = (e: CommonEvent) => {
    e.stopPropagation()
  }

  /**
   * 当点击确认的时候，数据的变化通过ref获取组件实例的index属性，判断是选择的哪个值
   */
  onChange = (e: CommonEvent) => {
    const [year, month, day] = this.date
    const {fields} = this.props
    let value: Array<string> = []
    if(fields === 'day'){
      value = [year[this.refYear.current.index], month[this.refMonth.current.index], day[this.refDay.current.index]]
    }else if(fields === 'month'){
      value = [year[this.refYear.current.index], month[this.refMonth.current.index]]
    }else if(fields === 'year'){
      value = [year[this.refYear.current.index]]
    }
    
    this.props.onChange(value)
  }

  /**
   * 获取时间数组
   */
  getDateRange (begin, end, fields = '') {
    const range: Array<any> = []
    for (let i = begin; i <= end; i++) {
      range.push(`${i}${fields}`)
    }
    return range
  }

  /**
   * 获取月份数组
   */
  getMonthRange (fields = '') {
    let _start = 1
    let _end = 12
    // 获取年份
    if (this.pickerDate._start.getFullYear() === this.pickerDate._end.getFullYear()) {
      // 开始与结束时间是同一年，直接获取月份
      _start = this.pickerDate._start.getMonth() + 1
      _end = this.pickerDate._end.getMonth() + 1
    } else if (this.pickerDate._start.getFullYear() === this.pickerDate._updateValue[0]) {
      _start = this.pickerDate._start.getMonth() + 1
      _end = 12
    } else if (this.pickerDate._end.getFullYear() === this.pickerDate._updateValue[0]) {
      _start = 1
      _end = this.pickerDate._end.getMonth() + 1
    }
    return this.getDateRange(_start, _end, fields)
  }

  /**
   * 获取day数组
   */
  getDayRange (fields = '') {
    let _start = 1
    let _end = dateHandle.getMaxDay(this.pickerDate._updateValue[0], this.pickerDate._updateValue[1])
    if (this.pickerDate._start.getFullYear() === this.pickerDate._updateValue[0] && this.pickerDate._start.getMonth() + 1 === this.pickerDate._updateValue[1]) {
      _start = this.pickerDate._start.getDate()
    }
    if (this.pickerDate._end.getFullYear() === this.pickerDate._updateValue[0] && this.pickerDate._end.getMonth() + 1 === this.pickerDate._updateValue[1]) {
      _end = this.pickerDate._end.getDate()
    }
    return this.getDateRange(_start, _end, fields)
  }  

  /**
   * 根据开始日期到结束日期获取列表数据后，返回PickerGroup组件jsx用于渲染到picker的body上
   */
  getDateArr = () => {
    let {fields} = this.props
    // 获取年份数组
    let year = this.getDateRange(
      this.pickerDate._start.getFullYear(),
      this.pickerDate._end.getFullYear(),
      '年'
    )
    // 获取月份数组，获取日期数组
    let month = this.getMonthRange('月')
    let day = this.getDayRange('日')

    if (fields === 'year') {
      return [year]
    } else if (fields === 'month') {
      return [year, month]
    } else {
      return [year, month, day]
    }
  }  

  render () {
    const { _isOpened } = this.state
    const rootClass = classNames(
      'at-picker',
      {
        'at-picker--active': _isOpened
      },
      this.props.className
    )
    const [year, month, day] = this.date
    let yearIndex = this.pickerDate._updateValue[0] - this.pickerDate._start.getFullYear()
    let monthIndex = this.pickerDate._updateValue[1] - this.pickerDate._start.getMonth() - 1
    let dayIndex = this.pickerDate._updateValue[2] - this.pickerDate._start.getDate()
    console.log('props', this.props.value, 'index', yearIndex, monthIndex, dayIndex)
    // header
    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <View onClick={this.close} className='at-picker__overlay' />
        <View className='at-picker__container picker'>
          <View className='picker-header'>
              <View className='picker-header__btn-close' onClick={this.close} >取消</View>
              <View className='picker-header__btn' >{this.props.children}</View>
              <View className='picker-header__btn-confirm' onClick={this.onChange} >确认</View>
          </View>          
          <View className='picker-body'>
            {
              year && year.length > 0 && <View style={{flex: 1}}><PickerGroup range = {year} ref = {this.refYear} index={yearIndex}/></View>
            }
            {
              month && month.length > 0 && <View style={{flex: 1}}><PickerGroup range = {month} ref = {this.refMonth} index={monthIndex}/></View>
            }            
            {
              day && day.length > 0 && <View style={{flex: 1}}><PickerGroup range = {day} ref = {this.refDay} index={dayIndex}/></View>
            }            
          </View>
        </View>
      </View>
    )
  }
}

AtPicker.defaultProps = {
  isOpened: false,
  value: '',  // 日期值
  start: '',  // 开始时间
  end: '',    // 结束时间
  fields: 'day', // 选择器的粒度
  onChange: ([]) => {},
  onCancel: () => {}
}