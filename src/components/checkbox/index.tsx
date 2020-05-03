import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

import {IProps} from 'types/checkbox'

export default class AtCheckbox extends AtComponent<IProps> {
  static defaultProps: IProps
  constructor (props: IProps) {
    super(props)
    this.state = {
    }
  }
  handleClick (idx) {
    const { selectedList, options } = this.props
    const option = options[idx]
    const { disabled, value } = option
    if (disabled) return

    const selectedSet = new Set(selectedList)
    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }
    this.props.onChange([...selectedSet])
  }

  render () {
    const {
      customStyle,
      className,
      options,
      selectedList,
    } = this.props
    const rootCls = classNames('at-checkbox', className)

    return <View className={rootCls} style={customStyle}>
      { options.map((option, idx) => {
        const { value, disabled, label, checkboxStyle } = option
        const optionCls = classNames('at-checkbox__option', {
          'at-checkbox__option--disabled': disabled,
          'at-checkbox__option--selected': selectedList.includes(value)
        })

        return <View className={optionCls} style={checkboxStyle} key={value} onClick={this.handleClick.bind(this, idx)} >
          <View className='at-checkbox__option-wrap'>
            <View className='at-checkbox__option-cnt'>
              <View className='at-checkbox__icon-cnt'>
                {/* <Text className='at-icon at-icon-check'></Text> */}
              </View>
              <View className='at-checkbox__title'>{label}</View>
            </View>
          </View>
        </View>
      })}
    </View>
  }
}

AtCheckbox.defaultProps = {
  customStyle: '',
  className: '',
  options: [],
  selectedList: [],
  onChange () {},
}
