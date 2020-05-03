import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtButton from '../../../components/button/index'
// import AtToast from '../../../components/toast/index'

import {AtButton, AtToast} from 'taro-x'

import logo from '../../../static/image/home-logo.png'

interface IState{
  isOpened: boolean
  text: string,
  icon: string,
  hasMask: boolean,
  image: string,
  duration: number,
  status: 'error' | 'loading' | 'success' | '',
  onClick: () => void,
  onClose: () => void
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
    navigationBarTitleText: '轻提示'
  }

  constructor(){
    super()
    this.showToast1 = this.showToast1.bind(this)
    this.showToast2 = this.showToast2.bind(this)
    this.showToast3 = this.showToast3.bind(this)
    this.state = {
      isOpened: false,
      text: '',
      icon: '',
      hasMask: false,
      image: '',
      duration: 0,
      status: '',
      onClick: () => {},
      onClose: () => {}
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  showToast1(){
    Taro.showToast({
      title: '轻提示',
      icon: "none",
      duration: 2000
    })
  }

  showToast2(){
    Taro.showToast({
      title: '轻提示',
      duration: 2000
    })
  }

  showToast3(){
    Taro.showToast({
      title: '轻提示',
      image: logo,
      duration: 2000
    })
  }

  handleClick(state){
    const newState = Object.assign({}, this.state, state)
    this.setState(newState)
  }

  render () {
    const {
      isOpened,
      text,
      icon,
      hasMask,
      image,
      duration,
      status,
      onClick,
      onClose
    } = this.state
    return (
      <View className='page'>
        {/* S Header */}
        {/* E Header */}

        {/* S Body */}
        <View className='doc-body'>
          {/* Taro自带showToast的API基本样式 */}
          <View className='panel'>
            <View className='panel__title'>Taro自带showToast的API</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                
                <AtButton onClick={this.showToast1}>
                          纯文本
                </AtButton>     
              </View>
              <View className='example-item'>
                <AtButton onClick={this.showToast2}>
                          带图标
                </AtButton>    
              </View>
              <View className='example-item'>
                <AtButton onClick={this.showToast3}>
                          带图片
                </AtButton>     
              </View>
            </View>
          </View>
          {/* 基本样式 */}
          <View className='panel'>
            <View className='panel__title'>基本样式</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, {
                        isOpened: true,
                        text: '纯文本',
                        icon: '',
                        hasMask: false,
                        image: '',
                        status: '',
                        duration: 2000,
                        onClick: () => {},
                        onClose: () => {}
                })}>
                          纯文本
                </AtButton>  
              </View>
              <View className='example-item'>
              <AtButton onClick={this.handleClick.bind(this, {
                        isOpened: true,
                        text: '带图标',
                        icon: '',
                        hasMask: false,
                        image: '',
                        status: 'success',
                        duration: 2000,
                        onClick: () => {},
                        onClose: () => {}
                })}>
                          带图标
                </AtButton> 
              </View>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, {
                        isOpened: true,
                        text: '带图片',
                        icon: '',
                        hasMask: false,
                        image: logo,
                        status: '',
                        duration: 3000,
                        onClick: () => {},
                        onClose: () => {}
                })}>
                          带图片
                </AtButton>  
              </View>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, {
                        isOpened: true,
                        text: 'mask',
                        icon: '',
                        hasMask: true,
                        image: logo,
                        status: '',
                        duration: 3000,
                        onClick: () => {},
                        onClose: () => {}
                })}>
                          mask,背后按钮不可点击
                </AtButton>  
              </View>
              <View className='example-item'>
                <AtButton onClick={this.handleClick.bind(this, {
                        isOpened: true,
                        text: 'loading',
                        icon: '',
                        hasMask: true,
                        image: logo,
                        status: 'loading',
                        duration: 3000,
                        onClick: () => {},
                        onClose: () => {}
                })}>
                          loading
                </AtButton>  
              </View>
              <AtToast 
                  isOpened = {isOpened}
                  text = {text}
                  icon = {icon}
                  hasMask = {hasMask}
                  image = {image}
                  duration = {duration}
                  status = {status}
                  onClick = {onClick}
                  onClose = {onClose}
              />   
            </View>
          </View>          
        </View>
      </View>      
    )
  }
}
