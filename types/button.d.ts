/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-02-28 14:50:33
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-02 12:02:18
 */
import {ComponentClass} from 'react'
import {AtComponentCommonProps} from './base'

export interface IProps extends AtComponentCommonProps{
  size?: 'normal'| 'small',
  type?: 'primary'| 'secondary' | '',
  circle?: boolean,
  full?: boolean,
  loading?: boolean,
  disabled?: boolean,
  formType?: 'submit' | 'reset',
  openType?: 'contact' | 'share' | 'getUserInfo' | 'getPhoneNumber' |
  'launchApp' | 'openSetting' | 'feedback' | 'getRealnameAuthInfo' |
  'getAuthorize' | 'lifestyle' | 'contactShare',
  lang?: string,
  sessionFrom?: string,
  sendMessageTitle?: string,
  sendMessagePath?: string,
  sendMessageImg?: string,
  showMessageCard?: boolean,
  appParameter?: string,
  onClick?: () => void,
  onGetUserInfo?: () => void,
  onContact?: () => void,
  onGetPhoneNumber?: () => void,
  onError?: () => void,
  onOpenSetting?: () => void
}

export interface IState{
  isWEB: boolean
  isWEAPP: boolean
  isALIPAY: boolean
}

declare const AtButton: ComponentClass<IProps, IState>

export default AtButton