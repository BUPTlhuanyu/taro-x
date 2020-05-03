/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 10:26:28
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:20:19
 */
/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 09:20:14
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-02 09:38:25
 */
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  isOpened: boolean,
  start?: string,
  value?: String, 
  end?: string,
  fields: 'year' | 'month' | 'day',
  onChange?: (val: string[]) => void,
  onCancel?: () => void
}

export interface IState {
  _isOpened: boolean
}

export interface IPickerGroupProps extends AtComponentCommonProps{
  range?: Array<any>,
  index?: number
}

export interface IPickerGroupState{
  height: number
}

declare const AtPicker: ComponentClass<IProps, IState>

export default AtPicker