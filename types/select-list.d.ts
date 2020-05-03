/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:33:31
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-03 09:54:37
 */
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  isOpened: boolean, // 控制
  title: string, // 题目
  options: Array<any>, // 选项
  value: string, // 取值
  onChangeValue: (value) => void
  onCancel: () => void
}

export interface IState{
  _isOpened: boolean
}

export interface ISelectRadioProps{
  options: Array<any>, // 选项
  value: string, // 取值
  onChangeValue: (value) => void
}

declare const AtSelectList: ComponentClass<IProps, IState>

export default AtSelectList