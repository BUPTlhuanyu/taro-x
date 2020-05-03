import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index/index'

import './app.scss'

// import "./style/index.scss";

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentDidMount () {}

  config: Config = {
    pages: [
      'pages/index/index',
      'pages/view/index',
      'pages/view/tip/index',
      'pages/view/avatar/index',
      'pages/view/steps/index',
      'pages/view/preview-image/index',
      'pages/view/timeline/index',
      'pages/view/accordion/index',
      'pages/action/index',
      'pages/action/dialog/index',
      'pages/action/loading/index',
      'pages/action/progress/index',
      'pages/action/swipe-action/index',
      'pages/action/toast/index',
      'pages/action/action-sheet/index',
      'pages/basics/index',
      'pages/basics/button/index',
      'pages/basics/divider/index',
      'pages/basics/icon/index',
      'pages/form/index',
      'pages/form/input/index',
      'pages/navigation/index',
      'pages/form/image-picker/index',
      'pages/form/switch/index',
      'pages/form/radio/index',
      'pages/form/checkbox/index',
      'pages/form/cascader/index',
      'pages/form/calendar/index',
      'pages/form/select/index',
      'pages/layout/index',
      'pages/layout/float-layout/index',
      'pages/layout/long-list/index',
      'pages/navigation/tabs/index',
      'pages/form/picker/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
