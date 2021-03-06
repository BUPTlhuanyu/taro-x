import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtAvatar from "../../../components/avatar/index"

// import AtDivider from "../../../components/divider/index"

import { AtAvatar} from 'taro-x'
import step1 from '../../../static/image/step1.svg'

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
    navigationBarTitleText: '头像'
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
            <AtAvatar 
              image={step1}
              circle
              text = 'text'
              customStyle = {
                {
                  width: `${Taro.pxTransform(200)}` ,
                  height: `${Taro.pxTransform(200)}` 
                }
              }
          ></AtAvatar>

          </View>
        </View>
      </View>
    </View>  
    )
  }
}