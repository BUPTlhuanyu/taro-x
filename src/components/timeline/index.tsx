import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'
import { IProps } from 'types/timeline'

export default class AtTimeline extends AtComponent<IProps> {
    static defaultProps: IProps
  render () {
    const {
      items,
      customStyle,
      isDouble
    } = this.props
  
    const rootClassName = ['at-timeline']
    const itemElems = items.map((item, index) => {
      const {
        title = '',
        color,
        icon,
        content,
        renderHeader
      } = item

      const iconClass = classNames({
        'at-icon': true,
        [`at-icon-${icon}`]: icon,
      })

      const itemRootClassName = ['at-timeline-item']
      if (color) itemRootClassName.push(`at-timeline-item--${color}`)
      if (isDouble) itemRootClassName.push(`at-timeline-item--double`)

      const itemTailClassName = ['at-timeline-item__tail']
      if (isDouble) itemTailClassName.push(`at-timeline-item__tail--dashed`)

      const dotClass: any = []
      if (icon) {
        dotClass.push('at-timeline-item__icon')
      } else {
        dotClass.push('at-timeline-item__dot')
        if (isDouble) dotClass.push(`at-timeline-item__dot--double`)
      }

      return (
        !isDouble ?
        <View className={classNames(itemRootClassName)} key={`at-timeline-item-${index}`}>
          <View className={classNames(itemTailClassName)}></View>
          <View className={classNames(dotClass)}>
            {icon && <Text className={iconClass}></Text>}
          </View>
          <View className='at-timeline-item__content'>
            <View className='at-timeline-item__content-item'>{title}</View>
            {
              content && content()
            }
          </View>
        </View>
        :
        <View className={classNames(itemRootClassName)} key={`at-timeline-item-${index}`}>
          <View className='at-timeline-item__content'>
            <View className='at-timeline-item__content-item'>{title}</View>
          </View>
          <View className={classNames(itemTailClassName)}></View>
          <View className={classNames(dotClass)}>
            {icon && <Text className={iconClass}></Text>}
          </View>
          <View className="at-timeline-item__content--double">
            {
              content && content()
            }
          </View>
        </View>
      )
    })
    return (
      <View
        className={classNames(rootClassName, this.props.className)}
        style={customStyle}
      >
        {itemElems}
      </View>
    )
  }
}
AtTimeline.defaultProps = {
    items: [],
    isDouble: false,
    customStyle: {},
  }
  

