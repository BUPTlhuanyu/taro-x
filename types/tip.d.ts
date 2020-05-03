/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 13:53:19
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:25:06
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'
import { StandardProps } from '@tarojs/components/types/common'

export interface IProps extends AtComponentCommonProps{
  close?: boolean,
  single?: boolean,
  marquee?: boolean,
  speed?: number,
  moreText?: string,
  showMore?: boolean,
  icon?: string,
  onClose?: () => void,
  onGotoMore?: () => void
}

export interface IState{
  show: boolean,
  animElemId: string,
  dura: number,
  isWEAPP: boolean,
  isALIPAY: boolean,
  isWEB: boolean,
  animationData: object[]
}

declare const AtTip: ComponentClass<IProps, IState>

export default AtTip