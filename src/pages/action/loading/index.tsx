import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtLoading from '../../../components/loading/index'
import {AtLoading} from 'taro-x'

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
    navigationBarTitleText: '操作反馈'
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
              <View className='loading-container'>
                <AtLoading />
                <AtLoading color="black" size = "4"/>
                <AtLoading color="black" size = "6"/>
                <AtLoading color="black" size = "12"/>                
              </View>
            </View>
          </View>
        </View>
      </View>      
    )
  }
}
