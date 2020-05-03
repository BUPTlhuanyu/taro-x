/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:29:09
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-03 09:32:07
 */
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  longListHeight: number, // 列表组件的高度
  virtualListNum: number, // 实际渲染的列数： virtualListNum*2+1
  aboveIndicatorLines: number, // 放大显示的位置上面存在的列数
  longListItemPadding: number, // 每个item的padding
  longListItemLineHeight: number, // 每个item的行高

  indicatorItemScale: number,

  longListPadding: number, // 整个列表的padding
  range: Array<any>,
  index: number
}

export interface IState{
  height: number
}

declare const AtLongList: ComponentClass<IProps, IState>

export default AtLongList