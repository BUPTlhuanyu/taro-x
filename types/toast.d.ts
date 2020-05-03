/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 14:56:37
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-02 14:56:38
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  text: string,
  icon: string,
  hasMask: boolean,
  image: string,
  isOpened: boolean,
  duration: number,
  status: 'error' | 'loading' | 'success' | '',
  onClick: () => void,
  onClose: () => void
}

export interface IState{
  _isOpened: boolean
}

declare const AtToast: ComponentClass<IProps, IState>

export default AtToast