/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:39:42
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:09:58
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  iconStyle?: object | string,
  current: number,
  items: any[],
  type: string,
  icon?: boolean
  onChange: (args?) => void,
}


declare const AtSteps: ComponentClass<IProps>

export default AtSteps