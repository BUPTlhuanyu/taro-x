import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../../common/component'
import { AtComponentCommonProps } from 'types/base'

export default class AtDialogContent extends AtComponent<AtComponentCommonProps> {
  static options = {
    addGlobalClass: true
  }
  render () {
    const rootClass = classNames('at-modal__content', this.props.className)
    return <View className={rootClass}>{this.props.children}</View>
  }
}
