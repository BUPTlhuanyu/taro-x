import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtButton from '../../../components/button/index'
import {AtButton} from 'taro-x'


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
    navigationBarTitleText: '基础组件'
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
  handleClick = (a) => {
    console.log(a)
    console.log(event)
  }
  render () {
    return (
      <View className='basics-container'>
        <View>
          <AtButton type='primary'>激活状态</AtButton>
          <AtButton type='secondary'>激活状态</AtButton>
        </View>
        <View>
          <AtButton type='primary' disabled>disabled</AtButton>
          <AtButton type='secondary' disabled>disabled</AtButton>
        </View>
        <View>
          <AtButton type='primary' 
                    customStyle={{
                      width: `${Taro.pxTransform(690)}`,
                      height: `${Taro.pxTransform(88)}`
                    }}
          >
              690*88
          </AtButton>
          <AtButton type='primary' 
                    customStyle={{
                      width: `${Taro.pxTransform(420)}`,
                      height: `${Taro.pxTransform(88)}`
                    }}
          >
              420*88
          </AtButton>
          <AtButton type='primary' 
                    customStyle={{
                      width: `${Taro.pxTransform(240)}`,
                      height: `${Taro.pxTransform(88)}`
                    }}
          >
              240*88
          </AtButton>
          <AtButton type='primary' 
                    customStyle={{
                      width: `${Taro.pxTransform(240)}`,
                      height: `${Taro.pxTransform(88)}`,
                      fontSize: `${Taro.pxTransform(24)}`
                    }}
          >
            修改字号
          </AtButton>
        </View>
        <View>
          <AtButton type='primary' loading>loading disabled状态</AtButton>
          <AtButton type='secondary'  loading>loading 激活状态</AtButton>
        </View>
      </View>
    )
  }
}
