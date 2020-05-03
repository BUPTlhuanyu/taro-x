import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

// import AtButton from '../../../components/button/index'

// import AtDialog from "../../../components/dialog/index"
// import AtDialogContent from '../../../components/dialog/content/index'
// import AtDialogAction from '../../../components/dialog/action/index'
import {AtButton, AtDialog, AtDialogContent, AtDialogAction} from 'taro-x'

import './index.scss'

interface IState{
  isOpened1: boolean,
  isOpened2: boolean,
  isOpened3: boolean,
  isOpened4: boolean
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
      isOpened1: false,
      isOpened2: false,
      isOpened3: false,
      isOpened4: false
    }
  }

  closeModal = (type, msg) => {
    console.log(msg)

    // @ts-ignore
    this.setState({
      [type]: false
    })

    // Taro.showToast({
    //   icon: 'none',
    //   title: msg
    // })
  }

  handleClick = type => {
    console.log('handleClick')
    // @ts-ignore
    this.setState({
      [type]: true
    },()=>{console.log(this.state);
    })
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { isOpened1, isOpened2, isOpened3, isOpened4 } = this.state
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
                <AtButton onClick={this.handleClick.bind(this, 'isOpened1')} type='primary'>
                      基本样式
                </AtButton>
              </View>
            </View>
          </View>

          {/* 多行文案样式 */}
          <View className='panel'>
            <View className='panel__title'>多行文案样式</View>
            <View className='panel__content no-padding'>
              <View className='atbutton-container'>
                <AtButton onClick={this.handleClick.bind(this, 'isOpened2')} type='primary'>
                      多行文案样式
                </AtButton>
              </View>
            </View>
          </View>
                  
          {/* 带标题样式 */}
          <View className='panel'>
            <View className='panel__title'>带标题样式</View>
            <View className='panel__content no-padding'>
              <View className='atbutton-container'>
                <AtButton onClick={this.handleClick.bind(this, 'isOpened3')} type='primary'>
                      带标题样式
                </AtButton>
              </View>
            </View>
          </View>
          {/* 单按钮 */}
          <View className='panel'>
            <View className='panel__title'>单按钮样式</View>
            <View className='panel__content no-padding'>
              <View className='atbutton-container'>
                <AtButton onClick={this.handleClick.bind(this, 'isOpened4')} type='primary'>
                    单按钮样式
                </AtButton>
              </View>
            </View>
          </View>
                    {/* 单按钮 */}
                    <View className='panel'>
            <View className='panel__title'>单按钮样式</View>
            <View className='panel__content no-padding'>
              <View className='atbutton-container'>
                <View onClick={this.handleClick.bind(this, 'isOpened4')} className="test">
                    单按钮样式
                </View>
              </View>
            </View>
          </View>
          <View style={{height: '1000px'}}></View>
        </View>
        {/* E Body */}
        {/* 基本样式 */}
        <AtDialog
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
        </AtDialog>
        {/* 多行文案样式 */}
        <AtDialog
          isOpened={isOpened2}
          onClose={this.closeModal.bind(this, 'isOpened2', 'Dialog2被关闭了')}
        >
          <AtDialogContent>
            <View className='modal-content'>
              <View className = 'modal-text'>通过一个浮层向用户反馈相关的操作结果。对用户的打断性强，一般用于重要的反馈提示、或者一些低频操作中</View>
            </View>
          </AtDialogContent>
          <AtDialogAction>
            <Button onClick={this.closeModal.bind(this, 'isOpened2', '点击了取消')}>
              取消
            </Button>
            <Button onClick={this.closeModal.bind(this, 'isOpened2', '点击了确定')}>
              确定
            </Button>
          </AtDialogAction>
        </AtDialog>
        {/* 带标题样式 */}
        <AtDialog
          isOpened={isOpened3}
          onClose={this.closeModal.bind(this, 'isOpened3', 'Dialog3被关闭了')}
        >
          <AtDialogContent>
            <View className='modal-content'>
              <View className = 'modal-header'>识别行驶证首页</View>
              <View className = 'modal-text'>给与用户一个反馈的提示通过浮层向用户反馈相关操作结果</View>
            </View>
          </AtDialogContent>
          <AtDialogAction>
            <Button onClick={this.closeModal.bind(this, 'isOpened3', '点击了取消')}>
              取消
            </Button>
            <Button onClick={this.closeModal.bind(this, 'isOpened3', '点击了确定')}>
              确定
            </Button>
          </AtDialogAction>
        </AtDialog>
        {/* 单按钮样式 */}
        <AtDialog
          isOpened={isOpened4}
          onClose={this.closeModal.bind(this, 'isOpened4', 'Dialog4被关闭了')}
        >
          <AtDialogContent>
            <View className='modal-content'>
              <View className = 'modal-header'>识别行驶证首页</View>
              <View className = 'modal-text'>给与用户一个反馈的提示通过浮层向用户反馈相关操作结果</View>
            </View>
          </AtDialogContent>
          <AtDialogAction>
            <Button onClick={this.closeModal.bind(this, 'isOpened4', '点击了确定')}>
              确定
            </Button>
          </AtDialogAction>
        </AtDialog>
      </View>      
    )
  }
}
