import Taro from '@tarojs/taro'
import AtComponent from '../../common/component'
import {View, Text} from '@tarojs/components'
import classnames from 'classnames'

import {IProps} from 'types/accordion'

class AtAccordion extends AtComponent<IProps>{
  static defaultProps: IProps
  constructor(props){
    super(props)
    this.state = {
      _isOpened: isOpened
    }
  }
  render(){
    const { type, actionList } = this.props
    const {_isOpened} = this.state
    const rootClass = classnames('at-action-sheet',{
      'at-action-sheet--active': _isOpened
    })
   

    return (
      <View className={rootClass}>
       
      </View>
    )
  }

}

AtAccordion.defaultProps = {
  items: [],
}

export default AtAccordion