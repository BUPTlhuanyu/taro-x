import Taro, {Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../../common/component'

import { IActionProps } from 'types/dialog'


export default class AtDialogAction extends AtComponent<IActionProps> {
  static options = {
    addGlobalClass: true
  }
  static defaultProps: { isSimple: boolean; }
  render () {
    const rootClass = classNames(
      'at-modal__footer',
      {
        'at-modal__footer--simple': this.props.isSimple
      },
      this.props.className
    )

    return (
      <View className={rootClass}>
        <View className='at-modal__action'>
          {this.props.children}
        </View>
      </View>
    )
  }
}

AtDialogAction.defaultProps = {
  isSimple: false,
}
