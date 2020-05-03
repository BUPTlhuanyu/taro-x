import Taro, {Component, Config} from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import { AtDivider, AtToast } from 'taro-x'

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
    navigationBarTitleText: '分割线'
  }

  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(){
    this.setState({
      isOpened: true,
      text: '点击',
      icon: '',
      hasMask: false,
      image: '',
      status: 'success',
      duration: 2000,
      onClick: () => {},
      onClose: () => {}
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
          {/* 基本样式 */}
          <View className='panel'>
            <View className='panel__title'>基本样式</View>
            <View className='panel__content no-padding'>
              <AtDivider/>
              <AtDivider lineStyle="dashed"/>
              <AtDivider lineStyle="dotted"/>
            </View>
          </View>

          {/* 带信息 */}
          <View className='panel'>
            <View className='panel__title'>带信息</View>
            <View className='panel__content no-padding'>
              <AtDivider content='分割线' fontColor='#E3E6E9' fontSize="50"/>
              <AtDivider lineStyle="dashed" content='分割线' fontColor='#E3E6E9' fontSize="30"/>
              <AtDivider lineStyle="dotted" content='分割线' fontColor='#E3E6E9' fontSize="10"/>
              <AtDivider icon='check-circle' fontColor='#E3E6E9' fontSize="50"/>
              <AtDivider lineStyle="dashed" icon='star' fontColor='#E3E6E9' fontSize="30"/>
              <AtDivider lineStyle="dotted" icon='chevron-down' fontColor='#E3E6E9' fontSize="10"/>              
            </View>
          </View>
          {/* 带操作 */}
          <View className='panel'>
            <View className='panel__title'>带操作</View>
            <View className='panel__content no-padding'>
              <AtDivider content='请点击' fontColor='#E3E6E9' fontSize="40" onClick={this.handleClick}/>
            </View>
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
    )
  }
}

