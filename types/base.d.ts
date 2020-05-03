/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-02-28 14:27:09
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-02-28 14:57:36
 */
import { CSSProperties } from 'react'

export interface AtComponentCommonProps {
  className?: string | string[] | { [key: string]: boolean }

  customStyle?: string | CSSProperties
}