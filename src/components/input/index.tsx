import Taro from '@tarojs/taro'
import { View, Input, Label, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

import { IProps, IState } from 'types/input'

/* 光标问题解决方案二： */
// const MyInput = Input
// function getTrueType (type, confirmType, password) {
//   if (!type) {
//     throw new Error('unexpected type')
//   }
//   if (confirmType === 'search') type = 'search'
//   if (password) type = 'password'
//   if (type === 'digit') type = 'number'

//   return type
// }
// function onInput(e) {
//   console.log('asdasds');
  
//   const {
//     type,
//     maxLength,
//     confirmType,
//     password,
//     onInput = '',
//     onChange = ''
//   } = this.props
//   if (!this.isOnComposition && !this.onInputExcuted) {
//     let value = e.target.value
//     const inputType = getTrueType(type, confirmType, password)
//     this.onInputExcuted = true
//     /* 修复 number 类型 maxLength 无效 */
//     if (inputType === 'number' && value && maxLength <= value.length) {
//       value = value.substring(0, maxLength)
//       e.target.value = value
//     }
// 		// 修复 IOS 光标跳转问题
// 		if (!(['number', 'file'].indexOf(inputType) >= 0)) {
// 			const pos = e.target.selectionEnd
// 			console.log('pos', pos)
// 			setTimeout(
// 				() => {
// 					console.log('timeout', pos)
// 					e.target.selectionStart = pos
// 					e.target.selectionEnd = pos
// 				}
// 			)
// 		}
//     Object.defineProperty(e, 'detail', {
//       enumerable: true,
//       value: { value }
//     })

//     if (onChange) return onChange(e)
//     if (onInput) return onInput(e)
//   }
// }
// MyInput.prototype.onInput = onInput


function getInputProps (props) {
  const actualProps = {
    type: props.type,
    maxLength: props.maxLength,
    disabled: props.disabled,
    password: false,
  }

  switch (actualProps.type) {
    case 'phone':
      actualProps.type = 'number'
      actualProps.maxLength = 11
      break
    case 'password':
      actualProps.password = true
      break
    default:
      break
  }
  return actualProps
}



export default class AtInput extends AtComponent<IProps, IState> {
  static defaultProps: IProps

  constructor(props){
    super(props)
    this._weappFocus = this._weappFocus.bind(this)
    this.state = {
      focused: false
    }
  }

  _weappFocus(focused, callback = () => {}){
    if(process.env.TARO_ENV === "weapp"){
      if(focused && !this.state.focused){
        this.setState({
          focused: true
        }, callback)
      }else if(!focused && this.state.focused){
        this.setState({
          focused: false
        }, callback)
      }
    }
  }

  onInput = event => {
    this._weappFocus(true)
    return this.props.onChange('change', event.target.value, event)
  }

  onFocus = event => {
    this._weappFocus(true)
    return this.props.onFocus(event.target.value, event)
  }

  onBlur = event => {
    if(process.env.TARO_ENV === "weapp"){
      this._weappFocus(false, () => {
        this.props.onBlur(event.target.value, event)
        // fix # 583 AtInput 不触发 onChange 的问题
        this.props.onChange('blur', event.target.value, event)
      })
    }else{
      this.props.onBlur(event.target.value, event)
      // fix # 583 AtInput 不触发 onChange 的问题
      this.props.onChange('blur', event.target.value, event)
    }
  }

  onClick = () => {
    this._weappFocus(true)
    return !this.props.disabled && this.props.onClick()
  }

  onConfirm = event => this.props.onConfirm(event.target.value, event)

  clearValue = () => {
    setTimeout(() => {
      if(process.env.TARO_ENV === "h5"){
        let dom: any = document.getElementById(`${this.props.name}`)
        dom.focus()
        this.props.onChange('clear', '')
      }else{
        if(!this.state.focused){
          this._weappFocus(true, ()=> {this.props.onChange('clear', '')})
        }else{
          this.props.onChange('clear', '')
        }
      }
    }, 100)
  }

  render () {
    const {
      className,
      customStyle,
      name,
      cursorSpacing,
      confirmType,
      cursor,
      selectionStart,
      selectionEnd,
      adjustPosition,
      border,
      title,
      error,
      clear,
      placeholder,
      placeholderStyle,
      placeholderClass,
      focus,
      value
    } = this.props
    const {
      type,
      maxLength,
      disabled,
      password,
    } = getInputProps(this.props)

    

    let focusFlag = focus
    if(process.env.TARO_ENV === "weapp"){
      const {focused} = this.state
      focusFlag = focusFlag || focused
    }

    
    const rootCls = classNames(
      'at-input',
      {
        'at-input--without-border': !border,
      }, className
    )
    const containerCls = classNames(
      'at-input__container',
      {
        'at-input--disabled': disabled
      }
    )
    const overlayCls = classNames(
      'at-input__overlay',
      {
        'at-input__overlay--hidden': !disabled
      }
    )
    const placeholderCls = classNames('placeholder', placeholderClass)
  
    return <View className={rootCls} style={customStyle}>
      <View className={containerCls}>
        <View className={overlayCls} onClick={this.onClick}></View>
        {title && <Label className='at-input__title' for={name}>{title}</Label>}
        <Input
          className='at-input__input'
          id={name}
          name={name}
          type={type}
          password={password}
          placeholderStyle={placeholderStyle}
          placeholderClass={placeholderCls}
          placeholder={placeholder}
          cursorSpacing={cursorSpacing}
          maxLength={maxLength}
          focus={focusFlag}
          value={value}
          confirmType={confirmType}
          cursor={cursor}
          selectionStart={selectionStart}
          selectionEnd={selectionEnd}
          adjustPosition={adjustPosition}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onConfirm={this.onConfirm}
        />
        {(clear && value) && (
          <View className='at-input__remove-btn-wrapper' onTouchStart={this.clearValue}>
            <View className='at-input__remove-btn'
            ></View>
          </View>
        )}
        {/* {error && (
          <View className='at-input__icon' onTouchStart={this.onErrorClick}>
            <Text className='at-icon at-icon-alert-circle at-input__icon-alert'></Text>
          </View>
        )} */}
        <View className='at-input__children'>{this.props.children}</View>
      </View>
      {          
        error && <View className='at-input__error'>
          {error}
        </View>
      }
    </View>
  }
}

AtInput.defaultProps = {
  className: '',
  customStyle: '',
  value: '',
  name: '', // label的类名
  placeholder: '', // placeholder显示的文字
  placeholderStyle: '', // placeholder默认样式
  placeholderClass: '', // placeholder默认类名
  title: '', // 左侧文字
  cursorSpacing: 50, // ?
  cursor: 0, // ?
  selectionStart: -1, // 光标开始位置
  selectionEnd: -1,  // 光标结束位置
  adjustPosition: true, // 键盘弹起时，是否自动上推页面
  maxLength: 140, // 最大可输入字符长度
  type: 'text', // 类型是text
  disabled: false, // 是否禁用
  border: true, // 是否显示下划线边框
  error: '', // 错误信息
  clear: false, // 清除按钮
  focus: false, // 是否聚焦,无效的
  onChange: () => {}, // 当输入值变化的时候调用的函数
  onFocus: () => {}, // 聚焦处理函数
  onBlur: () => {}, // 失焦处理函数
  onConfirm: () => {}, // 微信端适用
  onClick: () => {}
}
