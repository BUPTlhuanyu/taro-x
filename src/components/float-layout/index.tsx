/* eslint-disable taro/function-naming */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import _isFunction from 'lodash/isFunction'

import AtComponent from '../../common/component'
import { handleTouchScroll } from '../../common/utils'
import { IProps, IState } from 'types/float-layout'

export default class AtFloatLayout extends AtComponent<IProps, IState> {
  static defaultProps: IProps
  constructor (props) {
    super(...arguments)

    const { isOpened } = props
    this.state = {
      _isOpened: isOpened
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

  handleClose = () => {
    if (_isFunction(this.props.onClose)) {
      this.props.onClose()
    }
  }

  close = () => {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    )
  }

  handleTouchMove = e => {
    e.stopPropagation()
  }

  render () {
    const { _isOpened } = this.state


    const rootClass = classNames(
      'at-float-layout',
      {
        'at-float-layout--active': _isOpened
      },
      this.props.className
    )

    // header
    return (
      <View className={rootClass} onTouchMove={this.handleTouchMove}>
        <View onClick={this.close} className='at-float-layout__overlay' />
        <View className='at-float-layout__container layout'>
          {/* {title ? (
            <View className='layout-header'>
              <Text className='layout-header__title'>{title}</Text>
              <View className='layout-header__btn-close' onClick={this.close} />
            </View>
          ) : null} */}
          <View className='layout-header'>
            {this.props.renderHeader}
          </View>          
          <View className='layout-body'>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}

AtFloatLayout.defaultProps = {
  isOpened: false,
  onClose: () => {},
  onScroll: () => {},
  onScrollToLower: () => {},
  onScrollToUpper: () => {},
  renderHeader: ''
}