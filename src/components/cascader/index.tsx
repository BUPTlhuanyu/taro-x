import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import AtComponent from '../../common/component'

import {IProps, IState} from 'types/cascader'

/**
 * @description 超过几个字显示省略号，如果超过6个字，那么显示是5个字 + 省略号
 * @param {*} param 传入的参数（string || object）
 * @param {number} [num=6] 显示几位，默认为6
 * @returns 
 */
function showTopNum(param, num = 6) {
  if (param.trim() !== "" && param !== null && param !== undefined) {
    if (param.length < num || param.length === num) {
      return param;
    } else {
      param = param.substring(0, num - 1) + "...";
      return param;
    }
  }
}


export default class AtCascader extends AtComponent<IProps, IState> {
  static defaultProps: IProps
  constructor(props: IProps) {
    super(props)
    this.state = {
      title: ['请选择'],
      content: [],//初始化为空数组
      // content: [
      //   ['aaaaaaaaaaaaaaaaaa', '222222222222222222', 'a3a3a3哎哦你是不是傻', '你好你好你好你好你好', 'a555', 'a666', 'a777', '你好', '你好你好你好你好你好', 'a123', 'a234', 'a345'],
      //   ['b111', 'b222', 'b333', 'b444', 'b555', 'b666', 'b777', 'b888', 'b999', 'b123', 'b234', 'b345'],
      //   ['c111', 'c222', 'c333', 'c444', 'c555', 'c666', 'c777', 'c888', 'c999', 'c123', 'c234', 'c345'],
      //   ['d111', 'd222', 'd333', 'd444', 'd555', 'd666', 'd777', 'd888', 'd999', 'd123', 'd234', 'd345'],
      // ],
      current: 0, //当前是第几个tab
      contentCurrent: [-1], // 记录每个content数组中被选中的下标
    }
  }

  componentWillReceiveProps(nextProps) {
    let options = [];
    if (nextProps.options && nextProps.options.length > 0) {
      options = nextProps.options.map((option) => {
        //如果传入的是字符串数组，进行转换，value,label都为value值，转换为为对象数组
        if (typeof option === "string") {
          return {
            value: option,
            label: option,
            disabled: false
          }
        } else {
          return option;
        }
      })

      const { content } = this.state;
      content[this.state.current] = options;
    }
  }

  /**
   * @description 点击关闭按钮
   * @memberof AtCascader
   */
  close = () => {
    //未选择全部级联项 需从头开始选择
    if (this.props.total > this.state.current) {
      this.props.close(true)
      this.setState({
        title: ['请选择'],
        current: 0,
        contentCurrent: [-1],
      })
    }
  }
  /**
   * @description 
   * @param 当前被选中选项的value 当前被选中的选项(用于需传给后端key-value类型数据)  当前选项的索引  当前options的索引
   * @memberof AtCascader
   */
  contentClick = (value, cont, cindex, pindex) => {
    let { current, title, contentCurrent } = this.state;
    let newCurrent;
    let newTitle;
    let newContentCurrent;
    console.log('current', current);
    // if(current + 1 > this.props.total) {
    //   this.props.close()
    //   return
    // } else 
    if (current + 1 === this.props.total) { // 一共total层
      console.log('一共total层');
      newCurrent = current + 1
      newTitle = title.map((item, index) => {
        return index === current ? cont.label : item
      })
      newContentCurrent = contentCurrent.map((item, index) => {
        return index === current ? cindex : item
      })
    } else if (current + 1 === title.length) { // 正常点击
      console.log('// 正常点击');

      newCurrent = current + 1
      // 改变标题(title) [1, 2, '请选择'] --> [1, 2, cont, '请选择']
      title.push('请选择');
      newTitle = title.map((item, index) => {
        return index === current ? cont.label : item
      })
      // 改变 contentCurrent  [1, -1] --> [1, cindex, -1]
      contentCurrent.push(-1);
      newContentCurrent = contentCurrent.map((item, index) => {
        return index === current ? cindex : item
      })
      //正常设置options
      this.props.onChange(value, cont);

    } else { // 返回重新点击 current: 2
      console.log('返回重新点击');
      // this.props.onChange(title);

      newCurrent = current + 1
      // 改变标题(title) [1, 2, 3, 4, '请选择'] --> [1, 2, cont, '请选择']
      title.splice(current);
      title.push(cont.label, '请选择');
      newTitle = title;
      // 改变 contentCurrent  [1, 2, 3, 4, -1] --> [1, 2, cindex, -1]
      contentCurrent.splice(current);
      contentCurrent.push(cindex, -1);
      newContentCurrent = contentCurrent;

      this.props.onChange(value, cont);
    }
    this.setState({
      title: newTitle,
      contentCurrent: newContentCurrent,
      current: newCurrent
    }, () => {
      console.log('this.state.current-->', this.state.current, this.state.contentCurrent);

      if (this.state.current === this.props.total) {
        this.setState((state) => {
          return {
            current: state.current - 1
          }
        })
        this.props.close()
      }
    })
  }
  titleClick = (item, index) => {
    this.setState({
      current: index
    })
  }

  render() {
    const {
      customStyle,
      className,
      isOpened,
      isMaskClose,
      placeholder,
    } = this.props
    const {
      title,
      current,
      content,
      contentCurrent
    } = this.state
    const rootCls = classNames('at-cascader',
      {
        'at-cascader--active': isOpened
      }, className)
    return (
      <View className={rootCls} style={customStyle}>
        <View className='at-cascader__overlay' onClick={isMaskClose ? this.close : () => { }} />
        <View className='at-cascader__container'>
          <View className='at-cascader__header'>
            <View className='at-cascader__header--placeholder'>{placeholder}</View>
            <View className='at-cascader__header--close' onClick={this.close}>关闭</View>
          </View>
          <View className='at-cascader__title'>
            {
              title.map((item, index) =>
                <View
                  className={
                    classNames({
                      'at-cascader__title--item': true,
                      'at-cascader__title--active': index === current
                    })
                  }
                  onClick={() => this.titleClick(item, index)}
                >
                  {showTopNum(item, this.props.valueNum)}
                </View>
              )
            }
          </View>
          <View style={{ overflow: 'hidden' }}>
            <View className='at-cascader__main' style={{ transform: `translate3d(-${this.state.current * 100}%, 0, 0)` }} >
              {
                content && content.map((pitem, pindex) => {
                  return <View className='at-cascader__content'>
                    {
                      pitem && pitem.map((citem, cindex) =>
                        <View
                          className={
                            classNames({
                              'at-cascader__content--item': true,
                              'at-cascader__content--active': cindex === contentCurrent[pindex],
                              'at-cascader__content--item--disabled': citem.disabled
                            })
                          }
                          onClick={() => citem.disabled ? false : this.contentClick(citem.value, citem, cindex, pindex)}
                        >
                          {citem.label ? citem.label : citem.value}
                        </View>)
                    }
                  </View>
                })
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

AtCascader.defaultProps = {
  customStyle: '',
  className: '',
  isOpened: false,
  isMaskClose: false, // 点击蒙层是否关闭
  close: () => { },
  placeholder: '',
  total: 3, // 级联一共有几层
  valueNum: 6,
  onChange: () => { },
  options: []
}


