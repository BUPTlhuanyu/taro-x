import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import AtComponent from '../../common/component'

import classNames from 'classnames'

import {IProps} from 'types/list'


export default class AtList extends AtComponent<IProps>{
    static defaultProps: IProps
    render () {
        const rootClass = classNames(
          'at-list',
          {
            'at-list--no-border': !this.props.hasBorder
          },
          this.props.className
        )
    
        return <View className={rootClass}>{this.props.children}</View>
      }
}

AtList.defaultProps = {
    hasBorder: true
}