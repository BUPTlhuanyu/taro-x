import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

// import AtPicker from "../../../components/picker/index"
import {AtPicker} from 'taro-x'

// import './index.scss'

interface IState{
  isOpenedDay: boolean
  valueDay: Array<any>
  isOpenedMonth: boolean
  valueMonth: Array<any>
  isOpenedYear: boolean
  valueYear: Array<any>
  // fields: 'day' | 'month' | 'year'
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
  
    handleClickDay: () => void
    valueChangeDay: () => void
    handleClickMonth: () => void
    valueChangeMonth: () => void
    handleClickYear: () => void
    valueChangeYear: () => void
    onCancelDay: () => void
    onCancelMonth: () => void
    onCancelYear: () => void

    constructor () {
      super(...arguments)
      this.handleClickDay = this.handleClick.bind(this, 'Day')
      this.valueChangeDay = this.valueChange.bind(this, 'Day')
      this.onCancelDay = this.onCancel.bind(this, 'Day')
      this.handleClickMonth = this.handleClick.bind(this, 'Month')
      this.valueChangeMonth = this.valueChange.bind(this, 'Month')
      this.onCancelMonth = this.onCancel.bind(this, 'Month')
      this.handleClickYear = this.handleClick.bind(this, 'Year')
      this.valueChangeYear = this.valueChange.bind(this, 'Year')
      this.onCancelYear = this.onCancel.bind(this, 'Year')
      this.onCancel = this.onCancel.bind(this, 'Year')
      this.state = {
        isOpenedDay: false,
        valueDay: [],
        isOpenedMonth: false,
        valueMonth: [],
        isOpenedYear: false,
        valueYear: []
        // fields: 'day'
      }
    }

    handleClick(type) {
      let key = `isOpened${type}`
      // @ts-ignore
      this.setState({
        [key]: true
      })
    }
  
    componentWillMount () { }
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    onCancel(type){
      let key = `isOpened${type}`
      // @ts-ignore
      this.setState({
        [key]: false
      })
    }

    valueChange(type, value) {
      let key = `isOpened${type}`
      let valueKey = `value${type}`
      // @ts-ignore
      this.setState({
        [key]: false,
        [valueKey]: value
      })
    }


    render () {
      const {
        isOpenedDay,
        valueDay,
        isOpenedMonth,
        valueMonth,
        isOpenedYear,
        valueYear
      } = this.state
      const getStrVal = function(arr: any[]){
        if(arr.length === 0) return ''
        let newStr =  arr.map((item: string, index) => {
          if(item){
            return item.slice(0, -1)
          }
          return ''
        }).join('-')
        console.log('newStr', newStr)
        return newStr
      }
      return (
            <View className='page'>
              <View className='doc-body'>
                {/* 基础用法 */}
                <View className='panel'>
                  <View className='panel__title'>基础用法</View>
                  <View className='panel__content no-padding'>
                    <View className='example-item'>
                    <View className="layout-container">
                        <Button onClick = {this.handleClickDay}>日期选择器{valueDay.length? `选择了${valueDay[0]}${valueDay[1]}${valueDay[2]}`: `没有选择日期`}</Button>
                        <AtPicker 
                          isOpened = {isOpenedDay} //用于控制弹层的状态
                          onChange={this.valueChangeDay} // 点击确定的时候获取值
                          onCancel = {this.onCancelDay}
                          // start = '1970-09-01'
                          // end = '2170-11-01'
                          fields = 'day'
                          value = {getStrVal(valueDay)}
                          // value = '1975-10-01'
                          >
                            <View style="font-weight: bolder">
                              请选择出生日期
                            </View>
                        </AtPicker>
                      </View>
                    </View>
                  </View>
                </View>
                {/* 双列：请选择年月 */}
                <View className='panel'>
                  <View className='panel__title'>双列：请选择年月</View>
                  <View className='panel__content no-padding'>
                    <View className='example-item'>
                    <View className="layout-container">
                        <Button onClick = {this.handleClickMonth}>日期选择器{valueMonth.length? `选择了${valueMonth[0]}${valueMonth[1]}`: `没有选择日期`}</Button>
                        <AtPicker 
                          isOpened = {isOpenedMonth} //用于控制弹层的状态
                          onChange={this.valueChangeMonth} // 点击确定的时候获取值
                          onCancel = {this.onCancelMonth}
                          // start = '1970-09-01'
                          // end = '2170-11-01'
                          fields = 'month'
                          value = {getStrVal(valueMonth)}
                          >
                            <View style="font-weight: bolder">
                              请选择年月
                            </View>
                        </AtPicker>
                      </View>
                    </View>
                  </View>
                </View>
                {/* 单列：请选择年份 */}
                <View className='panel'>
                  <View className='panel__title'>单列：请选择年份</View>
                  <View className='panel__content no-padding'>
                    <View className='example-item'>
                    <View className="layout-container">
                        <Button onClick = {this.handleClickYear}>日期选择器{valueYear.length? `选择了${valueYear[0]}`: `没有选择日期`}</Button>
                        <AtPicker 
                          isOpened = {isOpenedYear} //用于控制弹层的状态
                          onChange={this.valueChangeYear} // 点击确定的时候获取值
                          onCancel = {this.onCancelYear}
                          // start = '1970-09-01'
                          // end = '2170-11-01'
                          fields = 'year'
                          value = {getStrVal(valueYear)}
                          >
                            <View style="font-weight: bolder">
                              请选择年份
                            </View>
                        </AtPicker>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
      )
    }
  }