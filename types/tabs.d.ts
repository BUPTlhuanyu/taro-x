/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:39:01
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:23:34
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  redTipStyle?: object | string,
  isTest?: boolean,
  height?: string,
  tabDirection?: 'horizontal' | 'vertical',
  current?: number,
  swipeable?: boolean,
  scroll?: boolean,
  animated?: boolean,
  tabList?: any[],
  onClick?: (args?) => void,
  hasRedTip?: boolean,
  redTipIndex?: number,
}

export interface IState{
  _scrollLeft: number,
  _scrollTop: number,
  _scrollIntoView: string
}

declare const AtTabs: ComponentClass<IProps, IState>

export default AtTabs