import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import AtTabs from '../../../components/tabs/index'
// import AtTabsPane from '../../../components/tabs-pane/index'

import {AtTabs, AtTabsPane} from 'taro-x'
import './index.scss'
interface IState{
  current0: number,
  current1: number,
  current2: number,
  current3: number,
  current4: number,
  current5: number,
  current6: number,
}
export default class Index extends Component<{}, IState> {
  config = {
    navigationBarTitleText: 'Taro UI'
  }
  constructor () {
    super(...arguments)
    this.state = {
      current0: 0,
      current1: 0,
      current2: 0,
      current3: 0,
      current4: 0,
      current5: 0,
      current6: 0,
    }
  }
  handleClick (stateName, value) {
    // @ts-ignore
    this.setState({
      [stateName]: value
    })
  }
  handleCardClick = (index) => {
    this.setState({
      current6: index
    })
  }
  render () {
    const { current0, current1, current2, current3, current4, current5, current6 } = this.state
    const tabList1 = [{ title: '奖励明细' }, { title: '月度收入' }, { title: '提现记录' }]
    const tabList2 = [
      { title: '标签页1' },
      { title: '标签页2' },
      { title: '标签页3' },
      { title: '标签页4' },
      { title: '标签页5' },
      { title: '标签页6' }
    ]
    const tabList3 = [
      { des: '基本计划1', money: 10 },
      { des: '基本计划2', money: 20 },
      { des: '基本计划3', money: 30 },
    ]
    return (
      <View className='page'>

        <View className='doc-body'>
          {/* 基础用法 */}
       
          <View className='panel'>
            <View className='panel__title'>等宽标签栏</View>
            <View className='panel__content'>
              <AtTabs swipeable={false} current={current0} tabList={tabList1} onClick={this.handleClick.bind(this, 'current0')}>
                <AtTabsPane current={current0} index={0} >
                  <View className='tab-content'>
                    <View className='content1'>标签页一的内容</View>
                  </View>
                </AtTabsPane>
                <AtTabsPane current={current0} index={1}>
                  <View className='tab-content'>
                    <View className='content2'>标签页二的内容</View>
                  </View>
                </AtTabsPane>
                <AtTabsPane current={current0} index={2}>
                  <View className='tab-content'>
                    <View className='content3'>标签页三的内容</View>
                  </View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>等宽标签栏-带提示</View>
            <View className='panel__content'>
              <View>props: redTipStyle 可以控制提示（小红点）样式</View>
              <AtTabs swipeable={false} current={current1} hasRedTip={true} redTipIndex={1}  tabList={tabList1} onClick={this.handleClick.bind(this, 'current1')}>
                <AtTabsPane current={current1} index={0} >
                  <View className='tab-content'>标签页一的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current1} index={1}>
                  <View className='tab-content'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current1} index={2}>
                  <View className='tab-content'>标签页三的内容</View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>滚动标签栏</View>
            <View className='panel__content'>
              <AtTabs swipeable={false} scroll current={current2} tabList={tabList2} onClick={this.handleClick.bind(this, 'current2')}>
                <AtTabsPane current={current2} index={0}>
                  <View className='tab-content'>标签页一的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current2} index={1}>
                  <View className='tab-content'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current2} index={2}>
                  <View className='tab-content'>标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current2} index={3}>
                  <View className='tab-content'>标签页四的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current2} index={4}>
                  <View className='tab-content'>标签页五的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current2} index={5}>
                  <View className='tab-content'>标签页六的内容</View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>滑动切换内容</View>
            <View className='panel__content'>
              <AtTabs current={current3} tabList={tabList1} onClick={this.handleClick.bind(this, 'current3')}>
                <AtTabsPane current={current3} index={0}>
                  <View className='tab-content'>标签页一的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current3} index={1}>
                  <View className='tab-content'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current3} index={2}>
                  <View className='tab-content'>标签页三的内容</View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>垂直模式</View>
            <View className='panel__content'>
              <AtTabs height='200px' scroll tabDirection='vertical' current={current4} tabList={tabList2} onClick={this.handleClick.bind(this, 'current4')}>
                <AtTabsPane tabDirection='vertical' current={current4} index={0}>
                  <View className='tab-content--vertical'>标签页一的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current4} index={1}>
                  <View className='tab-content--vertical'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current4} index={2}>
                  <View className='tab-content--vertical'>标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current4} index={3}>
                  <View className='tab-content--vertical'>标签页四的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current4} index={4}>
                  <View className='tab-content--vertical'>标签页五的内容</View>
                </AtTabsPane>
                <AtTabsPane tabDirection='vertical' current={current4} index={5}>
                  <View className='tab-content--vertical'>标签页六的内容</View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>禁止内容切换动画</View>
            <View className='panel__content'>
              <AtTabs current={current5} animated={false} tabList={tabList1} onClick={this.handleClick.bind(this, 'current5')}>
                <AtTabsPane current={current5} index={0}>
                  <View className='tab-content'>标签页一的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current5} index={1}>
                  <View className='tab-content'>标签页二的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current5} index={2}>
                  <View className='tab-content'>标签页三的内容</View>
                </AtTabsPane>
                <AtTabsPane current={current5} index={3}>
                  <View className='tab-content'>标签页四的内容</View>
                </AtTabsPane>
              </AtTabs>
            </View>
          </View>
          <View className='panel'>
            <View className='panel__title'>卡片式</View>
              <View style={{fontSize: '15px'}}>按下面样式 开发者手写更合适</View>
              <View className='panel__content'>
                <View className='card-tabs-example'>
                  <View className='card-tabs-titles'>
                    {
                      tabList3.map((item, index) => 
                        <View 
                          className={[current6 === index ? 'card-tabs-title-item--active' : '', 'card-tabs-title-item'].join(' ')}
                          onClick={() => this.handleCardClick(index)}
                        >
                          <View className='card-tabs-title-item-money'>{item.money}</View>
                          <View className='card-tabs-title-item-des'>{item.des}</View>
                        </View>
                      )
                    }
                  </View>
                  <View className='card-tabs-content'>
                    <View className="card-tabs-content-item" style={current6 === 0 ? 'display: block': ''}>标签页一的内容</View>
                    <View className="card-tabs-content-item" style={current6 === 1 ? 'display: block': ''}>标签页二的内容</View>
                    <View className="card-tabs-content-item" style={current6 === 2 ? 'display: block': ''}>标签页三的内容</View>
                  </View>
                </View>
              </View>
          </View>
        </View>
      </View>
    )
  }
}
