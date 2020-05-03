import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import AtComponent from '../../common/component'
import {IProps, IState} from 'types/switch'

export default class AtSwitch extends AtComponent<IProps, IState> {
  static defaultProps: IProps
  constructor (props: IProps) {
    super(props)
    this.state = {
      switchChecked: this.props.checked
    }
  }
  handleChange = () => {
    this.setState((preState) => {
      return {
        switchChecked: !preState.switchChecked
      }
    }, () => {
      this.props.onChange(this.state.switchChecked)
    })
  }

  render () {
    const {
      customStyle,
      className,
      disabled,
      border,
      needText,
      checkedText,
      unCheckedText,
      title,
      color
    } = this.props
    let {switchChecked } = this.state
    const rootCls = classNames('at-switch', {
      'at-switch--without-border': !border
    }, className)
    const containerCls = classNames('at-switch__container', {
      'at-switch--disabled': disabled
    })
    const switchCls = classNames('at-switch__switch', {
      'at-switch--checked': switchChecked
    })
    return (
      <View className={rootCls} style={customStyle}>
        <View className='at-switch__title'>{title}</View>
        <View className={containerCls}>
          <View className='at-switch__mask'></View>
          <View className={switchCls} onClick={this.handleChange} style={switchChecked && color ? {background: color, border: `1PX solid ${color}`} : ''}></View> 
          {
            needText && 
            <View className='at-switch__checked-text'>{switchChecked ? checkedText : unCheckedText}</View>
          }
        </View>
      </View>
        
    )
  }
}

AtSwitch.defaultProps = {
  customStyle: '',
  className: '',
  title: '',
  color: '',
  border: false,
  disabled: false,
  checked: false,
  needText: true,
  checkedText: '是',
  unCheckedText: '否',
  onChange: () => {},
}


