import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtLongList from "../../../components/long-list/index"
// import AtDivider from "../../../components/divider/index"

import {AtLongList, AtDivider} from 'taro-x'

import './index.scss'

interface IState{
  isOpened: boolean
  titleShow: boolean
}

const getTest = function(){
  let test: number[] = []
  for(let i = 0; i<100; i++){
    test.push(i)
  }
  return test
}
 const test = getTest()

export default class Index extends Component<{}, IState> {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
      navigationBarTitleText: '长列表'
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

    render () {
      return (
        <View className='page'>
        {/* S Header */}
        {/* E Header */}

        {/* S Body */}
        <View className='doc-body'>
          {/* 基础用法 */}
          <View className='panel'>
            <View className='panel__title'>基础用法</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className="long-list-container">
                  <AtLongList
                      range = {test}  
                      index={0} 
                      virtualListNum = {10} // 实际渲染的列数： virtualListNum*2+1
                      aboveIndicatorLines = {3} // 放大显示的位置上面存在的列数
                      longListHeight = {600} // 容器高度
                      longListItemPadding = {8} // 每个item的padding
                      longListItemLineHeight = {34} // 每个item的行高
                    
                      longListPadding = {12} // 整个列表的padding  
                  />
                </View>
              </View>
            </View>
          </View>

          {/* 说明 */}
          <View className='panel'>
            <View className='panel__title'>说明</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                  TODO: <AtDivider height = {10}/>
                  1. 惯性滚动
                  <AtDivider height = {10}/>
                  边界处理: <AtDivider height = {10}/>
                  1. 🆗边界处理，index大于range的长度<AtDivider height = {10}/>
                  2. 🆗不满足条件： 容器高度longListHeight > ( aboveIndicatorLines + 1 + 1 ) * 每行盒子高度 ,直接报错
                  <AtDivider height = {10}/>
                  virtualListNum: number, // 实际渲染的行数: virtualListNum*2+1 <AtDivider height = {10}/>
                  aboveIndicatorLines: number, // 放大显示的位置上面存在的行数 <AtDivider height = {10}/>
                  longListHeight: number, // 容器高度，longListHeight = (aboveIndicatorLines + 1) * 盒子行高 + longListPadding * 2 + 放大显示的位置下存在的行数 * 盒子行高<AtDivider height = {10}/>
                  longListItemPadding: number, // 每个item的padding，盒子行高 = longListItemPadding * 2 + longListItemLineHeight <AtDivider height = {10}/>
                  longListItemLineHeight: number, // 每个item的行高，盒子行高 = longListItemPadding * 2 + longListItemLineHeight <AtDivider height = {10}/>
                  longListPadding: number, // 整个列表的padding <AtDivider height = {10}/>
                  range: Array[], // 传入的所有元素数组 <AtDivider height = {10}/>
                  index: number // 需要展示的元素下标 <AtDivider height = {10}/>
                  indicatorItemScale: number 标记的item需要放大的倍数，默认为1.2
              </View>
            </View>
          </View>
        </View>
        {/* E Body */}
      </View>
      )
    }
  }