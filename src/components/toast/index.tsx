// taro-ui的toast，实现思路不太友好，建议直接用taro.showToast

// 用作全局的loading，以及toast，即所有的loading与toast公用一个组件实例
// 关闭toast，组件实例还在内存中，只是children变为null
// 因此在每次更新props的时候，需要清除定时器。

import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'
import AtComponent from '../../common/component'
import statusImg from './img.json'

import {IProps, IState} from 'types/toast'

export default class AtToast extends AtComponent<IProps, IState> {
  static defaultProps

  _timer: NodeJS.Timeout | null
  constructor (props) {
    super(...arguments)

    const { isOpened, duration } = props

    if (isOpened) {
      this.makeTimer(duration)
    }

    this._timer = null
    this.state = {
      _isOpened: isOpened
    }
  }

  clearTimmer () {
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  /**
   * 在初次挂载的时候以及更新toast组件的时候设置定时器，调用close用于隐藏toast
   * @param duration 
   */
  makeTimer (duration) {
    if (duration === 0) {
      return
    }
    this._timer = setTimeout(() => {
      this.close()
    }, +duration)
  }

  /**
   * 在点击toast的时候，
   * 在隐藏taost之后，调用props.onClose,
   */
  close () {
    const { _isOpened } = this.state
    if (_isOpened) {
      this.setState(
        {
          _isOpened: false
        },
        this.handleClose
      )
      this.clearTimmer()
    }
  }

  handleClose () {
    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
    }
  }

  /**
   * 用于外部控制toast的逻辑：
   *      当加载完毕，父组件改变自身的state，通过props更新子组件的isOpened与duration
   *      根据isOpened展示或者隐藏toast，
   * @param nextProps 
   */
  componentWillReceiveProps (nextProps) {
    const { isOpened, duration } = nextProps
    if (!isOpened) {
      // 关闭
      this.close()
      return
    }

    // props.isOpened被设置为true
    if (!this.state._isOpened) {
      // 如果此时toast是关闭的，则设置_isOpened为true，展示toast
      this.setState({
        _isOpened: true
      })
    } else {
      // 如果此时toast是打开的，则清除定时器
      this.clearTimmer()
    }
    // 重新设置toast展示的时间
    this.makeTimer(duration)
  }

  handleClick = () => {
    const { onClick, status } = this.props
    if (status === 'loading') {
      return
    }
    if (onClick) {
      return onClick()
    }
    this.close()
  }

  render () {
    const { _isOpened } = this.state
    const { customStyle, text, icon, status, image, hasMask } = this.props
    
    const realImg = image || statusImg[status] || null
    const isRenderIcon = !!(icon && !(image || statusImg[status]))

    const bodyClass = classNames('toast-body', {
      'at-toast__body--custom-image': image,
      'toast-body--text': !realImg && !icon,
      [`at-toast__body--${status}`]: !!status
    })

    const iconClass = classNames('at-icon', {
      [`at-icon-${icon}`]: icon
    })

    return _isOpened ? (
      <View className={classNames('at-toast', this.props.className)}>
        {hasMask && <View className='at-toast__overlay' />}
        <View className={bodyClass} style={customStyle} onClick={this.handleClick}>
          <View className='toast-body-content'>
            {realImg ? (
              <View className='toast-body-content__img'>
                <Image
                  className='toast-body-content__img-item'
                  src={realImg}
                  mode='scaleToFill'
                />
              </View>
            ) : null}
            {isRenderIcon && (
              <View className='toast-body-content__icon'>
                <Text className={iconClass} />
              </View>
            )}
            {text && (
              <View className='toast-body-content__info'>
                <Text>{text}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    ) : null
  }
}

AtToast.defaultProps = {
  duration: 3000,
  isOpened: false
}
