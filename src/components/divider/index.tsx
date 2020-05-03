import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

import { IProps } from 'types/divider'

import { initTestEnv } from '../../common/utils'
initTestEnv()

export default class AtDivider extends AtComponent<IProps> {
  static defaultProps: IProps
  constructor () {
    super(...arguments)
    this.contentClick = this.contentClick.bind(this)
  }

  contentClick(){
    this.props.onClick && this.props.onClick()
  }

  render () {
    const {
      className,
      customStyle,
      content,
      height,
      fontColor,
      fontSize,
      lineColor,
      lineStyle,
      icon
    } = this.props

    const rootStyle = {
      height: height ? `${Taro.pxTransform(Number(height))}` : ''
    }

    const fontStyle = {
      'color': fontColor,
      'fontSize': fontSize ? `${Taro.pxTransform(Number(fontSize))}` : ''
    }

    const dividerLineStyle = {
      'borderTopColor': lineColor,
      'borderTopStyle': lineStyle
    }

    const iconClass = `at-icon at-icon-${icon}`

    return (
      <View
        className={classNames('at-divider', className)}
        style={this.mergeStyle(rootStyle, customStyle || '')}
      >
        <View className='at-divider__content' style={fontStyle} onClick={this.contentClick}>
          { 
            icon ? <Text className={iconClass} ></Text>
              : 
            content
          }
        </View>
        <View className='at-divider__line' style={dividerLineStyle}></View>
      </View>
    )
  }
}

AtDivider.defaultProps = {
  content: '',
  height: 0,
  fontColor: '',
  fontSize: 0,
  lineColor: '',
  lineStyle: 'solid',
  onClick: () => {}
}
