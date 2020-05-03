/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-09 09:29:27
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-12 16:52:42
 */
import {AtComponentCommonProps} from './base'
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'

export interface actionListItem{
  key: string,
  text: string,
  onClick?: CommonEventFunction,
  type?: 'bottom' | 'normal',
  style?: string 
}

export interface IProps extends AtComponentCommonProps{
  actionList: actionListItem[],
  type: 'bottom' | 'center',
  isOpened: boolean,
  onClose?: () => void
}

export interface IState{
  _isOpened: boolean
}

declare const AtActionSheet: ComponentClass<IProps, IState>

export default AtActionSheet