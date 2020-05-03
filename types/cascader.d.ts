/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-03 09:14:12
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:12:50
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  customStyle?: object | string, // 父组件传入的行内样式
  className?: [] | string, //父组件传入的类，用来设置样式
  isOpened: boolean, // 是否打开级联组件
  isMaskClose?: boolean, // 点击蒙层是否关闭
  close?: (isManual?) => void,// 关闭,isManual：未选择所有级联项，手动关闭
  placeholder?: string,
  total?: number, // 级联一共有几层
  valueNum?: number, // 选中项，超过几位显示省略号
  onChange: (value, selectOption) => void,
  options: string[] | object[] //传入的当前的可选项
}

export interface Option {
  value: string | number;
  label?: string | number;
  disabled?: boolean;
}

export interface IState {
  title: string[],
  content: Option[][],
  contentCurrent: number[],
  current: number, //高亮的title下标
}

declare const AtCascader: ComponentClass<IProps, IState>

export default AtCascader