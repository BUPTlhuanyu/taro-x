
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
  isTest: boolean,
  isOpened: boolean,
  disabled: boolean,
  autoClose: boolean,
  options: any[],
  onClick?: (item?: any, key?: any, e?: any) => void,
  onOpened?: (args?) => void,
  onClosed?: (args?) => void
}

export interface IState{
    _isOpened: boolean
    componentId: string | number,
    offsetSize: number,
}

declare const AtStAtSwiperActioneps: ComponentClass<IProps, IState>

export default AtSwiperAction