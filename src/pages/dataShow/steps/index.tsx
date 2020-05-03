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
}
export default class Index extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '数据展示'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current1: 0,
      current2: 1,
      current3: 2,
      current4: 1,
      current5: 1,
      current6: 1,
      current7: 1,
      current8: 1,
    }
  }

  onChange(stateName, current) {
    // @ts-ignore
    this.setState({
      [stateName]: current
    })
  }

  render() {
    const items1 = [
      { title: '填写信息' },
      { title: '选择方案' },
      { title: '确认订单' },
      { title: '完成支付' }
    ]
    const items2 = [
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' },
      { title: '步骤四' }
    ]

    const items3 = [
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' }
    ]

    const items4 = [
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' },
      { title: '步骤四' }
    ]

    const items5 = [
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' },
    ]
    const items6 = [
      { title: '填写信息' },
      { title: '选择方案' },
      { title: '确认订单' },
      { title: '完成支付' }
    ]
    const items7 = [
      { title: '步骤一' },
      { title: '步骤二' },
      { title: '步骤三' },
    ]
    const items8 = [
      { title: '填写信息' },
      { title: '选择方案' },
      { title: '确认订单' },
      { title: '完成支付' }
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
              </View>
            </View>
          </View>
          {/* 带图标 */}
          <View className='panel'>
            <View className='panel__title'>带图标</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtSteps
                  items={items4}
                  icon
                  current={this.state.current4}
                  onChange={this.onChange.bind(this, 'current4')}
                />
                <AtSteps
                  items={items6}
                  icon
                  current={this.state.current6}
                  onChange={this.onChange.bind(this, 'current6')}
                />
                <AtSteps
                  items={items5}
                  icon
                  current={this.state.current5}
                  onChange={this.onChange.bind(this, 'current5')}
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
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
