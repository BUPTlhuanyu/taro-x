import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
// import AtRadio from '../../../components/radio/index'
import {AtRadio} from 'taro-x'
import './index.scss'
interface IState{
  radioValue1: string,
  radioValue2: string,
  radioValue3: string,
  radioValue4: string,
  radioOptions1: any[],
  radioOptions2: any[],
  radioOptions3: any[],
  radioOptions4: any[],
}
export default class Index extends Component<{}, IState> {
  config: Config = {
    navigationBarTitleText: '表单组件'
  }
  constructor () {
    super(...arguments)
    this.state = {
      radioValue1: 'option1',
      radioValue2: 'option1',
      radioValue3: 'option1',
      radioValue4: 'option1',
      radioOptions1: [
        { label: '单选项一', value: 'option1' },
        { label: '单选项二', value: 'option2' },
        { label: '单选项三', value: 'option3' },
        { label: '单选项四', value: 'option4', radioStyle: {marginTop: '20px'} },
      ],
      radioOptions2: [
        { label: '单选项一', value: 'option1' },
        { label: '单选项二', value: 'option2' },
        { label: '单选项三', value: 'option3' },
        { label: '单选项四', value: 'option4', radioStyle: {marginTop: '20px'} },
      ],
      radioOptions4: [
        { label: '单选项一', value: 'option1' },
        { label: '单选项二', value: 'option2' },
        { label: '单选项三', value: 'option3' },
        { label: '单选项四', value: 'option4', radioStyle: {marginTop: '20px'} },
      ],
      radioOptions3: [
        { label: '单选项一', value: 'option1'},
        { label: '单选项二', value: 'option2'},
        { label: '禁用', value: 'option3', disabled: true }
      ],
    }
  }

  handleRadioChange (value) {
    this.setState({
      radioValue1: value
    })
  }

  handleRadioChangeScnd (value) {
    this.setState({
      radioValue2: value
    })
  }

  handleRadioChangeThd (value) {
    this.setState({
      radioValue3: value
    })
  }
  handleRadioChangeFour (value) {
    this.setState({
      radioValue4: value
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
              <View className='radio-container my-radio-container'>
                <AtRadio options={this.state.radioOptions1} value={this.state.radioValue1} onClick={this.handleRadioChange.bind(this)} />
              </View>
            </View>
          </View>

          {/* button样式 */}
          <View className='panel'>
            <View className='panel__title'>button样式</View>
            <View className='panel__content no-padding'>
              <View className='radio-container'>
                <AtRadio options={this.state.radioOptions2} typeRadio="button" value={this.state.radioValue2} onClick={this.handleRadioChangeScnd.bind(this)} />
              </View>
            </View>
          </View>
          {/* button样式 */}
          <View className='panel'>
            <View className='panel__title'>buttonBlue样式</View>
            <View className='panel__content no-padding'>
              <View className='radio-container'>
                <AtRadio options={this.state.radioOptions4} typeRadio="buttonBlue" value={this.state.radioValue4} onClick={this.handleRadioChangeFour.bind(this)} />
              </View>
            </View>
          </View>

          {/* 单项禁用 */}
          <View className='panel'>
            <View className='panel__title'>单项禁用</View>
            <View className='panel__content no-padding'>
              <View className='radio-container'>
                <AtRadio options={this.state.radioOptions3} value={this.state.radioValue3} onClick={this.handleRadioChangeThd.bind(this)} />
              </View>
            </View>
          </View>
        </View>
        {/* E Body */}
      </View>
    )
  }
}
