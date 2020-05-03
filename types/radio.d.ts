/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:22:02
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:21:04
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  customStyle?: object | string,
  className?: [] | string,
  value?: string,
  typeRadio?: string,
  options?: any[],
  onClick?: (val, args?) => void,
}


declare const AtRadio: ComponentClass<IProps>

export default AtRadio