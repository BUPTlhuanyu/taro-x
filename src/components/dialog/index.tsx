import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, RichText  } from '@tarojs/components'

import AtDialogAction from './action/index'
import AtDialogContent from './content/index'
import classNames from 'classnames'

import AtComponent from '../../common/component'

import { handleTouchScroll } from '../../common/utils'

import { IProps, IState } from 'types/dialog'
import { CommonEvent } from '@tarojs/components/types/common'

export default class AtDialog extends AtComponent<IProps, IState> {
  static defaultProps: IProps
  constructor (props) {
    super(props)

    const { isOpened } = props
    this.state = {
      _isOpened: isOpened,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
    }
  }

  componentWillReceiveProps (nextProps) {
    const { isOpened } = nextProps

    if (this.props.isOpened !== isOpened) {
      handleTouchScroll(isOpened)
    }

    if (isOpened !== this.state._isOpened) {
      this.setState({
        _isOpened: isOpened
      })
    }
  }

  handleClickOverlay = () => {
    if (this.props.closeOnClickOverlay) {
      this.setState(
        {
          _isOpened: false
        },
        this.handleClose
      )
    }
  }

  handleClose = () => {
    if ((this.props.onClose)) {
      this.props.onClose()
    }
  }

  handleCancel = () => {
    if ((this.props.onCancel)) {
      this.props.onCancel()
    }
  }

  handleConfirm = () => {
    if ((this.props.onConfirm)) {
      this.props.onConfirm()
    }
  }

  handleTouchMove = (e: CommonEvent) => {
    e.stopPropagation()
  }

  render () {
    const { _isOpened, isWEB } = this.state
    const { title, content, cancelText, confirmText } = this.props
    const rootClass = classNames(
      'at-modal',
      {
        'at-modal--active': _isOpened
      },
      this.props.className
    )
    console.log('content', this.props)

    if (title || content) {
      const isRenderAction = cancelText || confirmText
      return (
        <View className={rootClass}>
          <View
            onClick={this.handleClickOverlay}
            className='at-modal__overlay'
          />
          <View className='at-modal__container'>
            {content && (
              <AtDialogContent>
                <View className='content-simple'>
                  { isWEB ? <RichText nodes={content.replace(/\n/g, '<br/>')}></RichText> : <Text>{content}</Text> }
                </View>
              </AtDialogContent>
            )}
            {isRenderAction && (
              <AtDialogAction isSimple>
                {cancelText && (
                  <Button onClick={this.handleCancel} >{cancelText}</Button>
                )}
                {confirmText && (
                  <Button onClick={this.handleConfirm}>{confirmText}</Button>
                )}
              </AtDialogAction>
            )}
          </View>
        </View>
      )
    }
    return (
      <View onTouchMove={this.handleTouchMove} className={rootClass}>
        <View className='at-modal__overlay' onClick={this.handleClickOverlay} />
        <View className='at-modal__container'>{this.props.children}</View>
      </View>
    )
  }
}

AtDialog.defaultProps = {
  closeOnClickOverlay: true,
  isOpened: false
}