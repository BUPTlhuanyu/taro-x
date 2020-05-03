import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

import {IProps} from 'types/steps'
export default class AtSteps extends AtComponent<IProps> {
  props: IProps
  static defaultProps: IProps
  handleClick() {
    this.props.onChange(...arguments)
  }

  render() {
    const {
      customStyle,
      iconStyle,
      className,
      items,
      current,
      type,
      icon
    } = this.props

    return (
      <View
        className={classNames('at-steps', className)}
        style={customStyle}
      >
        {
          type === "" &&
          items.map((item, i) => (
            <View
              key={item.title}
              className={
                classNames({
                  'at-steps__item': true,
                  'at-steps__item--actived': i < current,
                  'at-steps__item--active': i === current,
                  'at-steps__item--inactive': i > current
                })
              }
            //   onClick={this.handleClick.bind(this, i)}
            >
              {
                <View className='at-steps__primary-wrap'>
                  {i !== 0 && <View className={
                    classNames({
                      'at-steps__left-line': true,
                      [`at-steps__left-line--${item.title.length}`]: item.title.length,
                      [`at-steps__left-line--${item.title.length}--active`]: item.title.length && i === current,
                    })}></View>}
                  <View className='at-steps__primary'>
                    {item.title}
                  </View>
                  {icon && i !== items.length - 1 && <View className='at-steps__icon' style={iconStyle}></View>}
                  {i !== items.length - 1 && <View className={
                    classNames({
                      'at-steps__right-line': true,
                      [`at-steps__right-line--${item.title.length}`]: item.title.length,
                      [`at-steps__right-line--${item.title.length}--active`]: item.title.length && i === current,
                    })
                  }></View>}
                </View>
              }

              <View className='at-steps__desc'>
                {item.desc}
              </View>
            </View>
          ))
        }
        {
          type === "circular" &&
          items.map((item, i) => (
            <View
              key={item.title}
              className={
                classNames({
                  'at-steps__item': true,
                  'at-steps__item--actived': i < current,
                  'at-steps__item--active': i === current,
                  'at-steps__item--inactive': i > current
                })
              }
            //   onClick={this.handleClick.bind(this, i)}
            >
              {
                <View className='at-steps__circular-wrap'>
                  {i !== 0 && <View className="at-steps__circular__left-line"></View>}
                  {
                    item.status
                      ? (
                        <View className={
                          classNames({
                            'at-icon': true,
                            'at-icon-check-circle': item.status === 'success',
                            'at-icon-close-circle': item.status === 'error',
                            'at-steps__single-icon': true,
                            'at-steps__single-icon--success': item.status === 'success',
                            'at-steps__single-icon--error': item.status === 'error',
                          })
                        }
                        ></View>
                      )
                      : <View className='at-steps__circular'>
                        {
                          item.icon
                            ? (
                              <Text className={
                                classNames('at-icon', {
                                  [`at-icon-${item.icon.value}`]: item.icon.value,
                                  'at-steps__circle-icon': true,
                                })
                              }
                              ></Text>
                            )
                            : i >= current && <Text className='at-steps__num'>{i + 1}</Text>
                        }
                      </View>
                  }
                  {i !== items.length - 1 && <View className="at-steps__circular__right-line"></View>}
                </View>
              }
              <View className='at-steps__circular__title'>
                {item.title}
              </View>
              <View className='at-steps__desc'>
                {item.desc}
              </View>
            </View>
          ))
        }
      </View >
    )
  }
}

AtSteps.defaultProps = {
  customStyle: '',
  iconStyle: '',
  className: '',
  current: 0,
  items: [],
  type: '',
  icon: false,
  onChange: () => { },
}
