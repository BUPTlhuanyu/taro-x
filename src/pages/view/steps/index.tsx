import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import AtSteps from '../../../components/steps/index'

import {AtSteps} from 'taro-x'

import './index.scss'
interface IState {
  current1: number,
  current2: number,
  current3: number,
  current4: number,
  current5: number,
  current6: number,
  current7: number,
  current8: number,
  current9: number,
  current11: number,
  current21: number,
  current31: number,
  current41: number,
  current51: number,
  current61: number
}
export default class Index extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '数据展示'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current1: 1,//当前数据高亮项
      current2: 1,
      current3: 1,
      current4: 1,
      current5: 1,
      current6: 0,
      current7: 1,
      current8: 1,
      current9: 1,
      current11: 2,
      current21: 1,
      current31: 3,
      current41: 1,
      current51: 2,
      current61: 1
    }
  }

  onChange(stateName, current) {
    // @ts-ignore
    this.setState({
      [stateName]: current
    })
  }

  render() {
    const items1 = [//4项  每项2字
      { title: '计划' },
      { title: '投保' },
      { title: '订单' },
      { title: '完成' }
    ]
    const items2 = [
      { title: '计划一' },
      { title: '投保中' },
      { title: '订单数' },
      { title: '完成了' }
    ]

    const items3 = [
      { title: '填写信息' },
      { title: '选择方案' },
      { title: '确认订单' },
      { title: '完成支付' }
    ]

    const items4 = [
      { title: '填写计划一' },
      { title: '选择方案数' },
      { title: '确认订单表' },
      { title: '完成支付额' }
    ]

    const items5 = [
      { title: '计划' },
      { title: '投保' },
      { title: '订单' },
    ]
    const items6 = [
      { title: '基本信息' },
      { title: '上传资料' },
    ]
    const items7 = [
      { title: '基本信息' },
      { title: '事故详情' },
      { title: '个人信息' },
    ]
    const items8 = [
      { title: '基本信息' },
      { title: '事故详情' },
      { title: '个人信息' },
      { title: '核对信息' }
    ]
    const items9 = [
      { title: '基本信息' },
      { title: '事故详情' },
      { title: '个人信息' },
      { title: '核对信息' },
      { title: '完成' }
    ]

    return (
      <View className='page'>
        <View className='doc-body'>
          {/* 基础用法 */}
          <View className='panel'>
            <View className='panel__title'>基础用法</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtSteps
                  items={items1}
                  current={this.state.current1}
                  onChange={this.onChange.bind(this, 'current1')}
                />
                <AtSteps
                  items={items2}
                  current={this.state.current2}
                  onChange={this.onChange.bind(this, 'current2')}
                />
                <AtSteps
                  items={items3}
                  current={this.state.current3}
                  onChange={this.onChange.bind(this, 'current3')}
                />
                {/* 状态分三步*/}
                <AtSteps
                  items={items5}
                  current={this.state.current3}
                  onChange={this.onChange.bind(this, 'current4')}
                />
              </View>
            </View>
          </View>

          {/* 带图标 */}
          <View className='panel'>
            <View className='panel__title'>带图标</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtSteps
                  items={items1}
                  icon
                  current={this.state.current11}
                  onChange={this.onChange.bind(this, 'current11')}
                />
                <AtSteps
                  items={items2}
                  icon
                  current={this.state.current21}
                  onChange={this.onChange.bind(this, 'current21')}
                />
                <AtSteps
                  items={items3}
                  icon
                  current={this.state.current31}
                  onChange={this.onChange.bind(this, 'current31')}
                />
                <AtSteps
                  items={items4}
                  icon
                  current={this.state.current41}
                  onChange={this.onChange.bind(this, 'current41')}
                />
                <AtSteps
                  items={items5}
                  icon
                  current={this.state.current51}
                  onChange={this.onChange.bind(this, 'current51')}
                />
              </View>
            </View>
          </View>


          {/* 状态步骤条 */}
          <View className='panel'>
            <View className='panel__title'>状态步骤条</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtSteps
                  items={items6}
                  current={this.state.current6}
                  type="circular"
                  onChange={this.onChange.bind(this, 'current6')}
                />
                <AtSteps
                  items={items6}
                  current={this.state.current61}
                  type="circular"
                  onChange={this.onChange.bind(this, 'current6')}
                />
                <AtSteps
                  items={items7}
                  current={this.state.current7}
                  type="circular"
                  onChange={this.onChange.bind(this, 'current7')}
                />
                <AtSteps
                  items={items8}
                  current={this.state.current8}
                  type="circular"
                  onChange={this.onChange.bind(this, 'current8')}
                />
                <AtSteps
                  items={items9}
                  current={this.state.current9}
                  type="circular"
                  onChange={this.onChange.bind(this, 'current9')}
                />
              </View>
            </View>
          </View>

          {/* 特殊用法  5个字的通常需要做吸顶处理，而不需要内容框的边距处理 */}
          {/* <View className='panel__title'>特殊用法</View>
          <View className='panel panel-fixed-top'>
            <AtSteps
              items={items4}
              current={this.state.current4}
              onChange={this.onChange.bind(this, 'current4')}
            />

            <AtSteps
              items={items4}
              icon
              current={this.state.current4}
              onChange={this.onChange.bind(this, 'current4')}
            />
          </View> */}
        </View>
      </View>
    )
  }
}
