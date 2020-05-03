/**
 * TODO： 用法太复杂，是否需要集成到组件库中。
 * 
 * 结论： 
 *        手机号码输入框： 有格式化，并且分隔符为空格，h5设置为tel，支持调起数字键盘并且具备格式化，但是小程序端数字键盘与格式化只能取其一，这里考虑保留格式化，设置为text
 *                        需要注意：h5设置为tel，需要测试不同浏览器的对空格作为分隔符的支持程度
 *        金融输入框   ：  如果有格式化，并且分隔符为逗号，h5与小程序输入框的type只能设置为text，因此h5与下程序都实现不了调起数字键盘的功能
 *        金融输入框解决方案： 1. 小金额，去除格式化，调起数字键盘。2. 大金额，保留格式化，放弃调起数字键盘。
 * 
*/

import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtInput from '../../../components/input/index'
// import AtButton from '../../../components/button/index'
import {AtInput, AtButton} from 'taro-x'

import {priceHandler, phoneHandler, idCardHandler, emailHandler} from './lib/formator'



interface IState{
  value: string
  error1: string
  value1: string
  value2: string
  value3: string
  value4: string

  /* 小金额输入框：无格式化，调起数字键盘 */
  littleMoneyValue: string
  littleMoneyError: string
  littleMoneyClear: boolean

  /* 金额相关：实时校验 */
  moneyValue: string
  moneyError: string
  moneyClear: boolean

  /* 手机号相关：实时校验 */
  phoneValue: string
  phoneError: string
  phoneClear: boolean

  /* 身份证相关：实时校验 */
  idCardValue: string
  idCardError: string
  idCardClear: boolean 

  /* 邮箱相关：实时校验 */
  emailValue: string
  emailError: string
  emailClear: boolean 
}

const handlers = new Map()

export default class Index extends Component<{}, IState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '输入框'
  }

  timerId: any
  phoneHandler: any
  phoneHandler1: any
  inputType: {[str : string]: string}

  constructor () {
    super(...arguments)
    this.handlerInitial()
    this.submitHandler = this.submitHandler.bind(this)
    this.handleErrorChange = this.handleErrorChange.bind(this)

    /* 小金额输入框：无格式化，调起数字键盘 */
    this.handleLittleMoneyChange = this.handleLittleMoneyChange.bind(this)
    this.handleLittleMoneyBlur = this.handleLittleMoneyBlur.bind(this)
    this.handleLittleMoneyFocus = this.handleLittleMoneyFocus.bind(this)

    /* 金额输入框：实时校验 */
    this.handleMoneyChange = this.handleMoneyChange.bind(this)
    this.handleMoneyBlur = this.handleMoneyBlur.bind(this)
    this.handleMoneyFocus = this.handleMoneyFocus.bind(this)

    /* 手机号输入框：实时校验 */
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handlePhoneBlur = this.handlePhoneBlur.bind(this)
    this.handlePhoneFocus = this.handlePhoneFocus.bind(this)
    this.timerId = null

    /* 身份证输入框：实时校验 */
    this.handleIdCardChange = this.handleIdCardChange.bind(this)
    this.handleIdCardBlur = this.handleIdCardBlur.bind(this)
    this.handleIdCardFocus = this.handleIdCardFocus.bind(this)
    
    /* 邮箱输入框：实时校验 */
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleEmailBlur = this.handleEmailBlur.bind(this)  
    this.handleEmailFocus = this.handleEmailFocus.bind(this)   

    this.state = {
      value: '',
      error1: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',

      /* 小金额输入框：无格式化，调起数字键盘 */      
      littleMoneyValue: '',
      littleMoneyError: '',
      littleMoneyClear: false,

      /* 金额输入框：实时校验 */
      moneyValue: '',
      moneyError: '',
      moneyClear: false,

      /* 手机号相关：实时校验 */
      phoneValue: '',
      phoneError: '',
      phoneClear: false,

      /* 身份证相关：实时校验 */
      idCardValue: '',
      idCardError: '',
      idCardClear: false, 

      /* 邮箱相关：实时校验 */
      emailValue: '',
      emailError: '',
      emailClear: false
    }
  }

  submitHandler() {
    let data = this.state
    console.log('this.state', data);
    // let content = ''
    // Object.entries(data).forEach((item) => {
    //   content += item[0] + item[1] + ';'
    // })
    // Taro.showModal({
    //   title: '提交的数据',
    //   content: content
    // })
  }

  /**
   * 
   */
  cursorPosition(value, selectionEnd, formator ){

  }
  /**
   * 初始化表单处理器
   */
  handlerInitial(){
    const priceCustomBlurChecker = function(value){
      let val = parseFloat(value)
      let error
      if(val > 10000){
        error = '金额最高不可超过10,000元'
      }else if(val < 500){
        error = '金额最小不可低于500元'
      }
      return error
    }
    const priceCustomRealChecker = function(value){
      let val = parseFloat(value)
      let error
      if(val > 10000){
        error = '金额最高不可超过10,000元'
      }
      return error
    }
    const price = new priceHandler({blurChecker: priceCustomBlurChecker, realChecker: priceCustomRealChecker})
    const phone1 = new phoneHandler()
    const email = new emailHandler()
    const idCard = new idCardHandler()
    handlers.set('price', price)
    handlers.set('email', email)
    handlers.set('idCard', idCard)
    handlers.set('phone1', phone1)
    const inputType = process.env.TARO_ENV === "h5"? {
      price: 'text',  // 大金额，保留格式化
      email: 'text',
      idCard: 'text',
      phone: 'tel',
      littleMoney: 'number'
    } : {
      price: 'text',  // 大金额，保留格式化
      email: 'text',
      idCard: 'idcard',
      phone: 'number',
      littleMoney: 'digit'   
    }
    this.inputType = inputType
  }
  /**
   * 
   * @param type 处理类型
   * @param value 需要处理的值
   */
  errorCollector(type, value, checkerName = 'checker'){
    let handler = handlers.get(type)
    // 清除格式化
    let valueWithoutFormation = handler.clearFormation(value)
    // 检查错误
    return  handler[checkerName](valueWithoutFormation)
  }

    /**
   * 
   * @param type 处理类型
   * @param value 需要处理的值
   */
  errorRealCollector(type, value){
    let handler = handlers.get(type)
    // 清除格式化
    let valueWithoutFormation = handler.clearFormation(value)
    // 检查错误
    return  handler.realChecker(valueWithoutFormation)
  }

  /* ============================================ 基础样式 ======================================= */

  /**
   * 基础样式的错误处理函数
   * @param value 
   */
  handleErrorChange (type, value) {  
    if(value){
      this.setState({
        value1: value,
        error1: ''
      })
    }else{
      this.setState({
        value1: value,
        error1: '无内容，组件内，失焦时自动执行onChange'
      })
    }
  }

  /* ============================================ 小金额输入框：无格式化，调起数字键盘 ======================================= */

  /**
   * 小金额输入框：无格式化，调起数字键盘
   * @param value 
   */
  handleLittleMoneyChange (type, value, event?) {
    let handlerType = 'price'
    let handler = handlers.get(handlerType)
    /* 收集错误 */
    let littleMoneyError = this.errorCollector(handlerType,value, 'realChecker')
    // /* 处理清空按钮: 如果校验失败，并且又内容，则展示清空按钮 */
    // let littleMoneyClear = littleMoneyError? true : false
    if(type === 'change'){
      let littleMoneyClear = true
      let littleMoneyValue = handler.formator(value, 2, false)
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          littleMoneyValue,
          littleMoneyError,
          littleMoneyClear
        })
      }else{
        // @ts-ignore
        this.state.littleMoneyValue = littleMoneyValue
        this.setState({
          littleMoneyError,
          littleMoneyClear
        })
        return {
          value: littleMoneyValue
        }
      }

    }else if(type === 'clear'){
      let littleMoneyClear = false
      this.setState({
        littleMoneyError: '',
        littleMoneyClear
      })
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          littleMoneyValue: ''
        })
      }else{
        // @ts-ignore
        this.state.littleMoneyValue = ''
      }
    }
  }

  /**
   * 离框的时候，将0.更正为0
   * @param value 
   * @param event 
   */
  handleLittleMoneyBlur(value, event){
    if(value === '0.'){
      value = '0'
      this.setState({
        littleMoneyValue: value
      })
    }
    if(!value){
      this.setState({
        littleMoneyError: '金额不能为空'
      })
    }else{
      let handlerType = 'price'
      let littleMoneyError = this.errorCollector(handlerType,value, 'blurChecker')
      let littleMoneyClear = littleMoneyError? true : false
      this.setState({
        littleMoneyError: littleMoneyError,
        littleMoneyClear: littleMoneyClear
      })
    }
  }

  handleLittleMoneyFocus(){
    this.setState({
      littleMoneyError: '',
      littleMoneyClear: true
    })
  }


  /* ============================================ 金额输入框：实时校验 ======================================= */

  /**
   * 金额输入框：实时校验
   * 处理金额输入框的值，包括验证与格式化
   * @param value 
   */
  handleMoneyChange (type, value, event?) {
    if(type === 'change'){
      let handlerType = 'price'
      let handler = handlers.get(handlerType)
      /* 收集错误 */
      let moneyError = this.errorCollector(handlerType,value, 'realChecker')
      let moneyClear = true
      /* 处理光标位置 */
      // 记录格式化之前的输入光标的位置
      let prevCur = process.env.TARO_ENV === "h5"? event.target.selectionEnd : event.target.cursor
      // 记录格式化之前输入值的长度
      let prevValueLen = value.length
      // 求出距离字符末端的距离
      let diff = prevValueLen - prevCur
      // 格式化字符串
      let moneyValue = handler.formator(value)
      // 算出格式化之后光标的位置： 字符总长度 - 格式化之前光标距离字符末端的距离
      let pos = moneyValue.length - diff
      // 如果光标位置小于0，说明光标到了最开头的位置
      pos = pos < 0 ? 0 : pos
      if(process.env.TARO_ENV === "h5"){
          /* 解决方案2（不推荐）会很流畅，但是会修改原型链方法，会导致其他input都变化，后续因该采用这种思路，但是不是暴力的删除内部的定时器任务：
            1. 改变Input组件原型链方法的onInput函数，去掉其中改变光标位置的定时器任务，
            2. 然后用requestAnimationFrame在每次屏幕刷新之前改变光标位置 
                    // 在每次屏幕刷新的时候调用update，刷新视图，避免input组件中setTimeOut的影响
                    // const update = function(){
                    //   event.target.selectionStart = pos
                    //   event.target.selectionEnd = pos
                    // }
                    // window.requestAnimationFrame(update) // 兼容性良好？https://caniuse.com/#search=requestAnimationFrame
            */
          setTimeout(
            /* 解决方案1（推荐）：
                    // 这个定时器的作用： 由于taro的Input自己有一个setTimeout，因此需要等待他执行完改变了光标位置之后，再把格式化的金额展示出来，展示出来之后，需要将光标调整到正确的位置，这个位置是根据输入时光标位置到最后一位数字的位数。
                    // taro的Input的定时器的作用：在输入值变化，并通过Input组件渲染出来之后，会改变光标的位置。
                    // onInput事件触发的时机： 在输入的时候react不会阻塞交互，因此等数值改变之后，会触发onInput事件，因此e.target.selectionEnd是数值变化之后的光标位置
                                  // 比如：在122,222的122后面输入一个3，则视图变成1223,222之后，e.target.selectionEnd由3为4
            */
            () => {
              this.setState({
                moneyValue,
                moneyError,
                moneyClear
              }, () => { // 由于特定的event，这个回调不能放到componentDidUpdate处理
                // 这个回调函数是在dom视图改变之后，才会调用，也就是在格式化金额展示之后，才会调用，从而再次改变视图
                event.target.selectionStart = pos
                event.target.selectionEnd = pos
              })
            }
          )
      }else{
        this.setState({
          moneyError: moneyError,
          moneyClear: moneyClear
        })
        // 小程序的奇葩处理：微信的bug，this.state在小程序中会被转换成this.data,
        //                  为了避免setData的重新渲染导致的光标不正确的问题，需要直接赋值不会导致其重新渲染，在react中请不要这么干
        // @ts-ignore
        this.state.moneyValue = moneyValue
        console.log('this.state', this.state);
        // 在小程序中需要直接返回值才能改变input组件的值
        return {
          value: moneyValue,
          cursor: pos
        }
      }
    }else if(type === 'clear'){
      this.setState({
        moneyError: '',
        moneyClear: false
      })
      // 处理h5与小程序
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          moneyValue: ''
        })
      }else{
        // @ts-ignore
        this.state.moneyValue = ''
      }
    }
  }

  handleMoneyFocus(){
    this.setState({
      moneyClear: true,
      moneyError: ''
    })
  }


  /**
   * 离框的时候，将0.更正为0
   * @param value 
   * @param event 
   */  
  handleMoneyBlur(value, event){
    if(value === '0.'){
      value = '0'
      this.setState({
        moneyValue: value
      })
    }
    if(!value){
      this.setState({
        moneyError: '金额不能为空'
      })
    }else{
      let handlerType = 'price'
      let moneyError = this.errorCollector(handlerType,value, 'blurChecker')
      let moneyClear = moneyError? true : false
      this.setState({
        moneyError: moneyError,
        moneyClear: moneyClear
      })
    }
  }

  /* ============================================ 手机号输入框：实时校验 ======================================= */  
  
  handlePhoneChange(type, value, event) {
    let handlerType = 'phone1'
    let handler = handlers.get(handlerType)
    let phoneError = this.errorRealCollector(handlerType,value)
    if(type === 'change'){
      let phoneClear = true
      /* 处理光标位置 */
      // 记录格式化之前的输入光标的位置
      let prevCur = process.env.TARO_ENV === "h5"? event.target.selectionEnd : event.target.cursor
      // 格式化字符串
      let [phoneValue, curCur] = handler.formator(value, prevCur)   
      const pos = curCur
      if(process.env.TARO_ENV === "h5"){
        setTimeout(
          () => {
            this.setState({
              phoneValue,
              phoneError,
              phoneClear
            }, () => {
              // 这个回调函数是在dom视图改变之后，才会调用，也就是在格式化金额展示之后，才会调用，从而再次改变视图
              event.target.selectionStart = pos
              event.target.selectionEnd = pos
              let phoneValue = this.state.phoneValue
              let phoneError =  this.errorRealCollector(handlerType,phoneValue)
              if(String(phoneValue).replace(/\s/g, '').length === 11 && !phoneError){
                if(this.timerId) clearTimeout(this.timerId)
                this.timerId = null
                this.timerId = setTimeout(() => {
                  let dom: any = document.getElementById(`phoneValue`)
                  dom.blur()
                }, 300)
              }
            })
          }
        )
      }else{
        console.log('phoneValue', phoneValue)
        if(String(phoneValue).replace(/\s/g, '').length === 11 && !phoneError){
          if(this.timerId) clearTimeout(this.timerId)
          this.timerId = null
          this.timerId = setTimeout(() => {
            Taro.hideKeyboard()
          }, 300)
        }
        // 在小程序中需要直接返回值才能改变input组件的值
        this.setState({
          phoneError,
          phoneClear
        })
        if(String(value).replace(/\s/g, '').length <= 11){
          // @ts-ignore
          this.state.phoneValue = phoneValue
        }
        return {
          value: phoneValue,
          cursor: pos
        }
      }
    }else if(type === 'clear'){
      this.setState({
        phoneError: '',
        phoneClear: false
      })
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          phoneValue: ''
        })
      }else{
        // @ts-ignore
        this.state.phoneValue = ''
      }
    }
    
  }

  handlePhoneFocus(){
    this.setState({
      phoneClear: true,
      phoneError: ''
    })
  }

  handlePhoneBlur(value, event) {
    console.log('value', value);
    
    let handlerType = 'phone1'
    /* 收集错误 */
    let phoneError = this.errorCollector(handlerType,value,'blurChecker')
    /* 处理清空按钮: 如果校验失败，并且又内容，则展示清空按钮 */
    let phoneClear = phoneError? true : false
    if(!value){
      this.setState({
        phoneError: '手机号不能为空'
      })
    }else{
      this.setState({
        phoneError: phoneError,
        phoneClear: phoneClear
      })
    }
  }
  /* ============================================ 身份证输入框：实时校验 ======================================= */
  handleIdCardChange(type, value, event) {
    let handlerType = 'idCard'
    let handler = handlers.get(handlerType)
    let idCardError = this.errorCollector(handlerType,value,'realChecker')  

    if(type === 'change'){
      let idCardClear = true
      // 格式化字符串
      let idCardValue = handler.formator(value)
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          idCardValue,
          idCardError,
          idCardClear
        })
      }else{
        // 在小程序中需要直接返回值才能改变input组件的值
        this.setState({
          idCardError,
          idCardClear
        })
        // @ts-ignore
        this.state.idCardValue = idCardValue
        return {
          value: idCardValue
        }
      }
    }else if(type === 'clear'){
      this.setState({
        idCardError: '',
        idCardClear: false
      })
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          idCardValue: ''
        })
      }else{
        // @ts-ignore
        this.state.idCardValue = ''
      }
    }
  }

  handleIdCardFocus(){
    this.setState({
      idCardClear: true,
      idCardError: ''
    })
  }

  handleIdCardBlur(value, event) {
    if(!value){
      this.setState({
        idCardError: '身份证号不能为空'
      })
    }else{
      let handlerType = 'idCard'
      /* 收集错误 */
      let idCardError = this.errorCollector(handlerType,value,'blurChecker')
      /* 处理清空按钮: 如果校验失败，并且又内容，则展示清空按钮 */
      let idCardClear = idCardError? true : false
      this.setState({
        idCardError: idCardError,
        idCardClear: idCardClear
      })
    }
  }

  /* ============================================ 邮箱输入框：实时校验 ======================================= */
  handleEmailChange(type, value, event) {
    console.log('handleEmailChangehandleEmailChange');
    
    let handlerType = 'email'
    let handler = handlers.get(handlerType)
    /* 收集错误 */
    let emailError = this.errorRealCollector(handlerType,value)
  
    if(type === 'change'){
      let emailClear = true
      // 格式化字符串
      let emailValue = handler.formator(value)
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          emailValue,
          emailError,
          emailClear
        })
      }else{
        // 在小程序中需要直接返回值才能改变input组件的值
        this.setState({
          emailError,
          emailClear
        })
        if(String(emailValue).replace(/\s/g, '').length <= 18){
          // @ts-ignore
          this.state.emailValue = emailValue
        }
        return {
          value: emailValue
        }
      }
    }else if(type === 'clear'){
      console.log('clear');
      this.setState({
        emailError: '',
        emailClear: false
      })
      if(process.env.TARO_ENV === "h5"){
        this.setState({
          emailValue: ''
        })
      }else{
        // @ts-ignore
        this.state.emailValue = ''
      }
    }
  }

  handleEmailFocus(){
    this.setState({
      emailClear: true,
      emailError: ''
    })
  }

  handleEmailBlur(value, event) {
    let handlerType = 'email'
    if(!value){
      this.setState({
        emailError: '电子邮箱不能为空'
      })
    }else{
    /* 收集错误 */
    let emailError = this.errorCollector(handlerType,value)
    /* 处理清空按钮: 如果校验失败，并且又内容，则展示清空按钮 */
    let emailClear = emailError? true : false
      this.setState({
        emailError: emailError,
        emailClear: emailClear
      })
    }
  }
  
  render () {
    const {
      error1, 
      value1, 
      value2, 
      value3, 
      value4, 

      /* 小金额输入框：无格式化，调起数字键盘 */      
      littleMoneyValue,
      littleMoneyError,
      littleMoneyClear,      

      /* 金额输入框：实时校验 */
      moneyValue,
      moneyError,
      moneyClear,

      /* 手机号相关：实时校验 */
      phoneValue,
      phoneError,
      phoneClear,
      
      /* 身份证相关：实时校验 */
      idCardValue,
      idCardError,
      idCardClear, 


      /* 邮箱相关：实时校验 */
      emailValue,
      emailError,
      emailClear  
    } = this.state
    const inputType = this.inputType
    return (
        <View className='page'>
            <View className='doc-body'>
                {/* 基础样式 */}
                <View className='panel'>
                    <View className='panel__title'>基础样式</View>
                    <View className='panel__content' style={{padding: 0}}>
                        <View className='example-item'>
                            <AtInput
                                name='value1'
                                title='标准五个字'
                                type='text'
                                placeholder='标准五个字'
                                value={value1}
                                onChange={this.handleErrorChange}
                                error = {error1}
                            />
                        </View>
                        <View className='example-item'>
                            <AtInput
                                name='value2'
                                value={value2}
                                onChange = {(type,value2) => {
                                  this.setState({
                                    value2
                                  })
                                }}
                                title='姓名'
                                type='text'
                                placeholder='姓名'
                            />
                        </View>
                        <View className='example-item'>
                            <AtInput
                                clear
                                name='value3'
                                title='企业法人/负责人'
                                type='text'
                                placeholder='label字数比较多的情况'
                                value={value3}
                                onChange = {(type,value3) => {
                                  this.setState({
                                    value3
                                  })
                                }}
                            />
                        </View>
                        <View className='example-item'>
                            <AtInput
                                name='value4'
                                type='text'
                                value={value4}
                                onChange = {(type,value4) => {
                                  this.setState({
                                    value4
                                  })
                                }}
                                placeholder='无label'
                            />
                        </View>
                        <View className='example-item'>
                            <AtInput
                                name='value5'
                                title='姓名'
                                type='text'
                                placeholder='姓名'
                                disabled
                            />
                        </View>
                    </View>
                </View>
                {/* 小金额输入框：无格式化，调起数字键盘 */}
                <View className='panel'>
                    <View className='panel__title'>小金额输入框：无格式化，调起数字键盘</View>
                      <View className='panel__content' style={{padding: 0}}>
                          <View className='example-item'>
                              <AtInput
                                  name='littleMoney'
                                  title='金额'
                                  type= {inputType.littleMoney}
                                  placeholder='请输入估损金额'
                                  value={littleMoneyValue}
                                  onChange={this.handleLittleMoneyChange}
                                  onBlur = {this.handleLittleMoneyBlur}
                                  onFocus = {this.handleLittleMoneyFocus}
                                  error = {littleMoneyError}
                                  clear = {littleMoneyClear}
                              />
                          </View>
                    </View>
                </View> 
                {/* 大金额输入框：实时校验 */}
                <View className='panel'>
                    <View className='panel__title'>金额输入框：实时校验</View>
                    <View className='panel__content' style={{padding: 0}}>
                        <View className='example-item'>
                            <AtInput
                                name='moneyValue'
                                title='金额'
                                type= {inputType.price} 
                                placeholder='请输入估损金额'
                                value={moneyValue}
                                onChange={this.handleMoneyChange}
                                onBlur = {this.handleMoneyBlur}
                                onFocus = {this.handleMoneyFocus}
                                error = {moneyError}
                                clear = {moneyClear}
                            />
                        </View>
                    </View>
                </View>  
                {/* 手机号输入框：实时校验 */}
                <View className='panel'>
                    <View className='panel__title'>手机号输入框：实时校验</View>
                    <View className='panel__content' style={{padding: 0}}>
                        <View className='example-item'>
                            <AtInput
                                name='phoneValue'
                                title='手机号'
                                type= {inputType.phone} 
                                placeholder='请输入手机号'
                                value={phoneValue}
                                onChange={this.handlePhoneChange}
                                onBlur = {this.handlePhoneBlur}
                                onFocus = {this.handlePhoneFocus}
                                error = {phoneError}
                                clear = {phoneClear}
                                maxLength = {13}
                            />
                        </View>
                    </View>
                </View> 
                {/* 身份证输入框：实时校验 */}
                <View className='panel'>
                    <View className='panel__title'>身份证输入框：实时校验</View>
                    <View className='panel__content' style={{padding: 0}}>
                        <View className='example-item'>
                            <AtInput
                                name='idCardValue'
                                title='身份证号'
                                type= {inputType.idCard} 
                                placeholder='请输入身份证号'
                                value={idCardValue}
                                onChange={this.handleIdCardChange}
                                onBlur = {this.handleIdCardBlur}
                                onFocus = {this.handleIdCardFocus}
                                error = {idCardError}
                                clear = {idCardClear}
                                maxLength = {18}
                            />
                        </View>
                    </View>
                </View> 
                {/* 邮箱输入框：实时校验 */}
                <View className='panel'>
                    <View className='panel__title'>邮箱输入框：实时校验</View>
                    <View className='panel__content' style={{padding: 0}}>
                        <View className='example-item'>
                            <AtInput
                                name='emailValue'
                                title='电子邮箱'
                                type= {inputType.email} 
                                placeholder='请输入电子邮箱'
                                value={emailValue}
                                onChange={this.handleEmailChange}
                                error = {emailError}
                                clear = {emailClear}
                                onBlur = {this.handleEmailBlur}
                                onFocus = {this.handleEmailFocus}
                                // focus = {emailFocus}
                            />
                        </View>
                    </View>
                </View> 
                <AtButton type='primary' 
                    customStyle={{
                      width: `${Taro.pxTransform(420)}`,
                      height: `${Taro.pxTransform(88)}`
                    }}
                    onClick = {this.submitHandler}
                >
                    提交
                </AtButton> 
            </View>
        </View>
    )
  }
}
