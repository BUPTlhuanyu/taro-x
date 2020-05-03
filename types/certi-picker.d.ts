/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-02-28 15:17:46
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-03 09:56:28
 */
import {ComponentClass, CSSProperties} from 'react'
import {AtComponentCommonProps} from './base'

interface FileItem {
  path: string
  size: number
}

export interface File {
  url: string,
  info?: {
    width: number, 
    height: number
  },
  file?: FileItem
}

type onChangeType = 'remove' | 'add'

type onChange = (type: onChangeType, files?: File) => void

export interface IProps extends AtComponentCommonProps{
  // showRemoveTag: boolean,  // 这个props可以开启，用于只展示图片没有上传但是能够删除图片的时候用，为了简化组件使用，现在关闭该接口
  sourceType?: Array<string>,  // 选择图片的来源： ['album', 'camera']
  sizeType?: Array<string>,  // 所选的图片的尺寸： ['original', 'compressed']
  file: File,
  mode?: 'scaleToFill' | 'aspectFit'| 'aspectFill'| 'widthFix'| 'top'| 'bottom'| 'center'| 'left'| 'right'| 'top left'| 'top right'| 'bottom left'| 'bottom right' | 'scalefit',
  onChange: onChange,
  chooseFile?: (showLoading: () => void) => void,
  onImagePreview: () => void,
  onFail: () => void
}

export interface IState{
  loading: boolean
  showRemoveTag: boolean
  mode: 'widthFix' | 'aspectFill',
  style: object | string,
  imageCls: string
}

declare const AtCertiPicker: ComponentClass<IProps, IState>

export default AtCertiPicker