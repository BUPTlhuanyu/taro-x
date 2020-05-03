import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

interface IState{
    files: any
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
    navigationBarTitleText: '布局'
  }

  constructor () {
    super(...arguments)
    this.state = {
        files: []
    }
  }

  handleClick(url){
    Taro.navigateTo({
      url: `/pages/layout/${url}/index`
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.handleClick.bind(this, 'float-layout')}>
                  Float-Layout 浮动弹层
        </Button>
        <Button onClick={this.handleClick.bind(this, 'long-list')}>
                  长列表
        </Button>		
      </View>
    )
  }
}
