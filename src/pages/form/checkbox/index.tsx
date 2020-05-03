import Taro, { Component, Config }from '@tarojs/taro'
import { View } from '@tarojs/components'
// import AtCheckbox from '../../../components/checkbox/index'
import {AtCheckbox} from 'taro-x'
import './index.scss'
interface IState{
  checkedList1: string[],
  checkedList2: string[],
  checkedList3: string[],
  checkboxOption1: any[],
  checkboxOption2: any[],
  checkboxOption3: any[],
}
export default class Index extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '表单组件'
  }

  constructor () {
    super(...arguments)
    this.state = {
      checkedList1: ['list1'],
      checkedList2: ['list1'],
      checkedList3: ['list1', 'list4'],
      checkboxOption1: [
        { value: 'list1', label: 'iPhone X' },
        { value: 'list2', label: 'HUAWEI' },
        { value: 'list3', label: 'OPPO' },
        { value: 'list4', label: 'VIVO', checkboxStyle: {marginTop: '20px'} },
      ],
      checkboxOption2: [
        { value: 'list1', label: 'iPhone X' },
        { value: 'list2', label: 'HUAWEI P20' },
        { value: 'list3', label: 'OPPO Find X' }
      ],
      checkboxOption3: [
        { value: 'list1', label: 'iPhone X' },
        { value: 'list2', label: 'HUAWEI' },
        { value: 'list3', label: 'OPPO', disabled: true },
        { value: 'list4', label: 'VIVO', checkboxStyle: {marginTop: '20px'}, disabled: true }
      ]
    }
  }

  handleChange (value) {
    this.setState({
      checkedList1: value
    }, () => {
      console.log('checkedList1-->', this.state.checkedList1);
    })
  }

  handleChangeThd (value) {
    this.setState({
      checkedList3: value
    }, () => {
      console.log('checkedList2-->', this.state.checkedList3);
    })
  }

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
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.checkboxOption1}
                    selectedList={this.state.checkedList1}
                    onChange={this.handleChange.bind(this)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* 选项禁用 */}
          <View className='panel'>
            <View className='panel__title'>选项禁用</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
                <View className='checkbox-container'>
                  <AtCheckbox
                    options={this.state.checkboxOption3}
                    selectedList={this.state.checkedList3}
                    onChange={this.handleChangeThd.bind(this)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* E Body */}
      </View>
    )
  }
}
