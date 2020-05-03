/**
 * 微信公众号的情况与h5情况不一样，
 * 如果是公众号需要传入chooseFile来选择上传图片
 * 如果是h5环境则不需要传入chooseFile
 * 
 * 组件功能：
 *      该组件只负责展示外界传入的图片，不对外提供发生错误的时候展示什么图片，以及默认图片相关的props
 */

/* eslint-disable no-nested-ternary */
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'
import isPlainObject from 'lodash/isPlainObject'
import { IProps, IState } from 'types/certi-picker'

// utils,判断对象是否包含keys数组中的key
const hasOwnProperty = function(obj: object, keys: Array<string>){
  if(isPlainObject(obj)){
    let len = keys.length
    for(let i = 0; i < len; i++){
      if(!obj.hasOwnProperty(keys[i])){
        return false
      }
    }

    // forEach无法return中断，只能通过try.catch中断
    // keys.forEach((item) => {
    //   if(!obj.hasOwnProperty(item))return false
    // })
    
    return true
  }
  return false
}

const ratio = 0.625  // 容器的高度/宽度 = 100 / 160
const ENV = Taro.getEnv()


export default class AtCertiPicker extends AtComponent<IProps, IState> {
  static defaultProps:IProps
  constructor(props){
    super(props)
    this.showLoading = this.showLoading.bind(this)
    this.chooseFile = props.chooseFile ? props.chooseFile.bind(this, this.showLoading) : this.chooseFile.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.handleRemoveImg = this.handleRemoveImg.bind(this)
    this.state = {
      loading: false,
      showRemoveTag: false,
      mode: 'aspectFill',
      style: {},
      imageCls: 'at-certi-picker__preview-img'
    };
  }

  showLoading(loading: boolean){
    this.setState({
      loading
    })
  }

  /**
   * @msg: 选择上传图片，首先将loading加载出来，
   * 然后将选择的照片资源传给父组件，父组件的处理完成之后再回传给子组件，用于展示
   * 
   * 确保图片对象中存在info属性，后续图片加载完成之后会根据这个确定删除按钮的状态
   */
  chooseFile = () => {
    const { sizeType, sourceType } = this.props
    const filePathName = ENV === Taro.ENV_TYPE.ALIPAY ? 'apFilePaths' : 'tempFiles'
    // const count = multiple ? 99 : 1
    const params:any = {}
    params.count = 1
    if (sizeType) { params.sizeType = sizeType }
    if (sourceType) { params.sourceType = sourceType }
    Taro.chooseImage(params).then(res => {
      this.showLoading(true)
      let url = res.tempFilePaths[0], file = res[filePathName][0], targetFiles;
      // 选择图片之后，获取图片的尺寸
      Taro.getImageInfo({
        src: res.tempFilePaths[0]
      }).then((res) => {
        // 微信小程序端需要先设置mode，
        // bug描述：图片加载完成之后同时对style以及mode执行setData，
        // 微信小程序底层会先解析mode，然后解析style，导致mode确定了宽度之后，将图片按照style旋转后进行缩放
        // fix： 先设定图片为widthfix模式展示（图片的宽度不变，高度自适应，保持宽高比），然后等图片加载完成之后，按照style旋转缩放，然后执行widthfix（处理的是真实图片的宽高，不是展示的时候的方位上的宽高）
        if(ENV !== Taro.ENV_TYPE.WEB){
          this.setState({
            mode : 'widthFix'
          })
        }
        targetFiles = {
          info: {width: res.width, height: res.height},
          url,
          file
        }
      // 将选中的图片文件传递给业务逻辑，业务逻辑可以拿到这个file进行上传，如果成功则可以将这个file传递给successFile，如果失败则展示failFile
        this.props.onChange('add', targetFiles)
      }).catch((res) => {
        targetFiles = {
          info: '',
          url: '',
          file: ''
        }
        this.props.onChange('add', targetFiles)
      })
    }).catch(this.props.onFail)
  }

  /**
   * 在图片load之后，传入图片信息，设置展示图片的展示样式
   */
  setImageStyle(info){
    console.log('图片加载完成', info);
    // 在删除图片的时候，需要加载默认的图片，因此在这里加载完默认图片之后再重置属性
    // 否则删除过程中会出现中间态，图片的mode会改变
    if(!hasOwnProperty(info, ['width', 'height'])) {
      console.log('setImageStyle')
      this.setState({
        showRemoveTag: false,
        mode: 'aspectFill',
        style: {}
      })
      return
    }
    let width = info.width, height = info.height;
    
    // 如果传入的图片的宽度小于高度，那么需要将其逆时针旋转90度
    //      对于小程序而言： 由于编译后dom结构不一样，所以用
    if(width < height){
      if(ENV !== Taro.ENV_TYPE.WEB){
        // 小程序
        let newRatio = `scale(${ratio})`
        if(width / height > ratio){
          newRatio = ''
        }
        let style = {
          transformOrigin: 'center',
          transform: `translate(-50%, -50%) rotate(-90deg) ${newRatio}`,
          position: 'relative',
          left: '50%',
          top: '50%'
        }

        this.setState({
          loading: false,
          showRemoveTag: true,
          mode : 'widthFix',
          style
        })
      }else{
        // h5
        if(width / height > ratio){
          this.setState({
            loading: false,
            showRemoveTag: true,
            mode : 'widthFix',
            imageCls: `at-certi-picker__preview-img`
          })
        }else{
          this.setState({
            loading: false,
            showRemoveTag: true,
            mode : 'widthFix',
            imageCls: `at-certi-picker__preview-img-h5-ratio`
          })
        }
      }
    }else{
      this.setState({
        loading: false,
        showRemoveTag: true,
        mode: 'aspectFill'
      })
    }
  }

  /**
   * 当上传的图片存在的时候可预览
   */
  handleImageClick = () => {
    let info = this.props.file.info
    if(info && info.width){
      this.props.onImagePreview()
    }else{
      this.chooseFile()
    }
  }

  handleRemoveImg = () => {
    const { file = {url:''} } = this.props
    if (ENV === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(file.url)
    }
    this.props.onChange('remove')
  }

  render () {
    const {
      className,
      customStyle,
      file
    } = this.props
    const { mode, style, imageCls, showRemoveTag, loading } = this.state
    const rootCls = classNames('at-certi-picker', className)

    

    return <View className={rootCls} style={customStyle}>
                {
                  loading &&
                  <View className='at-certi-picker__loading'>
                    <View>
                      <View className='at-certi-picker__loading-item'></View>
                      <View className='at-certi-picker__loading-item'></View>
                      <View className='at-certi-picker__loading-item'></View>
                    </View>
                  </View>
                }
                {
                  showRemoveTag && 
                  <View
                    className='at-certi-picker__remove-btn'
                    onClick={this.handleRemoveImg}
                  ></View>
                }
                <View className = 'at-certi-picker__preview-container'>
                  <Image
                    className={imageCls}
                    style = {style}
                    mode={mode}
                    src={file.url}
                    onClick={this.handleImageClick}
                    onLoad = {this.setImageStyle.bind(this, file.info)}
                  />
                </View>
            </View>
  }
}

AtCertiPicker.defaultProps = {
  className: '',
  customStyle: '',
  file: {url:''},
  onChange: () => 1,
  onImagePreview: () => {},
  onFail: () => {},
}
