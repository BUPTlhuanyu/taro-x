import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

import {IProps} from 'types/radio'
export default class AtRadio extends AtComponent<IProps> {
  static defaultProps: IProps
  constructor (props: IProps) {
    super(props)
    this.state = {
    }
  }
  handleClick (option) {
    if (option.disabled) return
    this.props.onClick(option.value, ...arguments)
  }

  render () {
    const {
      customStyle,
      className,
      options,
      typeRadio,
      value
    } = this.props

    return (
      <View
        className={
          classNames(
            'at-radio',
            className
          )
        }
        style={customStyle}
      >
        {
          options.map(option => <View
            key={option.value}
            onClick={this.handleClick.bind(this, option)}
            style={option.radioStyle}
            className={
              classNames({
                'at-radio__option': typeRadio === '',
                'at-radio__option__button': typeRadio !== '',
                'at-radio__option--disabled': option.disabled
              })
            }
          >
              {
                typeRadio === '' && 
                <View className='at-radio__option-wrap'>
                  <View className='at-radio__option-container'>
                      <View
                        className={
                          classNames({
                            'at-radio__icon': true,
                            'at-radio__icon--checked': value === option.value
                          })
                        }
                      ></View>
                    <View  
                      className='at-radio__title'
                    >
                      {option.label}
                    </View>
                  </View>
                </View>
              }
              {
                typeRadio !== '' && 
                <View
                  className={
                    classNames({
                      'at-radio__option-wrap__button': true,
                      'at-radio__option-wrap__button__blue': typeRadio === 'buttonBlue',
                      'at-radio__option-wrap__button--checked': typeRadio === 'button' && value === option.value,
                      'at-radio__option-wrap__button__blue--checked': typeRadio === 'buttonBlue' && value === option.value
                    })
                  }
                >
                  <View className='at-radio__option-container'>
                      {option.label}
                  </View>
                </View>
              }
          </View>)
        }
      </View>
    )
  }
}

AtRadio.defaultProps = {
  customStyle: '',
  className: '',
  typeRadio: '',
  value: '',
  options: [],
  onClick: () => {},
}


