/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:10:18
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:06:28
 */
/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 09:20:14
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-02 17:21:27
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  size?: string | number,
  color?: string | number,
}

declare const AtLoading: ComponentClass<IProps>

export default AtLoading