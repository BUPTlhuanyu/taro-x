// TODO：loading需要细分

import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import AtComponent from '../../common/component'

import {IProps} from 'types/loading'
  
export default class AtLoading extends AtComponent<IProps> {
  static defaultProps: IProps
  constructor (props: IProps) {
    super(props)
    if (process.env.NODE_ENV === 'test') {
      Taro.initPxTransform({ designWidth: 750, deviceRatio: {} })
    }
  }

  render () {
    const { color } = this.props
    const size = Number(this.props.size)
    let left, top, originL, originR, width, height, loadWidth, loadHeight, ringStyle
    if(size){
      width = size;
      height = 2.5*size;
      originL = size/2;
      originR = 1.8*height;
      left = 60;
      top = 26;
      loadWidth = originL + originR + 10 + left;
      loadHeight = 2 * (originR + top); 
      ringStyle = {
        width: `${Taro.pxTransform(width)}`,
        height: `${Taro.pxTransform(height)}`,
        transformOrigin: `${Taro.pxTransform(originL)} ${Taro.pxTransform(originR)}`,
        left: `${Taro.pxTransform(left)}`,
        top: `${Taro.pxTransform(top)}`
      }
    }
    ringStyle = Object.assign({}, ringStyle, {background: color || ''})
    const loadingSizeStyle = {
      width: `${Taro.pxTransform(loadWidth)}`,
      height: `${Taro.pxTransform(loadHeight)}`,
    }
    

    return (
      <View className="at-loading-spinner" style={loadingSizeStyle} >
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
        <View className="at-loading-spinner-item" style={ringStyle}></View>
    </View>
    )
  }
}

AtLoading.defaultProps = {
  size: 0,
  color: '',
}
