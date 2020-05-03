import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtSwitch from '../../../components/switch/index'
import {AtSwitch} from 'taro-x'
import './index.scss'

interface IState{
    hasChild: boolean,
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
        hasChild: false
    }
  }

  handleChange = value => {
    this.setState({
        hasChild: value
    })
  }
  render () {
    return (
        <View className='page'>
            <View className='doc-body'>
                <View className='panel'>
                    <View className='panel__title'>基础用法</View>
                    <View className='panel__content'>
                        <View className='example-item'>
                            <View className='show-switch'>
                                <AtSwitch title='没有选中文案' needText={false} />
                            </View>
                            <View className='show-switch'>
                                <AtSwitch title='有选中文案' checked />
                            </View>
                            <View className={this.state.hasChild ? 'switch--hide-child switch--show-child' : 'switch--hide-child'}>
                                <AtSwitch title='有子组件' onChange={this.handleChange}  checkedText="已上牌" unCheckedText="新车未上牌" />
                                <View className='switch--child-com'>
                                    <View>车牌号</View>
                                    <View>粤A88888</View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='panel'>
                    <View className='panel__title'>禁用状态</View>
                    <View className='panel__content'>
                    <View className='example-item'>
                        <View className='show-switch'>
                            <AtSwitch title='不可点击是' checked disabled />
                        </View>
                        <View className='show-switch'>
                            <AtSwitch title='不可点击否' disabled />
                        </View>
                    </View>
                    </View>
                </View>
                
            </View>
        </View>
    )
  }
}
