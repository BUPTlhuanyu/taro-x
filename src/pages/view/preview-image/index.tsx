import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

// import AtPreviewImage from '../../../components/preview-image/index'
// import AtImagePicker from "../../../components/image-picker/index"
// import AtButton from '../../../components/button/index'

import {AtPreviewImage, AtImagePicker, AtButton} from 'taro-x'

// test
import h from './data/h.png'
import v from './data/v.png'

interface IState {
  imageData: any[]
  preview1: boolean
  preview2: boolean
  current1: number
  current2: number
  files: any
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
  return Math.random() > 0.3? 'success' : 'failed'
}

export default class Index extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '图片预览'
  }

  handleClick1: () => void
  onClose1: () => void
  onDelete1: () => void
  onClose2: () => void

  callBackArr:Array<any>

  constructor() {
    super(...arguments)
    this.callBackArr = []
    this.handleClick1 = this.handleClick.bind(this, 'preview1')
    this.onClose1 = this.onClose.bind(this, 'preview1')
    this.onDelete1 = this.onDelete.bind(this, 'imageData')
    this.onClose2 = this.onClose.bind(this, 'preview2')
    this.onDelete2 = this.onDelete2.bind(this)
    this.uploadSimulation = this.uploadSimulation.bind(this)
    this.setNextCallback = this.setNextCallback.bind(this)

    this.state = {
      files: [],
      imageData: [v, h, v, h].map((item, index) => {return {uid: index, source: item}}),
      preview1: false,
      preview2: false,
      current1: 1,
      current2: 1
    }
  }

  handleClick2 = (type, index, file) => {
    console.log('handleClick2 index', index, file);
  
    // @ts-ignore
    this.setState({
      [type]: true,
      current2: index + 1
    })
  }

  handleClick = type => {
    // @ts-ignore
    this.setState({
      [type]: true
    })
  }

  onClose(type){
    // @ts-ignore
    this.setState({
      [type]: false
    })
  }

  onDelete(type, data) {
    console.log('data', data)
    // @ts-ignore
    this.setState({
      [type]: data.files,
      current1: data.index - 1
    })
  }

  onDelete2(data) {
    const deleteNum = data.index
    const {files} = this.state
    const newFiles = files.filter((item ,index) => {
      if((index + 1) !== deleteNum){
        return true
      }
    })
    console.log(files, deleteNum, newFiles)
    // @ts-ignore
    this.setState({
      files: newFiles
    })
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

  render() {
    const {imageData, preview1, current1, files, preview2, current2} = this.state
    console.log('filesfilesfiles', files)
    let imageData2 = files.map((item) => {
      if(item.status === "success"){
        return {
          uid: item.uid,
          source: item.url
        }
      }
      return false
    }).filter(Boolean)
    return (
      <View className='page'>
        <View className='doc-body'>
          {/* 基础用法 */}
          <View className='panel'>
            <View className='panel__title'>基础用法</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtButton onClick={this.handleClick1}>
                        预览
                </AtButton>
                {
                  preview1 && 
                  <AtPreviewImage 
                    imageData = {imageData}
                    onClose = {this.onClose1}
                    onDelete = {this.onDelete1}
                    current = {current1}
                  />
                }
              </View>
            </View>
          </View>
          {/* 普通图片上传组件 + 预览 */}
          <View className='panel'>
            <View className='panel__title'>普通图片上传组件 + 预览</View>
            <View className='panel__content no-padding'>
              <View className='example-item'>
              <View className="image-picker-demo__container">
                <View className="image-picker-demo__title">图片选择器</View>
                <AtImagePicker 
                  files = {files}
                  multiple = {true}
                  count = {9}
                  length = {4}
                  onImageClick = {this.handleClick2.bind(this, 'preview2')}
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
                {
                  preview2 && 
                  <AtPreviewImage 
                    imageData = {imageData2}
                    onClose = {this.onClose2}
                    onDelete = {this.onDelete2}
                    current = {current2}
                  />
                }                	
              </View>	
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
