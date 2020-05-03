/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-02 09:47:37
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-16 16:13:39
 */
import { ComponentClass } from 'react'
import { AtComponentCommonProps } from './base'


interface FileItem {
  path: string
  size: number
}

type status = 'loading' | 'failed' | 'success'

type sizeType = 'album' | 'camera'

type sourceType = 'original' | 'compressed'

type onChangeType = 'remove' | 'add'

type onChange = (type: onChangeType, files: File[], index?: number) => void

export interface File {
  uid: number,
  status: status,
  url: string,
  file?: FileItem[]
}

export interface IProps extends AtComponentCommonProps{
  isTest: boolean,
  files: Array<File>,
  mode: 'scaleToFill' | 'aspectFit'| 'aspectFill'| 'widthFix'| 'top'| 'bottom'| 'center'| 'left'| 'right'| 'top left'| 'top right'| 'bottom left'| 'bottom right'
  showAddBtn: boolean,
  multiple: boolean,
  length: number,
  onChange: onChange,
  chooseFile?: (onChange: onChange) => void,
  onImageClick: (index: number, file: File) => void,
  onFail: () => void,
  count?: number,
  sizeType?: Array<sizeType>,
  sourceType?: Array<sourceType>
}


declare const AtImagePicker: ComponentClass<IProps>
export default AtImagePicker