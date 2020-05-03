<!--
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-24 17:48:33
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-25 14:38:12
 -->
- https://github.com/NervJS/nerv-test-utils/blob/master/src/index.ts
- https://github.com/NervJS/nerv-server
- https://jestjs.io/docs/zh-Hans/23.x/expect

目前没有遇到特别的场景证明单元测试的价值。

## 注意事项
组件中但凡使用到了`Taro.pxTransform`，由于单元测试的时候，需要先确定设备的分辨率，所以在组件中需要添加如下代码：
```
import { initTestEnv } from '../../common/utils'
initTestEnv()
```
业务代码中由于会实现在config/index.js中配置designWidth，所以组件中并不需要设置designWidth了。组件中的designWidth是否会会覆盖配置中的designWidth未知（没必要纠结）。

## 在本次组件开发完毕，并且发布到npm上的时候，最后一道关卡应该是单元测试
```
yarn run test 
```

describe第一个参数是本系列测试的一个名称，第二个参数是具体的测试行为，it表示一次单元测试，分为快照测试与DOM测试

## 快照测试
第一次调用expect(...).toMatchSnapshot()的时候会在当前文件夹生成一个快照文件，以后每次执行这个单元测试的时候，会将生成的快照与第一次的快照文件对比，如果不一样，测试会失败，如果需要更新快照，请执行如下：
```
yarn run test --updateSnapshot 或者 yarn run test -u 或者 npm run test:u
```
最后添加的参数会被添加到script后面test句柄的最后，相当于
```
cross-env NODE_ENV=test && jest --coverage -u
```

注意： npm run test -u 会出错

## DOM测试
通过模拟一些事件，来保证组件事件的正确触发。

> 例子
```
describe('AtDivider Event', () => {
  it('AtDivider click', () => {
    const onClick = jest.fn()
    
    const component = renderIntoDocument(<AtDivider content = '分割线' onClick = {onClick} fontColor='#E3E6E9' fontSize="50"/>)
    const componentDom = findDOMNode(component, 'at-divider')

    const contentDom = componentDom.querySelector('.at-divider__content');

    Simulate.click(contentDom)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```


## nerv-test-utils各个api的作用
#### renderIntoDocument
这个函数的作用：
```
function renderIntoDocument (instance) {
  const dom = document.createElement('div')
  return React.render(instance, dom)
}
```
将传入的reactElement元素通过render渲染到创建div中，并返回创建的这个div

#### Simulate
引入了simulate-event包的simulateEvents ，用于调用触发dom上的相应的事件，通过自定义事件来触发事件：document.createEvent，Event.prototype.initEvent,addEventListener,dispatchEvent
```
Simulate[event] = (node, mock) => (simulateEvents.simulate(node, event.toLowerCase(), mock))
```

