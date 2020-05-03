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
    navigationBarTitleText: '操作反馈'
  }

  constructor () {
    super(...arguments)
    this.state = {
        files: []
    }
  }

  handleClick(url){
    Taro.navigateTo({
      url: `/pages/action/${url}/index`
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
        <Button onClick={this.handleClick.bind(this, 'dialog')}>
                  对话框C2-02
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'toast')}>
                  轻提示
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'loading')}>
                  加载中
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'progress')}>
                  进度条
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'action-sheet')}>
                  动作面板
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'swipe-action')}>
                  滑动选择栏
        </Button>	
      </View>
    )
  }
}