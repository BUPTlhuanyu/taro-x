import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import classNames from 'classnames'

import step1 from '../../../static/image/step1.svg'
import step2 from '../../../static/image/step2.svg'
import step3 from '../../../static/image/step3.svg'
import arrowBottom from '../../../static/image/arrow-bottom.svg'

interface IProps {
    
}
interface IState {
    content1Show: boolean
    content2Show: boolean
    content3Show: boolean
}
export default class TimelinePage extends Taro.Component<IProps, IState> {
  config = {
    navigationBarTitleText: '手风琴'
  }
  constructor () {
    super(...arguments)
    this.state = {
      content1Show: false,
      content2Show: false,
      content3Show: false,
    }
  }
  handleClick = (content) => {
      let newBool = !this.state[content]
      console.log('newBool', newBool);
      this.setState({
          [content]: newBool
      })
  }
  render () {
      const {content1Show, content2Show, content3Show} = this.state
    return (
      <View className='example'>
              <View className='at-accordion'>
                <View className='at-accordion-item'>
                    <View className='at-accordion-item__title' onClick={() => this.handleClick('content1Show')}>
                        <View className="at-accordion-item__title-left">
                            <Image className='at-accordion-item__title--icon' src={step1}/>
                            <View className='at-accordion-item__title--content'>吃饭</View>
                        </View>
                        <Image className={classNames('at-accordion-item__title-right', [content1Show ? 'at-accordion-item__title-right-roate' : ''])} src={arrowBottom}/>
                    </View>
                    <View className='at-accordion-item__tail'></View>
                    <View className={classNames('at-accordion-item__content', 'at-accordion-item__content-1', [content1Show ? '' : 'at-accordion-item__content-hide'])}>
                        <View className='at-accordion-item__content-body' >
                          文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        </View>
                    </View>
                </View>
                <View className='at-accordion-item'>
                    <View className='at-accordion-item__title' onClick={() => this.handleClick('content2Show')}>
                        <View className="at-accordion-item__title-left">
                            <Image className='at-accordion-item__title--icon' src={step2}/>
                            <View className='at-accordion-item__title--content'>睡觉</View>
                        </View>
                        <Image className={classNames('at-accordion-item__title-right', [content2Show ? 'at-accordion-item__title-right-roate' : ''])} src={arrowBottom}/>
                    </View>
                    <View className='at-accordion-item__tail'></View>
                    <View className={classNames('at-accordion-item__content', 'at-accordion-item__content-2', [content2Show ? '' : 'at-accordion-item__content-hide'])}>
                        <View className='at-accordion-item__content-body' >
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        </View>
                    </View>
                </View>
                <View className='at-accordion-item'>
                    <View className='at-accordion-item__title' onClick={() => this.handleClick('content3Show')}>
                        <View className="at-accordion-item__title-left">
                            <Image className='at-accordion-item__title--icon' src={step3}/>
                            <View className='at-accordion-item__title--content'>打豆豆</View>
                        </View>
                        <Image className={classNames('at-accordion-item__title-right', [content3Show ? 'at-accordion-item__title-right-roate' : ''])} src={arrowBottom}/>
                    </View>
                    <View className='at-accordion-item__tail'></View>
                    <View className={classNames('at-accordion-item__content', 'at-accordion-item__content-3', [content3Show ? '' : 'at-accordion-item__content-hide'])}>
                        <View className='at-accordion-item__content-body' >
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
                        </View>
                    </View>
                </View>
              </View>
               
      </View>
    )
  }
}
