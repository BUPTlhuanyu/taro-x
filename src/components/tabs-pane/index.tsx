import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'
import {IProps} from 'types/tabs-pane'
export default class AtTabsPane extends AtComponent<IProps> {
  static defaultProps: IProps
  render () {
    const {
      customStyle,
      className,
      tabDirection,
      index,
      current
    } = this.props

    return (
      <View
        className={
          classNames({
            'at-tabs-pane': true,
            'at-tabs-pane--vertical': tabDirection === 'vertical',
            'at-tabs-pane--active': index === current,
            'at-tabs-pane--inactive': index !== current
          }, className)
        }
        style={customStyle}
      >
        {this.props.children}
      </View>
    )
  }
}


AtTabsPane.defaultProps = {
  customStyle: '',
  className: '',
  tabDirection: 'horizontal',
  index: 0,
  current: 0
}
