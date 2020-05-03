/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 09:39:56
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:08:43
 */
import { AtComponentCommonProps } from './base'
import { ComponentClass } from 'react'

export interface IProps extends AtComponentCommonProps{
  content?: string,
  height?: string | number,
  fontColor?: string,
  fontSize?: string | number,
  lineColor?: string,
  lineStyle?: 'dotted' | 'solid' | 'double' | 'dashed',
  icon?: string,
  onClick?: () => void 
}

declare const AtDivider: ComponentClass<IProps>

export default AtDivider
