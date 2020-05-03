import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

// import Calendar from '../../../components/calendar/index'
import {Calendar} from 'taro-x'
// import './index.scss'

interface IState{
    isShow: boolean,
    selectDate: Array<string>
}

export default class Index extends Component<{}, IState> {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    constructor () {
        super(...arguments)
        this.state = {
            isShow: false,
            selectDate: []
        }
        this.handleClick= this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
  

    componentWillMount () { }
     
    config: Config = {
      navigationBarTitleText: ''
    }
  
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    handleClick(data) {
        this.setState({
            isShow: true
        })
    }
    handleChange(data) {
        console.log(data)
        
        this.setState({
            isShow: false,
            selectDate: data
        })
        
    }   
    render () {
        const {isShow, selectDate} = this.state
        return (
            <View className='page'>
              <View className='doc-body'>
                {/* 基础用法 */}
                <View className='panel'>
                  <View className='panel__title'>基础用法</View>
                  <View className='panel__content no-padding'>
                    <View className='example-item'>
                    <View className="layout-container">
                        <Button onClick = {this.handleClick}>日历选择器</Button>
                        <View>日期范围{selectDate.join('-')}</View>
                        <Calendar 
                          onChange = {this.handleChange}
                          isShow={isShow}
                          dateRange={['2020/1/1', '2030/2/1']}
                          >
                        </Calendar>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
      )
    }
  }