/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 10:03:31
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-03 15:09:50
 */
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  hasBorder: boolean
}

type iconType = { 
  value: string , 
  size?: number , 
  color?: string, 
  prefixClass?: string,
  className?: string,
  customStyle?: any 
}

export interface IListItemProps extends AtComponentCommonProps{
  arrow?: string,
  note?: string,
  disabled?: boolean,
  title?: string,
  thumb?: string,
  isSwitch?: boolean,
  hasBorder?: boolean,
  switchColor?: string,
  switchIsCheck?: boolean,
  extraText?: string,
  extraThumb?: string,
  iconInfo?: iconType,
  onSwitchChange?: CommonEventFunction,
  onClick?: any,
}

export declare const AtListItem: ComponentClass<IListItemProps>

declare const AtList: ComponentClass<IProps>

export default AtList