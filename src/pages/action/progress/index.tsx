import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtProgress from '../../../components/progress/index'
import {AtProgress} from 'taro-x'

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
    navigationBarTitleText: '进度条'
  }

  constructor () {
    super(...arguments)
    this.state = {

    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
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
              <AtProgress></AtProgress>
            </View>
          </View>
          {/* 传入当前进度 */}
          <View className='panel'>
            <View className='panel__title'>传入当前进度</View>
            <View className='panel__content no-padding'>
              <AtProgress percent={25} />
              <AtProgress percent={50} />
              <AtProgress percent={75} />
            </View>
          </View>
          {/* 是否隐藏信息 */}
          <View className='panel'>
            <View className='panel__title'>是否隐藏信息</View>
            <View className='panel__content no-padding'>
              <AtProgress percent={25} isHidePercent />
              <AtProgress percent={75} isHidePercent />
            </View>
          </View>
          {/* 自定义进度条的线宽 */}
          <View className='panel'>
            <View className='panel__title'>自定义进度条的线宽</View>
            <View className='panel__content no-padding'>
              <AtProgress percent={25} strokeWidth={6} />
              <AtProgress percent={50} strokeWidth={8} />
              <AtProgress percent={75} strokeWidth={10} />
            </View>
          </View>
          {/* 自定义进度条颜色 */}
          <View className='panel'>
            <View className='panel__title'>自定义进度条颜色</View>
            <View className='panel__content no-padding'>
              <AtProgress percent={25} color='#FF4949' />
              <AtProgress percent={50} color='#13CE66' />
              <AtProgress percent={75} color='#FFC82C' />
            </View>
          </View>
          {/* 传入不同的状态 */}
          <View className='panel'>
            <View className='panel__title'>传入不同的状态</View>
            <View className='panel__content no-padding'>
              <AtProgress percent={75} status='error' />
              <AtProgress percent={50} status='progress' />
              <AtProgress percent={100} status='success' />
            </View>
          </View>
        </View>
      </View>      
    )
  }
}
