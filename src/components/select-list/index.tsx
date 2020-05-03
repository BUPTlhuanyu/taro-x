/* eslint-disable taro/function-naming */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

import SeletRadio from './select-radio/index'

import { handleTouchScroll } from '../../common/utils'

import {IProps, IState} from 'types/select-list'

/**
 * bug 2019-12-10： taro #5052
 * 注意在map中所有涉及到this的数据，不能直接写在return的jsx上，需要在map函数中先保存下来，利用闭包的原理解决。所以this.props这些需要先解构
 * createRef创建的ref需要先保存下来，或者用函数创建ref的方式，避免map中jsx的this的丢失。两者的原理一样，闭包。
 */
export default class AtSelectList extends AtComponent<IProps, IState> {
    static defaultProps: IProps
    constructor (props) {
        super(...arguments)
        const { isOpened } = props
        this.state = {
            _isOpened: isOpened
        }
    }

    componentWillReceiveProps (nextProps) {
        const { isOpened } = nextProps

        if (this.props.isOpened !== isOpened) {
            handleTouchScroll(isOpened)
        }

        if (isOpened !== this.state._isOpened) {
            this.setState({
                _isOpened: isOpened
            })
        }
    }

    close = () => {
        this.props.onCancel()
    }

    handleTouchMove = e => {
        e.stopPropagation()
    }


    render () {
        const { _isOpened } = this.state
        const { options, value, onChangeValue } = this.props
        const rootClass = classNames(
            'select-list',
            {'select-list--active': _isOpened},
            this.props.className
        )

        return (
        <View className={rootClass} onTouchMove={this.handleTouchMove}>
            <View onClick={this.close} className='select-list__overlay' />
            <View className='select-list__container'>
                <View className='select-list-header'>
                    <View className='select-list-header__btn-empty'>确定</View>
                    <View className='select-list-header__btn' >{this.props.title}</View>
                    <View className='select-list-header__btn-close' onClick={this.close} >取消</View>
                </View>
                <View className='select-list-body'>
                    <SeletRadio
                      options={options}
                      value={value}
                      onChangeValue={onChangeValue}
                    />
                </View>
            </View>
        </View>
        )
    }
}
AtSelectList.defaultProps = {
    className: '',
    isOpened: false, // 控制
    title: '', // 题目
    options: [], // 选项
    value: '', // 取值
    onCancel: () => {}, // 取值
    onChangeValue: () => {}
}