/* eslint-disable no-nested-ternary */
import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'
import { uuid } from '../../common/utils'

import { IProps, File } from 'types/image-picker'
import failImg from './fail.svg'

// 生成 jsx 二维矩阵
const generateMatrix = (files, col, showAddBtn) => {
  const matrix: Array<Array<any>> = []
  const length = showAddBtn ? files.length + 1 : files.length
  const row = Math.ceil(length / col)
  for (let i = 0; i < row; i++) {
    if (i === row - 1) {
      // 最后一行数据加上添加按钮
      const lastArr = files.slice(i * col)
      if (lastArr.length < col) {
        if (showAddBtn) {
          lastArr.push({ type: 'btn', uuid: uuid() })
        }
        // 填补剩下的空列
        for (let j = lastArr.length; j < col; j++) {
          lastArr.push({ type: 'blank', uuid: uuid() })
        }
      }
      matrix.push(lastArr)
    } else {
      matrix.push(files.slice(i * col, (i + 1) * col))
    }
  }
  return matrix
}

const ENV = Taro.getEnv()

export default class AtImagePicker extends AtComponent<IProps> {
  static defaultProps:IProps
  uid: number
  constructor(props){
    super(props)
    this.uid = 0
    this.chooseFile = props.chooseFile ? props.chooseFile.bind(this, props.onChange) : this.chooseFile.bind(this)
  }
  chooseFile = () => {
    const { multiple, count, sizeType, sourceType } = this.props
    const filePathName = ENV === Taro.ENV_TYPE.ALIPAY ? 'apFilePaths' : 'tempFiles'
    // const count = multiple ? 99 : 1
    const params:any = {}
    if (multiple) { params.count = 99 }
    if (count) { params.count = count }
    if (sizeType) { params.sizeType = sizeType }
    if (sourceType) { params.sourceType = sourceType }
    Taro.chooseImage(params).then(res => {
      // console.log('Taro.chooseImage', res)
      const targetFiles = res.tempFilePaths.map(
        (path, i) => {
          let fileObj: File = {
            uid: this.uid,
            status: 'loading',
            url: path,
            file: res[filePathName][i]
          }
          this.uid++
          return fileObj
        }
      )
      this.props.onChange('add', targetFiles)
    }).catch(this.props.onFail)
  }

  handleImageClick = idx => this.props.onImageClick(idx, this.props.files[idx])

  handleRemoveImg = idx => {
    const { files = [] } = this.props
    if (ENV === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(files[idx].url)
    }
    const newFiles = files.filter((file, i) => i !== idx)
    this.props.onChange('remove', newFiles,  idx)
  }

  render () {
    const {
      className,
      customStyle,
      files,
      mode,
      length,
      showAddBtn
    } = this.props
    // 行数
    const matrix = generateMatrix(files, length, showAddBtn)
    const rootCls = classNames('at-image-picker', className)
    console.log('status', matrix)
    return <View className={rootCls} style={customStyle}>
      {matrix.map((row, i) => (
        <View className='at-image-picker__flex-box' key={i + 1}>
          {row.map((item, j) => (
            item.url
              ? <View className='at-image-picker__flex-item' key={(i * length) + j}>
                <View className='at-image-picker__item'>
                  {
                    item.status === 'loading' ?
                    <View className='at-image-picker__item-cover' >
                      <View className='at-image-picker__item-loading'>
                        <Text className='at-icon at-icon-loading'></Text>
                      </View>
                    </View>
                    :
                    <View
                      className='at-image-picker__remove-btn'
                      onClick={this.handleRemoveImg.bind(this, (i * length) + j)}
                    />
                  }
                  {
                    item.status !== 'failed'? 
                      <Image
                        className='at-image-picker__preview-img'
                        mode={mode}
                        src={item.base64? item.base64 : item.url}
                        onClick={this.handleImageClick.bind(this, (i * length) + j)}
                      />
                      :
                      <View className='at-image-picker__item-fail'>
                        <View className='at-image-picker__item-fail-cover'></View>
                        <Image
                          className='at-image-picker__item-fail-img'
                          src={failImg}
                        />
                        <View className ='at-image-picker__item-fail-text'>上传失败</View>
                      </View>
                  }
                </View>
              </View>
              : <View className='at-image-picker__flex-item' key={(i * length) + j}>
                {item.type === 'btn' && (
                  <View
                    className='at-image-picker__item at-image-picker__choose-btn'
                    onClick={this.chooseFile}
                  >
                    <View className='add-bar'></View>
                    <View className='add-bar'></View>
                  </View>
                )}
              </View>
          ))}
        </View>
      ))}
    </View>
  }
}

AtImagePicker.defaultProps = {
  isTest: false,
  className: '',
  customStyle: '',
  files: [],
  mode: 'aspectFill',
  showAddBtn: true,
  multiple: false,
  length: 4,
  onChange: () => {},
  onImageClick: () => {},
  onFail: () => {},
}
