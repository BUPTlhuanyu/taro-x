/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 13:50:04
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-02 13:56:00
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  color?: string,
  status?: string,
  percent?: number,
  strokeWidth?: number,
  isHidePercent?: boolean
}



declare const AtProgress: ComponentClass<IProps>

export default AtProgress