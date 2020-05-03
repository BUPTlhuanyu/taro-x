import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

// import AtCascader from "../../../components/cascader/index"
import {AtCascader} from 'taro-x'
// import './index.scss'

interface IState {
  isOpened: boolean,
  value: Array<any>,
  options: Array<any>
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

  constructor() {
    super(...arguments)

    this.state = {
      isOpened: false,
      value: [],
      options: []
    }

    this.initOptions();
  }

  initOptions() {
    let options = Array.from({ length: 10 }, (_, i) => `test${i}`);

    this.setState({ options })
  }

  componentWillMount() {
    // let options = Array.from({ length: 10 }, (_, i) => ({ label: `测试${i}`, value: `test${i}`, disabled: i % 2 === 0 }));

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() { }

  componentDidHide() { }

  onCancel = (val?) => {
    if (val) {
      this.initOptions();
    }
    this.setState({
      isOpened: false,
    })
  }

  handleClick = () => {
    this.setState({
      isOpened: true,
    })
  }


  /**
   * @description 获取选中的值 val:value，option：选中的对象
   * @memberof Index
   */
  onChange = (val, option) => {
    console.log(option, val);

    let options = Array.from({ length: 10 }, (_, i) => ({ label: `${option.label ? option.label : val}---第${i}个`, value: val + val, disabled: option.disabled }))
    this.setState({
      options
    }, () => {
      console.log(this.state.options);
    })
  }

  render() {
    const { isOpened } = this.state
    return (
      <View className="layout-container">
        <Button onClick={this.handleClick}>打开</Button>
        <AtCascader
          isOpened={isOpened}
          close={this.onCancel}
          placeholder="请选择地区"
          onChange={this.onChange}
          options={this.state.options}
        />
      </View>
    )
  }
}