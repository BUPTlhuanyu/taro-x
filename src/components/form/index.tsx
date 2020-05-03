import Taro from '@tarojs/taro'
import { Form } from '@tarojs/components'
import classNames from 'classnames'
import AtComponent from '../../common/component'

interface IProps {
    customStyle: object | string,
    className: Array<string> | string,
    reportSubmit: boolean,
    onSubmit: Function,
    onReset: Function,
    children?: any
}

interface IState{}

export default class AtForm extends AtComponent {
    props: IProps
    state: IState
    static defaultProps: IProps
    onSubmit (...args) {
        this.props.onSubmit(...args)
    }

    onReset (...args) {
        this.props.onReset(...args)
    }

    render () {
        const {
        customStyle,
        className,
        reportSubmit
        } = this.props
        const rootCls = classNames('at-form', className)

        return <Form
        className={rootCls}
        style={customStyle}
        onSubmit={this.onSubmit.bind(this)}
        reportSubmit={reportSubmit}
        onReset={this.onReset.bind(this)}
        >
        {this.props.children}
        </Form>
    }
}

AtForm.defaultProps = {
  customStyle: '',
  className: '',
  reportSubmit: false,
  onSubmit: () => {},
  onReset: () => {},
}