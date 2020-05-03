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
      url: `/pages/form/${url}/index`
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
        <Button onClick={this.handleClick.bind(this, 'input')}>
                 输入框
        </Button>	     
        <Button onClick={this.handleClick.bind(this, 'switch')}>
                  开关
        </Button>	   
        <Button onClick={this.handleClick.bind(this, 'radio')}>
                  单选框
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'checkbox')}>
                  复选框
        </Button>    
        <Button onClick={this.handleClick.bind(this, 'select')}>
                 选择
        </Button>	
        <Button onClick={this.handleClick.bind(this, 'picker')}>
                  日期选择器
        </Button>
        <Button onClick={this.handleClick.bind(this, 'calendar')}>
                  日历选择器
        </Button>    
        <Button onClick={this.handleClick.bind(this, 'cascader')}>
                 级联组件
        </Button>
        <Button onClick={this.handleClick.bind(this, 'image-picker')}>
                  图片选择器
        </Button>
      </View>
    )
  }
}
