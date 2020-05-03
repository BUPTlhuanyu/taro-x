/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 13:35:28
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-16 15:54:09
 */
/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 09:20:14
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-02 09:38:25
 */
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface imageItem{
  uid: string
  source: string
}

export interface IProps extends AtComponentCommonProps{
  current: number   // 外部控制展示第几张图片，每次在点击图片的时候会被显示。每次在删除的时候不能由用户改变
  imageData: imageItem[]  // 展示的所有图片，可以是本地链接，网络图片，base64
  onClose: () => void  // 退出图片预览
  onDelete?: (res: {index: number, files: imageItem[]}) => void  // 点击删除时,返回删除后的图片以及删除的位置信息，考虑到手机左右滑动退出预览，这里每次点击删除都会通知父组件。
}

export interface IState {
  translateX: number  // 横向移动的距离
  current: number    // 组件内当前展示第几张图片
}


declare const AtPreviewImage: ComponentClass<IProps, IState>

export default AtPreviewImage