
import {ComponentClass} from 'react'
import { AtComponentCommonProps } from './base'

export interface IProps extends AtComponentCommonProps{
    items: any[],
    isDouble: boolean
}

declare const AtTimeline: ComponentClass<IProps>

export default AtTimeline