import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import AtComponent from '../../../common/component'

import './index.scss'
import {ISelectRadioProps} from 'types/select-list'

export default class SelectRadio extends AtComponent<ISelectRadioProps> {
    static defaultProps: ISelectRadioProps
    constructor () {
        super(...arguments)
    }
    config = {
        navigationBarTitleText: ''
    }

//   handleRadioChange (value) {
//     this.setState({
//       radioValue1: value
//     })
//   }
    handleClick = (option) => {
        this.props.onChangeValue(option.value)
    }

    render () {
        const { options, value } = this.props;
        return (
        <View className='select-radio'>
            {
                options.length>0 && options.map((option) => (
                    <View key={option.value} onClick={this.handleClick.bind(this, option)} className='select-radio_option-all'>
                        <View className='select-radio__option-wrap'>
                            <View className='select-radio__option-container'>
                                <View
                                  className={
                                    classNames({
                                        'select-radio__title': true,
                                        'select-radio__title--checked': value === option.value
                                    })
                                  }
                                >{option.label}</View>
                                <View className='select-radio__icon'></View>
                            </View>
                        </View>
                    </View>
                ))
            }
        </View>
        )
    }
}
SelectRadio.defaultProps = {
    options: [], // 选项
    value: '', // 取值
    onChangeValue: () => {}
}
