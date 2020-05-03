/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:39:29
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:23:46
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  tabDirection?: 'horizontal' | 'vertical',
  index?: number,
  current?: number
}

declare const AtTabsPane: ComponentClass<IProps>

export default AtTabsPane