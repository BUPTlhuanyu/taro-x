import Taro from '@tarojs/taro'
import AtComponent from '../../common/component'
import {View, Text} from '@tarojs/components'
import classnames from 'classnames'

import {IProps, IState, actionListItem} from 'types/action-sheet'

class AtActionSheet extends AtComponent<IProps, IState>{
  static defaultProps: IProps

  constructor(props){
    super(props)
    this.handleClickOverlay = this.handleClickOverlay.bind(this)
    this.handleClose = this.handleClose.bind(this)
    const { isOpened } = props
    this.state = {
      _isOpened: isOpened
    }
  }

  handleClickOverlay = () => {
    this.setState(
      {
        _isOpened: false
      },
      this.handleClose
    )
  }

  handleClose = () => {
    if ((this.props.onClose)) {
      this.props.onClose()
    }
  }



  componentWillReceiveProps(nextProps: IProps){
    console.log(nextProps, this.state._isOpened)
    if(nextProps.isOpened !== this.state._isOpened){
      this.setState({
        _isOpened: nextProps.isOpened
      })
    }
  }

  
  render(){
    const { type, actionList } = this.props
    const {_isOpened} = this.state
    const rootClass = classnames('at-action-sheet',{
      'at-action-sheet--active': _isOpened
    })
    const containerClass = classnames({
      "at-action-sheet__container-center": type === 'center',
      "at-action-sheet__container-bottom": type === 'bottom',
    })
    let content, bottomList, normalList
    let bottomData: actionListItem[] = [], normalData: actionListItem[] = []
    if(type === 'center'){
      content = actionList.map((item) => {
        let { key, text, style, onClick } = item
        return <View className={`${containerClass}-item`} style = {style} key = {key} onClick={onClick} >
          <Text>{text}</Text>
        </View>
      })
    }
    if(type !== 'center'){
        // 小程序不支持for...of
        // for(let item of actionList){
        //   let itemData = item[1], {type} = itemData
        //   if(type === 'bottom'){
        //     bottomData.push(itemData)
        //   }else{
        //     normalData.push(itemData)
        //   }
        // }
        actionList.forEach((item) => {
          let {type} = item
          if(type === 'bottom'){
            bottomData.push(item)
          }else{
            normalData.push(item)
          }
        })

        bottomList = bottomData.map((item) => {
          let { key, text, style, onClick } = item
          return <View className={`${containerClass}-item`} style = {style} key = {key} onClick={onClick}>
            <Text>{text}</Text>
          </View>
        })
        normalList = normalData.map((item) => {
          let { key, text, style, onClick } = item
          return <View className={`${containerClass}-normal-item`} style = {style} key = {key} onClick={onClick}>
                    <Text>{text}</Text>
                </View>
        })
    }

    return (
      <View className={rootClass}>
        <View className= "at-action-sheet__overlay" onClick={this.handleClickOverlay}></View>
        <View className= {containerClass}>
          {
            type === 'bottom'? (
              <View>
                <View>{normalList}</View>
                <View>{bottomList}</View>
              </View>
            ) : (
              <View>
                {content}
              </View>
            )
          }
          
        </View>
      </View>
    )
  }

}

AtActionSheet.defaultProps = {
  actionList: [],
  type: 'center',
  isOpened: false
}

export default AtActionSheet