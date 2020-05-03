import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IState{
}

export default class Index extends Component<{}, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '图标'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    const iconData = [
      'icon-close',
      'icon-search',
      'icon-avatar',
      'icon-settled',
      'icon-rejected',
      'icon-medical-care',
      'icon-travel-change',
      'icon-travel-delay',
      'icon-claim-apply',
      'icon-Certificates',
      'icon-progress-done',
      'icon-processing',
      'icon-express',
      'icon-share',
      'icon-accepted',
      'icon-phone',
      'icon-delete',
      'icon-add2',
      'icon-clear',
      'icon-calendar',
      'icon-picture',
      'icon-add',
      'icon-arrow-top',
      'icon-arrow-bottom',
      'icon-message',
      'icon-example',
      'icon-arrow-right'
    ]
    return (
      <View className='page'>
        {/* S Header */}
        {/* E Header */}

        {/* S Body */}
        <View className='doc-body'>
          {/* 基本样式 */}
          <View className='panel'>
            <View className='panel__title'>基本样式</View>
            <View className='panel__content no-padding'>
              <View className = "icon-container">
                {
                  iconData.map((item) => {
                    return <View className = "icon-item">
                      <View className="icon-item__content">
                        <View className={`al-icon ${item} custom-style`}></View> 
                      </View>
                      <View className="icon-item__text">{item}</View> 
                    </View>
                  })
                }
              </View>

            </View>
          </View>
        </View>
      </View>        
    )
  }
}
