/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 09:20:14
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-02 17:21:27
 */
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  title?: string
  isOpened: boolean
  onCancel?(): CommonEventFunction
  onConfirm?(): CommonEventFunction
  onClose?(): CommonEventFunction
  content?: string
  closeOnClickOverlay: boolean
  cancelText?: string
  confirmText?: string
}

export interface IState {
  _isOpened: boolean
  isWEB: boolean
}

export interface IActionProps extends AtComponentCommonProps{
  isSimple: boolean
}

export declare const AtDialogAction: ComponentClass<IActionProps>

declare const AtDialog: ComponentClass<IProps, IState>

export default AtDialog