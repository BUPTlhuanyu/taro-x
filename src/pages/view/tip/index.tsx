import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtTip from "../../../components/tip/index"

import {AtTip, AtToast} from 'taro-x'

interface IState{
  isOpened: boolean
  text: string,
  icon: string,
  hasMask: boolean,
  image: string,
  duration: number,
  status: 'error' | 'loading' | 'success' | '',
  onClick: () => void,
  onClose: () => void
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
    navigationBarTitleText: '贴士'
  }

  constructor () {
    super(...arguments)
    this.onGotoMore = this.onGotoMore.bind(this)
    this.state = {
      isOpened: false,
      text: '',
      icon: '',
      hasMask: false,
      image: '',
      duration: 0,
      status: '',
      onClick: () => {},
      onClose: () => {}
    }
  }

  onGotoMore(){
    const state = {
      isOpened: true,
      text: '点击了启动按钮',
      icon: '',
      hasMask: false,
      image: '',
      status: '',
      duration: 2000,
      onClick: () => {},
      onClose: () => {}
    }

    const newState = Object.assign({}, this.state, state)
    this.setState(newState)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const {
      isOpened,
      text,
      icon,
      hasMask,
      image,
      duration,
      status,
      onClick,
      onClose
    } = this.state
    return (
      <View className='page'>
        <View className='doc-body'>
            <View className='panel'>
                <View className='panel__title'>静态文字</View>
                <View className='panel__content'>
                    <View className='example-item'>
                      <AtTip>单行文字</AtTip>
                    </View>
                    <View className='example-item'>
                      <AtTip>多行文字多行文字多行文字多行文字多行文字多行文字多行文字多行文字多行文字</AtTip>
                    </View>
                </View>
            </View>
            <View className='panel'>
                <View className='panel__title'>跑马灯</View>
                <View className='panel__content'>
                    <View className='example-item'>
                      <AtTip marquee speed ={100}>速度100速度100速度100速度100速度100速度100速度100速度100速度100速度100</AtTip>
                    </View>
                    <View className='example-item'>
                      <AtTip marquee >速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50速度50</AtTip>
                    </View>
                    <View className='example-item'>
                      <AtTip marquee speed ={70}>速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70速度70</AtTip>
                    </View>                                       
                </View>
            </View>
            <View className='panel'>
                <View className='panel__title'>带图标</View>
                <View className='panel__content'>
                <View className='example-item'>
                  <AtTip single icon='volume-plus'>
                    带图标带图标带图标带图标
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip icon='volume-plus'>
                    带图标带图标带图标带图标带图标带图标带图标带图标带图标带图标带图标
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip single icon='volume-plus' marquee>
                    带图标带图标带图标带图标带图标带图标带图标带图标带图标带图标带图标
                  </AtTip>
                </View>
                </View>
            </View>
            <View className='panel'>
                <View className='panel__title'>带按钮或链接的样式</View>
                <View className='panel__content'>
                <View className='example-item'>
                  <AtTip moreText="启动" showMore single icon='volume-plus' onGotoMore = {this.onGotoMore}>
                    单行，可点击按钮 单行
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip moreText="启动" showMore icon='volume-plus' onGotoMore = {this.onGotoMore}>
                    可点击按钮 多行，可点击按钮 多行，可点击按钮 多行，可点击按钮
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip moreText="启动" showMore single icon='volume-plus' marquee onGotoMore = {this.onGotoMore}>
                    单行跑马灯，可点击按钮 单行跑马灯，可点击按钮 单行跑马灯，可点击按钮 单行跑马灯，可点击按钮
                  </AtTip>
                </View>
                </View>
            </View>
            <View className='panel'>
                <View className='panel__title'>带关闭</View>
                <View className='panel__content'>
                <View className='example-item'>
                  <AtTip close single>
                    这是 NoticeBar 通告栏
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip close moreText="启动" showMore single onGotoMore = {this.onGotoMore}>
                    这是 NoticeBar 通告栏
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip close moreText="启动" showMore onGotoMore = {this.onGotoMore}>
                    这是 NoticeBar 通告栏 这是 NoticeBar 通告栏
                  </AtTip>
                </View>
                <View className='example-item'>
                  <AtTip close moreText="启动" showMore single icon='volume-plus' marquee onGotoMore = {this.onGotoMore}>
                    这是 NoticeBar 通告栏 这是 NoticeBar 通告栏 这是 NoticeBar 通告栏 这是 NoticeBar 通告栏
                  </AtTip>
                </View>
                </View>
            </View>
            <AtToast 
                  isOpened = {isOpened}
                  text = {text}
                  icon = {icon}
                  hasMask = {hasMask}
                  image = {image}
                  duration = {duration}
                  status = {status}
                  onClick = {onClick}
                  onClose = {onClose}
              />  
        </View>
      </View>
    )
  }
}