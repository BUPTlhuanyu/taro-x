import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

// import AtImagePicker from "../../../components/image-picker/index"
// import AtCertiPicker from "../../../components/certi-picker/index"
import {AtImagePicker, AtCertiPicker} from 'taro-x'

import IDCardFront from '../../../static/image/id-card-front-eg.png'
import IDCardFrontError from '../../../static/image/id-card-front-error-eg.png'
import IDCardBack from '../../../static/image/id-card-back-eg.png'
import IDCardBackError from '../../../static/image/id-card-back-error-eg.png'

import CompanyCardError from '../../../static/image/company-card-error.png'
import CompanyCard from '../../../static/image/company-card.png'
// import test from '../../../static/image/test.png'
// import test2 from '../../../static/image/test2.png'



import './index.scss'

interface IState{
    files: any, 
    certiB: any
    certiF: any
    certiC: any
}

function getFileItemAndIndex(file, fileList) {
  const matchKey = file.uid !== undefined ? 'uid' : 'name';
  let idx
  let res = fileList.filter((item, index) => {
    if(item[matchKey] === file[matchKey]){
      idx = index
      return true
    }
  })[0];
  return {
    file: res,
    index: idx
  }
}

/**
 * 模拟上传失败的效果
 */
function mockStatus(){
   return Math.random() > 0.5? 'success' : 'failed'
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
  
    callBackArr:Array<any>

    constructor () {
      super(...arguments)
      this.callBackArr = []
      this.uploadSimulation = this.uploadSimulation.bind(this)
      this.setNextCallback = this.setNextCallback.bind(this)
      this.state = {
          files: [],
          certiB: {url: IDCardFront},
          certiF: {url: IDCardBack},
          certiC: {url: CompanyCard}
      }
    }

    setNextCallback(item) {
      let timeOut = Math.random()*5000
      let cancel = false

      let timerID = setTimeout(() => {
        if(cancel){
          return
        }
        let res = getFileItemAndIndex(item, this.state.files)
        console.log('getFileItemAndIndex', item, this.state.files, res)
        if(!res.file){
          return
        }
        let newItem = Object.assign({}, res.file, {status: mockStatus()})
        this.setState((prev) => {
          const prevFiles = prev.files.slice()
          prevFiles.splice(res.index, 1, newItem)
          return {
            files: prevFiles
          }
        })
      }, timeOut)

      let cancelCallBack = () => {
        cancel = true
      }

      return cancelCallBack
    }

    uploadSimulation (files, prevLen) { 
      console.log('files', files, prevLen)
      let len = prevLen
      files.map((item, index) => {
        let cancel = this.setNextCallback(item)
        this.callBackArr[len + index] = cancel
        console.log('this.callBackArr', this.callBackArr)
      })
    }

    componentWillMount () { }
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    render () {
      let {files, certiB, certiF, certiC} = this.state
      return (
        <View className='page'>
          {/* S Header */}
          {/* E Header */}

          {/* S Body */}
          <View className='doc-body'>
            {/* 普通图片上传组件 */}
            <View className='panel'>
              <View className='panel__title'>普通图片上传组件</View>
              <View className='panel__content no-padding'>
                <View className='example-item'>
                <View className="image-picker-demo__container">
                  <View className="image-picker-demo__title">图片选择器</View>
                  <AtImagePicker 
                    files = {files}
                    multiple = {true}
                    count = {9}
                    length = {4}
                    onImageClick = {(index) => {
                        // @ts-ignore
                    }}
                    onFail = {() => {}}
                    onChange = {(mode, files, index) => {
                      if (mode === 'add') {
                        console.log('onChangeonChangeonChange');
                        let len = this.state.files.length
                        this.setState((prev) => {
                          const prevFiles = prev.files.slice()
                          return {
                            files: prevFiles.concat(files)
                          }
                        }, () => {
                          this.uploadSimulation(files, len)
                        })
                      } else {
                        // console.log(operationType, index)
                        // @ts-ignore
                        this.setState(prev => {
                          let prevfiles = prev.files.slice();
                          prevfiles.splice(index, 1)
                          return {
                            files: prevfiles
                          }
                        })
                      }
                    }}
                  />	
                </View>	
                </View>
              </View>
            </View>

            {/* 身份证证件上传组件 */}
            <View className='panel'>
              <View className='panel__title'>身份证证件上传组件</View>
              <View className='panel__content no-padding'>
                <View className='example-item'>
                  <View className="certi-picker-demo__container">
                  <View className="certi-picker-demo__title">证件照片选择器</View>	
                    <View className="certi-picker-demo__content">
                      <AtCertiPicker 
                          className = ''
                          customStyle = ''
                          file = {certiB}
                          onChange = {(mode, file) => {
                            // 这里将选择的图片上传到后端；
                            // 如果上传成功，则将file设置为上传的图片，显示叉号的标记设置为true；
                            // 如果失败则将file设置为重新上传的图片，显示叉号的标记设置为false；
                            // 点击图片的时候，组件内部会根据是否显示叉号来预览图片或者选择图片
                            if(mode === 'add'){
                              console.log(file, mode)
                              setTimeout(() => {
                                this.setState({
                                  certiB: file
                                })
                              }, 3000)
                            }
                            if(mode === 'remove'){
                              this.setState({
                                certiB: {url: IDCardFront}
                              })
                            }
                          }}
                          onImagePreview = {() => {
                            // 这里预览图片
                          }}
                          onFail = {() => {}}
                      />
                      <AtCertiPicker 
                          className = ''
                          customStyle = {`margin-left: ${Taro.pxTransform(30)}`}
                          file = {certiF}
                          onChange = {(mode, file) => {
                            // 这里将选择的图片上传到后端；
                            // 如果上传成功，则将file设置为上传的图片，显示叉号的标记设置为true；
                            // 如果失败则将file设置为重新上传的图片，显示叉号的标记设置为false；
                            // 点击图片的时候，组件内部会根据是否显示叉号来预览图片或者选择图片
                            if(mode === 'add'){
                              console.log(file, mode)
                              setTimeout(() => {
                                this.setState({
                                  certiF: file
                                })
                              }, 3000)
                            }
                            if(mode === 'remove'){
                              this.setState({
                                certiF: {url: IDCardBack}
                              })
                            }
                          }}
                          onImagePreview = {() => {
                            // 这里预览图片
                          }}
                          onFail = {() => {}}
                      />                              
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* 企业证件照上传组件 */}
            <View className='panel'>
              <View className='panel__title'>企业证件照上传组件</View>
              <View className='panel__content no-padding'>
                <View className='example-item'>
                <View className="certi-picker-demo__title">企业证件照选择器</View>	
                <View className="certi-picker-demo__content">
                  <AtCertiPicker 
                      sizeType = {['original', 'compressed']}
                      className = ''
                      customStyle = ''
                      file = {certiC}
                      onChange = {(mode, file) => {
                        // 这里将选择的图片上传到后端；
                        // 如果上传成功，则将file设置为上传的图片，显示叉号的标记设置为true；
                        // 如果失败则将file设置为重新上传的图片，显示叉号的标记设置为false；
                        // 点击图片的时候，组件内部会根据是否显示叉号来预览图片或者选择图片
                        if(mode === 'add'){
                          console.log(file, mode)
                          // 计时器模拟上传图片
                          setTimeout(() => {
                            this.setState({
                              certiC: file
                            })
                          }, 3000)
                        }
                        if(mode === 'remove'){
                          this.setState({
                            certiC: {url: IDCardBack}
                          })
                        }
                      }}
                      onImagePreview = {() => {
                        // 这里预览图片
                      }}
                      onFail = {() => {}}
                  />                             
                </View> 
                </View>
              </View>
            </View>
            <View className='panel'>
              <View className='panel__title'>企业证件照上传组件</View>
              <View className='panel__content no-padding'>
                <View className='example-item'>
                <View className="certi-picker-demo__title">企业证件照选择器</View>	
                  <View>
                    如果是微信公众号嵌入的h5，需要传入chooseFile自行写选择图片的逻辑，普通图片上传组件和证件上传组件chooseFile不一样，详情可以参考example文件夹中的代码
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* E Body */}
        </View>
        // <View className='picker-demo'>

        //   <View className="certi-picker-demo__container">
            
        //     <View className="certi-picker-demo__divider"/>
        //   </View>	
        //   <View className="certi-picker-demo__container">
           
        //     <View className="certi-picker-demo__divider"/>
        //   </View>	
        // </View>
      )
    }
  }
