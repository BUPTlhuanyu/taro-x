import Taro from '@tarojs/taro'
import { View, Image, OpenData, Text } from '@tarojs/components'
import classNames from 'classnames'

import AtComponent from '../../common/component'

import {IProps, IState} from 'types/avatar'

const SIZE_CLASS = {
    large: 'large',
    normal: 'normal',
    small: 'small',
  }


export default class AtAvatar extends AtComponent<IProps, IState>{
    static defaultProps: IProps
    constructor(props){
        super(props)
        this.state = {
            isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
        }
    }
    render(){
        const {
            size,
            circle,
            image,
            text, 
            openData,
            className,
            customStyle,
        } = this.props
        const rootClassName = ['at-avatar']

        const iconSize = SIZE_CLASS[size? size : 'normal']
        const classObject = {
            [`at-avatar--${iconSize}`]: iconSize,
            'at-avatar--circle': circle,
          }
        let letter = ''
        if (text) letter = text[0]

        let elem
        if (openData && openData.type === 'userAvatarUrl' && this.state.isWEAPP) {
          elem = (<OpenData type={openData.type}></OpenData>)
        } else if (image) {
          elem = (<Image className='at-avatar__img' src={image} />)
        } else {
          elem = (<Text className='at-avatar__text'>{letter}</Text>)
        }
        return (
            <View
                className={classNames(rootClassName, classObject, className)}
                style={customStyle}
            >
                {elem}
            </View>
        )
    }
}

AtAvatar.defaultProps = {
    size: 'normal',
    circle: false,
    text: '',
    image: '',
    customStyle: {},
    className: '',
}