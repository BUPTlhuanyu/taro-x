import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

// import AtSelectList from '../../../components/select-list/index'
import {AtSelectList} from 'taro-x'
// import './index.scss'

interface IState{
  isOpened: boolean,
  value: string,
  selectOptions: Array<any>
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
          isOpened: false,
          value: 'option1',
          selectOptions: [
              { label: '单选项一', value: 'option1' },
              { label: '单选项二', value: 'option2' },
              { label: '单选项三', value: 'option3' },
              { label: '单选项四', value: 'option4' },
              { label: '单选项五', value: 'option5' },
              // { label: '单选项六', value: 'option6' },
              // { label: '单选项七', value: 'option7' },
              // { label: '单选项八', value: 'option8' },
              // { label: '单选项九', value: 'option9' }
          ]
        }
      }
  

    componentWillMount () { }
     
    config: Config = {
      navigationBarTitleText: ''
    }

    handleClick() {
      this.setState({
        isOpened: true
      })
    }
  
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    onCancel(){
      this.setState({
        isOpened: false
      })
    }

    valueChange(value) {
      this.setState({
        isOpened: false,
        value
      })
    }

    render () {
      const {isOpened, value, selectOptions} = this.state
      return (
        <View className='layout-container'>
            <Button onClick={this.handleClick.bind(this)}>选择</Button>
            <Text>选中项：{value}</Text>

            <AtSelectList
              isOpened={isOpened} //用于控制弹层的状态
              onCancel={this.onCancel.bind(this)} // 关闭
              title='请选择' // 题目
              options={selectOptions} // 选项
              value={value} //取值
              onChangeValue={this.valueChange.bind(this)}
            >
            </AtSelectList>
        </View>
      )
    }
  }