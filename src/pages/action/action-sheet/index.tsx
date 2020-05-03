import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

import {AtButton, AtDialog, AtDialogContent, AtDialogAction, AtActionSheet} from 'taro-x'

interface IState{
  isOpened1: boolean,
  isOpened2: boolean,

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
    navigationBarTitleText: '动作面板'
  }

  constructor () {
    super(...arguments)
    this.showToast = this.showToast.bind(this)
    this.state = {
      isOpened1: false,
      isOpened2: false
    }
  }

  closeModal = (type, msg) => {
    console.log(msg)

    // @ts-ignore
    this.setState({
      [type]: false
    })

    Taro.showToast({
      icon: 'none',
      title: msg
    })
  }

  handleClick = type => {
    console.log('handleClick')
    // @ts-ignore
    this.setState({
      [type]: true
    },()=>{console.log(this.state);
    })
  }

  showToast(msg){
    Taro.showToast({
      icon: 'none',
      title: msg
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
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
              <View className='atbutton-container'>
                <AtButton onClick={this.handleClick.bind(this, 'isOpened1')}>
                      底部样式
                </AtButton>
              </View>
            </View>
          </View>

          {/* 多行文案样式 */}
          <View className='panel'>
            <View className='panel__title'>多行文案样式</View>
            <View className='panel__content no-padding'>
              <View className='atbutton-container'>
                <AtButton onClick={this.handleClick.bind(this, 'isOpened2')}>
                      中部样式
                </AtButton>
              </View>
            </View>
          </View>

        </View>
        {/* E Body */}
        {/* 基本样式 */}
        <AtActionSheet 
            isOpened = {this.state.isOpened1}
            onClose={this.closeModal.bind(this, 'isOpened1', '底部样式面板被关闭了')}
            type = 'center'
            actionList = {[
              {
                onClick: () => {this.showToast('收藏')},
                key: '收藏',
                text: '收藏'
              },
              {
                onClick: () => {this.showToast('编辑')},
                key: '编辑',
                text: '编辑'
              },
              {
                onClick: () => {this.showToast('举报')},
                key: '举报',
                text: '举报'
              },
              {
                style: 'color: #FB4A41',
                onClick: () => {this.showToast('删除')},
                key: '删除',
                text: '删除'
              }
            ]}    
        ></AtActionSheet>
        <AtActionSheet 
            isOpened = {this.state.isOpened2}
            onClose={this.closeModal.bind(this, 'isOpened2', '中部样式面板被关闭了')}
            type = 'bottom'
            actionList = {[
              {
                onClick: () => {this.showToast('取消'); this.closeModal('isOpened2','中部样式面板被关闭了')},
                type: 'bottom',
                key: '取消',
                text: '取消'
              },
              {
                onClick: () => {this.showToast('编辑')},
                key: '编辑',
                text: '编辑'
              },
              {
                style: 'color: #FB4A41',
                onClick: () => {this.showToast('删除')},
                key: '删除',
                text: '删除'
              }
            ]}    
        ></AtActionSheet>
        {/* <AtDialog
          isOpened={isOpened1}
          onClose={this.closeModal.bind(this, 'isOpened1', 'Dialog1被关闭了')}
        >
          <AtDialogContent>
            <View className='modal-content'>
              <View className = 'modal-text'>文案或数据</View>
            </View>
          </AtDialogContent>
          <AtDialogAction>
            <Button onClick={this.closeModal.bind(this, 'isOpened1', '点击了取消')}>
              取消
            </Button>
            <Button onClick={this.closeModal.bind(this, 'isOpened1', '点击了确定')}>
              确定
            </Button>
          </AtDialogAction>
        </AtDialog> */}
      </View>      
    )
  }
}
