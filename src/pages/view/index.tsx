import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

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
    navigationBarTitleText: '视图组件'
  }

  constructor () {
    super(...arguments)
    this.state = {

    }
  }

  handleClick(url){
    Taro.navigateTo({
      url: `/pages/view/${url}/index`
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
        <Button onClick={this.handleClick.bind(this, 'tip')}>
                贴士
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'steps')}>
                  步骤条
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'avatar')}>
                头像
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'preview-image')}>
                图片预览组件
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'timeline')}>
                时间轴
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'accordion')}>
                手风琴
        </Button>	
      </View>
    )
  }
}

