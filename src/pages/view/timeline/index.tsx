import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTimeline } from 'taro-x'
// import DocsHeader from '../../components/doc-header'
import './index.scss'
const contentJSX = () => (
        <View className='content-item'>
            <View className='test1'>
              文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字<Text className="test2">文字</Text>文字
            </View>
            <View className='test3'>
                2019-11-12 18:00:00
            </View>
        </View>
    )
const contentJSX1 = () => (
        <View className='content-item'>
            <View className='test4'>
              文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
            </View>
            <View className='test3'>
                2019-11-12 18:00:00
            </View>
        </View>
    )
const contentJSX2 = () => (
        <View className='content-item'>
            <View className='test11'>
            2019-01-18 11:46
            </View>
            <View className='test22'>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
            </View>
        </View>
    )
const contentJSX3 = () => (
        <View className='content-item'>
            <View className='test33'>
            2019-01-18 11:46
            </View>
            <View className='test44'>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
            </View>
        </View>
    )


export default class TimelinePage extends Taro.Component {
  config = {
    navigationBarTitleText: '时间轴'
  }
  renderHeader () {
      return <View className='content-item'>
            <View className='test1'>
            文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
            </View>
            <View className='test3'>
                2019-11-12 18:00:00
            </View>
        </View>
  }
        
    )
  render () {
    return (
      <View className='page'>
        {/* <DocsHeader title='Timeline 时间轴'></DocsHeader> */}

        <View className='doc-body'>
          {/* 自定义图标 */}
          {/* <View className='panel'>
            <View className='panel__title'>自定义图标</View>
            <View className='panel__content'>
              <View className='example-item'>
                <AtTimeline items={[{ title: '刷牙洗脸', icon: 'check-circle' }, { title: '吃早餐', icon: 'clock' }, { title: '上班', icon: 'clock' }, { title: '睡觉', icon: 'clock' }]}>
                </AtTimeline>
              </View>
            </View>
          </View> */}
          <View className='panel'>小程序不支持</View>
          <View className='panel'>
            <View className='panel__title'>单侧</View>
            <View className='panel__content'>
              <View className='example-item at-timeline-example'>
                <AtTimeline
                    items={[
                      { title: '刷牙洗脸', content: contentJSX},
                      { title: '吃饭上班', content: contentJSX1},
                      { title: '游戏睡觉', content: contentJSX1},
                    ]}  >
                </AtTimeline>
              </View>
            </View>
          </View>
          
          <View className='panel'>
            <View className='panel__title'>双侧</View>
            <View className='panel__content' style={{marginBottom: '20px'}}>
              tips: 左侧样式是组件中的， 右侧样式是render的（本页面）， 需要保证左右字体大小，行高等一致， 不然会出现对齐问题。
            </View>
            <View className='panel__content'>
              <View className='example-item at-timeline-example'>
                <AtTimeline
                    isDouble={true}
                    items={[
                      { title: '刷牙洗脸', content: contentJSX2},
                      { title: '吃饭上班', content: contentJSX3},
                      { title: '游戏睡觉', content: contentJSX3},
                    ]}  >
                </AtTimeline>
              </View>
            </View>
          </View>
          
        </View>
      </View>
    )
  }
}
