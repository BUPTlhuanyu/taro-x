/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-09 09:29:27
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-12 16:52:42
 */
import {AtComponentCommonProps} from './base'
import {ComponentClass} from 'react'
import {CommonEventFunction} from '@tarojs/components/types/common'

export interface IProps extends AtComponentCommonProps{
    items: any[]
}
declare const AtAccordion: ComponentClass<IProps>

export default AtAccordion