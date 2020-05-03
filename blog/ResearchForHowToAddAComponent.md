> 场景：A组件由B与C组件组成，A，B，C组件都可以被import。而A组件的样式中包含了B组件以及C组件的样式

taro组件样式编写方案有两种：样式集中管理的方式以及样式分散到各个组件之中
> 方案一：ABC组件样式集中一个文件，并且样式与组件逻辑分开管理，需要在使用的时候单独引入样式文件

- [x] 这种方案的特点：使用的时候组件库各个组件的样式只会被app.wxss或者当前页面的样式所影响。
- [x] 这种方案实现的要点：需要将组件的`options.addGlobalClass`设置为`true`。

> 方案二：ABC组件样式集中一个文件，并且被集成到组件中，使用时无需但单独引入样式文件

- [x] 这种方案的特点：见develop_planB分支代码，组件与组件以及页面之间的样式会相互影响，带来了后期维护的不确定性，会提高维护成本。但是不需要再额外引入样式。
- [x] 这种方案实现的要点：直接在父组件中添加样式文件，该文件包含了子组件样式；父组件的`options.styleIsolation`设置为`shared`(页面 wxss 样式将影响到父组件，父组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件)，子组件的`options.styleIsolation`设置为`apply-shared`；修改父组件样式的时候一些继承的样式可能会影响子组件的样式。

> 方案三：各个组件分别引入自己的样式文件，使用时无需但单独引入样式文件

- [x] 见develop_planC分支代码，没有看到组件库直接将css文件import到一个组件之中。原因：将样式文件放到组件里会导致在用户修改样式的时候，只能通过覆盖的方式，但是覆盖的优先级不好把控，因此，这里会想到，市面上的组件库大多是支持分文件按需导入，这里反过来想想，我导入自己的样式文件或者直接修改组件库的样式源码就能实现样式的修改，而不需要覆盖样式了。

#### 方案1：样式集中管理的方式


###### taro-ui组件编写举例
1 编写组件逻辑：继承AtComponent;编写类型;申明defaultProps;编写逻辑;
```
export default class AtModal extends AtComponent {
  state: IState
  props: IProps
  static defaultProps: { closeOnClickOverlay: boolean; }
  constructor (props) {
    super(props)

    const { isOpened } = props
    this.state = {
      _isOpened: isOpened,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
    }
  }
    ...

  render () {
    ...
    // 利用classnames代码库合并生成一个字符串用于元素的class
    const rootClass = classNames(
      'at-modal',
      {
        'at-modal--active': _isOpened
      },
      this.props.className
    )

    // 注意区分不同的环境
    if (title || content) {
        ...
        {content && (
          <AtModalContent>
            <View className='content-simple'>
              { isWEB ? <RichText nodes={content.replace(/\n/g, '<br/>')}></RichText> : <Text>{content}</Text> }
            </View>
          </AtModalContent>
        )}
        ...
      )
    }
    return (
      <View onTouchMove={this.handleTouchMove} className={rootClass}>
        <View className='at-modal__overlay' onClick={this.handleClickOverlay} />
        <View className='at-modal__container'>{this.props.children}</View>
      </View>
    )
  }
}

// 尽量写
AtModal.defaultProps = {
  closeOnClickOverlay: true
}
```
2. 添加样式文件到src/style/components中，注意在index.scss中引入
3. 将组件在src/index.ts中引入
4. 执行命令 `npm run dev:[不同平台]`进行测试
5. 生成多端组件 `npm run build:component`

###### taro-ui扩展必要问题：为什么会有AtComponent这个类

```
export default class AtComponent extends Component<IProps, any> {
  static options = {
    addGlobalClass: true
  }

  /**
   * 合并 style
   * @param {Object|String} style1
   * @param {Object|String} style2
   * @returns {String}
   */
  mergeStyle (style1, style2) {
    if ((style1 && typeof style1 === 'object')
      && (style2 && typeof style2 === 'object')
    ) {
      return Object.assign({}, style1, style2)
    }
    return objectToString(style1) + objectToString(style2)
  }
}
```

每个继承自该类的自定义组件都会具备静态属性options以及原型链方法mergeStyle，而在微信小程序中，每个自定义组件的样式默认是独立的，不会受组件外部样式的影响，即`默认情况下，自定义组件的样式只受到自定义组件 wxss 的影响。`，而，taro-ui的样式是通过全局引用然后从入口文件一起导入的，最终导致的结果是在生成的小程序dist文件app.wxss中包含了所有的组件样式。因此当你开发组件的过程中，出现样式的不正确是由于你的组件没有继承AtComponent类，也就没有`options = {addGlobalClass: true}`。

另外mergeStyle这个方法为你提供了合并样式的公共方法。

###### taro-ui扩展必要问题：在typescript下继承了AtComponent这个类，那怎么写state与props的类型

```
export default class AtModal extends AtComponent {
  state: IState
  props: IProps
  ...
}
```
由于taro-ui并不提供AtComponent泛型申明，因此不能像React.Component那样操作了。

#### 方案二：样式集中到父组件管理的方式

AtModal

```
import AtModalHeader from './header/index'
import AtModalAction from './action/index'
import AtModalContent from './content/index'

import './index.scss'
...

export default class AtModal extends Component<IProps, IState> {
  static options = {
    styleIsolation: 'shared'
  }
  ...
}
```

AtModalHeader
```
export default class AtModalHeader extends Component<IProps, {}> {
  static options = {
    styleIsolation: 'apply-shared'
  }
  render () {
    const rootClass = classNames('at-modal__header', this.props.className)
    return <View className={rootClass}>{this.props.children}</View>
  }
}
```

#### 方案三：样式分散到各个组件之中
import到各个tsx中，扩展性很低，放弃这种方案。