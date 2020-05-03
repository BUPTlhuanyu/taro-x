/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:38:28
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:21:40
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  title?: string,
  color?: string,
  checked?: boolean,
  needText?: boolean,
  checkedText?: string,
  unCheckedText?: string,
  border?: boolean,
  disabled?: boolean,
  onChange?: (state?) => void,
}

export interface IState{
  switchChecked: boolean
}

declare const AtSwitch: ComponentClass<IProps, IState>

export default AtSwitch