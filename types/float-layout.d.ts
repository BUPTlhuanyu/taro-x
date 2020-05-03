/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:24:57
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-03 09:29:20
 */
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  // title: string,
  isOpened: boolean,
  onClose: () => void,
  onScroll: CommonEventFunction,
  onScrollToLower: CommonEventFunction,
  onScrollToUpper: CommonEventFunction,
  renderHeader: any
}

export interface IState{
  _isOpened: boolean
}

declare const AtFloatLayout: ComponentClass<IProps, IState>

export default AtFloatLayout