/**
 * 数据流： 
 *        组件挂载阶段： 
 *            props传入的current表示展示imageData中的第几张图片，只有在组件实例化以及组件didMount中会读取props中的current          
 *        组件更新阶段： 展示props.imageData第几张图片由内部state.current决定，为保持数据流的清晰，不能交给用户处理
 * 删除图片，父子组件的数据结构： 
 *        子组件展示图片所需要的数据就是一个简单的数组而已，具体的数据结构交由外部处理，内部保持数据结构足够简单即可
 * 组件图片数据的变化：
 *        子组件删除图片的时候，图片数据需要实时的更新，所以每次删除必须由子组件通知父组件更改图片数据，
 *        否则删除是无效的，也不能等用户删除完毕之后退出的时候通知父组件，因为，用户的手势滑动有可能会
 *        导致退出图片预览组件，导致删除无效。
 */

import Taro from '@tarojs/taro'
import classNames from 'classnames'
import {View, Image} from '@tarojs/components'
import AtComponent from '../../common/component'

import closeIcon from './close.svg'
import trashIcon from './trash.svg'

import {IProps, IState} from 'types/preview-image'

export default class AtPreviewImage extends AtComponent<IProps, IState>{
  static defaultProps: IProps

  startX: number // 保存触摸开始的时候，触摸点距离视口的横向距离
  prevX: number  // 保存触摸滑动的时候，上一次触摸点距离视口的横向距离
  hadMove: boolean // 标记是否横向滑动,确保点击不会触发图片的切换
  touchEnd: boolean // 标记是否触摸结束
  translateXMin: number  // 最少移动的距离
  
  unitOfImgWidth: number // 每张图片的宽度
  constructor(props){
    super(props)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      translateX: 0,
      current: this.initCurrentData(props)
    }
  }

  initCurrentData(props){
    let len = props.imageData.length
    let current = props.current
    return current > len? len : current
  }

  componentDidMount(){
    const imgNumber = this.props.imageData.length
    const {current} = this.state
    
    // 将选择器的选取范围更改为自定义组件 component 内。
    if(process.env.TARO_ENV === 'h5'){
      const dom = document.querySelector(`#content`)
      if (!dom) return
      const imagesContentWidth = dom.getBoundingClientRect().width  // 获取图片容器的总宽度
      this.unitOfImgWidth = imagesContentWidth / imgNumber // 获取每张图片的容器宽度
      this.translateXMin =  - this.unitOfImgWidth * (imgNumber - 1) // 获取最大的滑动距离
      this.setState({
        translateX: - (current - 1) * this.unitOfImgWidth
      })
    }else{
      const query = process.env.TARO_ENV === 'weapp' ? Taro.createSelectorQuery().in(this.$scope) : Taro.createSelectorQuery()
      query.select(`#content`).boundingClientRect().exec(res => {
        const imagesContentWidth = res[0].width
        this.unitOfImgWidth = imagesContentWidth / imgNumber
        this.translateXMin = - this.unitOfImgWidth * (imgNumber - 1)
        this.setState({
          translateX: - (current - 1) * this.unitOfImgWidth
        })
      })
    }

  }

  componentWillReceiveProps(nextProps){
    // 处理图片数据的变化
    // 获取删除后传入的图片数据长度
    let imgNumber = nextProps.imageData.length
    // 获取需要展示第几张图片
    let current = this.state.current
    // 确保展示第几张图片是在有效值范围内
    if(current < 1){
      current = 1
    }else if(current > imgNumber){
      current = imgNumber
    }
    // 更改活动的距离，避免删除的时候，图片数量减少，位置不变导致的bug
    this.translateXMin =  - this.unitOfImgWidth * (imgNumber - 1)
    this.setState({
      current,
      translateX: - (current - 1) * this.unitOfImgWidth
    })
  }

  onTouchStart(e){
    // 记录第一次的触摸点在视口中的x坐标
    this.startX = e.changedTouches[0].clientX
    this.prevX = e.changedTouches[0].clientX
    this.hadMove = false
  }

  onTouchMove(e){
    // 获取当前move事件,触摸点的位置
    const x = e.changedTouches[0].clientX
    console.log('x', x)
    // 本次move移动的距离
    const deltaX = x - this.prevX
    // 保存当前触摸点位置
    this.prevX = x 
    // 触摸还没结束
    this.touchEnd = false
    if(Math.abs(x - this.startX) > 10){
      // 滑动距离大于10，则标记为滑动中
      this.hadMove = true
    }
    this.setState((prev) => {
      // 横向移动的总距离
      let newTranslateX = prev.translateX + deltaX
      // 确保在最小与最大移动距离之中，滑到最左边与最右边的时候，不能再滑动
      if(newTranslateX > 0){
        newTranslateX = 0
      }else if(newTranslateX < this.translateXMin){
        newTranslateX = this.translateXMin
      }
      return {translateX: newTranslateX}
    })
  }

  onTouchEnd(e){
    // 不支持点击切换
    if(this.hadMove){
      // 获取触摸结束之后触摸点在视口中的x坐标
      const x = e.changedTouches[0].clientX
      // 触摸结束时候到触摸开始时候移动的总距离
      const deltaX = x - this.startX
      // 获取滑动的方向
      const singBit = deltaX < 0? 1 : -1
      // 触摸结束
      this.touchEnd = true
      // 当前所有图片的总数与横向移动的总距离
      const imgNumber = this.props.imageData.length
      const {translateX} = this.state
      // 计算左移一张还是右移一张
      let deltaIndex = 0
      if(Math.abs(translateX) > (this.unitOfImgWidth * 0.1)){
        deltaIndex = 1 * singBit
      }
      this.setState((prev) => {
        // 计算当前需要展示第几张图片
        let current = prev.current + deltaIndex
        // 确保左右两头不能往左或者右继续滑动
        if(current < 1){
          current = 1
        }else if(current > imgNumber){
          current = imgNumber
        }
        return {
          translateX: - (current - 1) * this.unitOfImgWidth,
          current 
        }
      })
    }

  }

  getPosition () {
    const transition = this.touchEnd ? 0.3 : 0
    const imgNumber = this.props.imageData.length
    // 设置图片容器的总宽度为4倍
    // 这里不能用config/index.js中的designWidth，比如750，原因是个别手机在微信内置浏览器中无法很好的自适应
    const width = `${imgNumber * 100}%`
    let {translateX} = this.state
    return `width:${width};transform: translate3d(${
      translateX 
    }px, 0, 0);transition: transform ${transition}s;`
  }

  onDelete () {
    // 获取当前展示的图片
    const {current} = this.state
    // 剔除删除的图片
    let files = this.props.imageData.filter((item, index) => {
      if(current !== (index + 1)){
        return true
      }
    })
    console.log('onDelete', current, files)
    const res = {
      index: current, 
      files 
    }
    // 将图片以及删除的第几张图片传给父组件
    this.props.onDelete && this.props.onDelete(res)
    // 如果所有的都删除了，则退出预览
    if(files.length === 0){
      this.props.onClose()
    }
  }

  render(){
    const {imageData, onClose} = this.props
    const imgNumber = imageData.length
    let {current} = this.state
    current = imgNumber === 0 ? 0 : current 
    let trashFlag = imgNumber === 0? false : true

    let rootCls = classNames(
      "at-preview-image", 
      this.props.className
    )
    console.log('imageData', imgNumber, imageData, current);
    return (
      <View className = {rootCls}>
        <View className = 'at-preview-image__action-bar'>
          <View className='at-preview-image__switch'> 
            {/* <View className='at-icon at-icon-chevron-left' 
                  style={{color: '#fff', fontSize: Taro.pxTransform(42)}}
                  onClick = {onClose}      
            ></View> */}
            <View className='at-preview-image__pics'>{current} / {imgNumber}</View>
          </View>
          {
            trashFlag &&
            // <View className={`al-icon icon-delete`} style={{width: Taro.pxTransform(58),height: Taro.pxTransform(58)}} onClick = {this.onDelete}></View>
            <Image src={trashIcon} style={{width: Taro.pxTransform(58),height: Taro.pxTransform(58)}} onClick = {this.onDelete}  />
          }
        </View>
        <View className = "at-preview-image__content-wraper">
          <View className = "at-preview-image__content"
                id = "content" 
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                style = {this.getPosition()}>
            {
              imageData.map((item) => (
                <View className = "at-preview-image__item" key={item.uid}>
                  <Image src={item.source} 
                          style={{width: '100%', height: '100%'}}
                          mode = "widthFix"
                    />
                </View>
              ))
            }
          </View>
        </View>
        {/* <View className={`al-icon icon-clear at-preview-image__close`} ></View> */}
        <Image className="at-preview-image__close" src={closeIcon} onClick = {onClose}  />
      </View>
    )
  }
}

AtPreviewImage.defaultProps = {
  imageData: [],
  onClose: () => {},
  current: 1
}