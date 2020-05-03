/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 10:11:16
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:19:28
 */
import { ComponentClass } from 'react'
import { AtComponentCommonProps } from './base'
import { CommonEvent } from '@tarojs/components/types/common'

type changeType = 'change' | 'blur' | 'clear'

export interface IProps extends AtComponentCommonProps{
  value?: string,
  name?: string,
  placeholder?: string,
  placeholderStyle?: string,
  placeholderClass?: string,
  title?: string,
  confirmType?: "send" | "search" | "next" | "go" | "done",
  cursor?: number,
  selectionStart?: number,
  selectionEnd?: number,
  adjustPosition?: boolean,
  cursorSpacing?: number,
  maxLength?: string | number,
  type?: string,
  disabled?: boolean,
  border?: boolean,
  error?: string,
  clear?: boolean,
  backgroundColor?: string,
  focus?: boolean,
  onChange?: (type: changeType, value: string, event?: CommonEvent) => any, // 数据变化时调用，可用于实时校验，可改变输入金额的格式
  onFocus?: (value: string, event: CommonEvent) => any, // 聚焦的时候调用
  onBlur?: (value: string, event: CommonEvent) => any, // 失焦的时候调用，可用于离框校验
  onConfirm?: (value: string, event: CommonEvent) => any, // 微信端适用
  onClick?: () => void
}

export interface IState{
  focused: boolean
}


declare const AtInput: ComponentClass<IProps>
export default AtInput