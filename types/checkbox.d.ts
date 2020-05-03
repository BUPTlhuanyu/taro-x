/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:19:17
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:13:20
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  customStyle?: object | string,
  className?: [] | string,
  options: any[],
  selectedList: any[],
  onChange: (arr) => void,
}


declare const AtCheckbox: ComponentClass<IProps>

export default AtCheckbox