// Taro的动画ts类型与taro的jsx的动画属性animation类型矛盾，等官方修复

import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { View, Text, Image } from '@tarojs/components'
import AtComponent from '../../common/component'

import noise from './noise.svg'

import { IProps, IState } from 'types/tip'

export default class AtTip extends AtComponent<IProps, IState> {
  timeout: NodeJS.Timeout | null
  interval: NodeJS.Timeout 
  static defaultProps: IProps
  constructor () {
    super(...arguments)
    const animElemId = `J_${Math.ceil(Math.random() * 10e5).toString(36)}`
    
    this.state = {
      animationData: [{}],
      show: true,
      animElemId,
      dura: 15,
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
      isALIPAY: Taro.getEnv() === Taro.ENV_TYPE.ALIPAY,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
    }
  }

  onClose () {
    this.setState({
      show: false,
    })
    this.props.onClose && this.props.onClose()
  }

  onGotoMore () {
    this.props.onGotoMore && this.props.onGotoMore()
  }

  componentWillReceiveProps () {
    if (!this.timeout) {
      this.interval && clearInterval(this.interval)
      this.initAnimation()
    }
  }

  componentDidMount () {
    if (!this.props.marquee) return
    this.initAnimation()
  }

  initAnimation () {
    const {
      isWEAPP,
      isALIPAY,
    } = this.state
    this.timeout = setTimeout(() => {
      this.timeout = null
      if (this.state.isWEB) {
        const elem = document.querySelector(`.${this.state.animElemId}`)
        if (!elem) return
        const width = elem.getBoundingClientRect().width
        const dura = width / (+this.props.speed)
        this.setState({ dura })
      } else if (isWEAPP || isALIPAY) {
        const query = isALIPAY ? Taro.createSelectorQuery() : Taro.createSelectorQuery().in(this.$scope)
        query.select(`.${this.state.animElemId}`).boundingClientRect().exec((res: any) => {
          res = res[0]
          if (!res) return
          const { width } = res
          const dura = width / (+this.props.speed)
          const animation = Taro.createAnimation({
            duration: dura * 1000,
            timingFunction: 'linear',
          })
          const resetAnimation = Taro.createAnimation({
            duration: 0,
            timingFunction: 'linear',
          })
          const resetOpacityAnimation = Taro.createAnimation({
            duration: 0,
            timingFunction: 'linear',
          })
          const animBody = () => {
            resetOpacityAnimation.opacity(0).step()
            this.setState({ animationData: resetOpacityAnimation.export() })

            setTimeout(() => {
              resetAnimation.translateX(0).step()
              this.setState({ animationData: resetAnimation.export() })
            }, 300)

            setTimeout(() => {
              resetOpacityAnimation.opacity(1).step()
              this.setState({ animationData: resetOpacityAnimation.export() })
            }, 600)

            setTimeout(() => {
              animation.translateX(-width).step()
              this.setState({ animationData: animation.export() })
            }, 900)
          }
          animBody()
          this.interval = setInterval(animBody, (dura * 1000) + 1000)
        })
      }
    }, 100)
  }

  render () {
    const {
      single,
      icon,
      marquee,
      customStyle,
    } = this.props
    let {
      showMore,
      close,
    } = this.props
    const { dura } = this.state
    const rootClassName = ['at-noticebar']
    let _moreText = this.props.moreText

    // if (!single) showMore = false

    if (!_moreText) _moreText = '查看详情'

    const style = {}
    const innerClassName = ['at-noticebar__content-inner']
    if (marquee) {
      style['animation-duration'] = `${dura}s`
      innerClassName.push(this.state.animElemId)
    }

    const classObject = {
      'at-noticebar--marquee': marquee,
      'at-noticebar--weapp': marquee && (this.state.isWEAPP || this.state.isALIPAY),
      'at-noticebar--single': !marquee && single,
    }

    // const iconClass = ['at-icon']
    // if (icon) iconClass.push(`at-icon-${icon}`)

    return (
      this.state.show &&
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
        style={customStyle}
      >
        {close && (
          <View className='at-noticebar__close' onClick={this.onClose.bind(this)}>
            <Text className='at-icon at-icon-close'></Text>
          </View>
        )}
        <View className='at-noticebar__content-wraper'>
          {icon && (
            <View className='at-noticebar__icon'>
              {/* start hack 百度小程序 */}
              <Image src={noise} style={{width: Taro.pxTransform(32), height: Taro.pxTransform(36)}}/>
              {/* <Text className={classNames(iconClass, iconClass)}></Text> */}
            </View>
          )}        
          <View className='at-noticebar__content'>
            <View className='at-noticebar__content-text'>
              <View className='at-noticebar__content-text-filter'></View>
              <View animation={this.state.animationData as any} className={classNames(innerClassName)} style={style}>{this.props.children}</View>
            </View>
          </View>
        </View>

        {showMore && (
          <View className='at-noticebar__more' onClick={this.onGotoMore.bind(this)}>
            {/* <Text className='text'>{_moreText}</Text> */}
            {_moreText}
          </View>
        )}
      </View>
    )
  }
}

AtTip.defaultProps = {
  close: false,
  single: false,
  marquee: false,
  speed: 50,
  moreText: '查看详情',
  showMore: false,
  icon: '',
  customStyle: {},
  onClose: () => {},
  onGotoMore: () => {},
}