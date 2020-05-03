import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

// import AtFloatLayout from "../../../components/float-layout/index"

// import AtDivider from "../../../components/divider/index"

import {AtFloatLayout, AtDivider} from 'taro-x'

import './index.scss'

interface IState{
  isOpened: boolean
  titleShow: boolean
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
        isOpened: false,
        titleShow: true
      }
    }

    handleClick() {
      this.setState({
        isOpened: true
      })
    }
  
    componentWillMount () { }
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    close(){
      this.setState({
        isOpened: false
      })
    }

    changeHeaderTitle(){
      this.setState({
        titleShow: !this.state.titleShow 
      })
    }

    renderHeader () {
      let {titleShow} = this.state
      return <View className="my-layout-header">
        <View>{titleShow? '标题A' : '标题B'}</View>
        <View onClick = {this.close.bind(this)}>关闭</View>
      </View>
    }

    render () {
      const {isOpened} = this.state
      return (
        <View className="layout-container">
          <Button onClick = {this.handleClick.bind(this)}>带标题弹层</Button>
          <AtFloatLayout isOpened = {isOpened} renderHeader = {this.renderHeader()}>
            <AtDivider height={1}/>
            <View onClick = {this.changeHeaderTitle.bind(this)}>
              点击来改变header的title文字
            </View>
          </AtFloatLayout>
        </View>
      )
    }
  }