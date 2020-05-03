import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'

// import AtList from '../../components/list/index'
// import AtListItem from '../../components/list/item/index'
import {AtList, AtListItem} from 'taro-x'
import bg from '../../static/image/home-bg.svg'
import logo from '../../static/image/home-logo.png'


import basicsIcon from '../../static/image/basics-icon.svg'
import actionIcon from '../../static/image/action-icon.svg'
import navigationIcon from '../../static/image/navigation-icon.svg'
import formIcon from '../../static/image/form-icon.svg'
import viewIcon from '../../static/image/view-icon.svg'

import './index.scss'

interface IState{
  // bgHeight: number
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
    navigationBarTitleText: '首页'
  }

  constructor () {
    super(...arguments)
    // this.onBgImageLoad = this.onBgImageLoad.bind(this)
    this.state = {
      // bgHeight: 0
    }
  }
  
  handleClick(url){
    Taro.navigateTo({
      url: `/pages/${url}/index`
    })
  }

  // onBgImageLoad(e){
    
  //   const query: any = Taro.createSelectorQuery()
  //   query.select("#bg").boundingClientRect((rect) => {
  //     console.log('onload', rect)
  //     this.setState({
  //       bgHeight: rect.height
  //     })
  //   }).exec()
  // }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // let {
    //   bgHeight
    // } = this.state
    // let style = `margin-top: -${bgHeight}px`
    // console.log('bgHeight', bgHeight, style)
    return (
      <View className='index-container clear'>
        <Image 
          id = 'bg'
          className ='bg' 
          src={bg}
          mode = 'widthFix'
          // onLoad = {this.onBgImageLoad}
        />
        <View className="content-wraper" /*style={style}*/>
            <Image 
                className ='logo'
                style={{width: Taro.pxTransform(136), height: Taro.pxTransform(134), marginTop: Taro.pxTransform(40)}}
                src={logo}
            />
          <View className="content-title"> Taro-x</View>
          <AtList hasBorder={false} className='content'>
            <AtListItem
              className = 'without-margin-top'
              onClick={this.handleClick.bind(this, 'basics')}
              hasBorder={false}
              title='基础组件'
              arrow='right'
              thumb={basicsIcon}
            />
            <AtListItem
              
              onClick={this.handleClick.bind(this, 'view')}
              hasBorder={false}        
              title='视图组件'
              // note='描述信息'
              arrow='right'
              thumb={viewIcon}
            />
            <AtListItem
              onClick={this.handleClick.bind(this, 'navigation')}
              hasBorder={false}
              title='导航组件'
              // note='描述信息'
              arrow='right'
              thumb={navigationIcon}
            />
            <AtListItem
              onClick={this.handleClick.bind(this, 'action')}
              hasBorder={false}
              title='操作反馈'
              // note='描述信息'
              arrow='right'
              thumb={actionIcon}
            />
            <AtListItem
              onClick={this.handleClick.bind(this, 'form')}
              hasBorder={false}
              title='表单组件'
              // note='描述信息'
              arrow='right'
              thumb={formIcon}
            />
            <AtListItem
              onClick={this.handleClick.bind(this, 'layout')}
              hasBorder={false}
              title='布局组件'
              // note='描述信息'
              arrow='right'
              thumb={basicsIcon}
            />
            {/* <AtListItem
              hasBorder={false}
              title='业务组件'
              note='描述信息'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            /> */}
          </AtList>
        </View>
      </View>
    )
  }
}
