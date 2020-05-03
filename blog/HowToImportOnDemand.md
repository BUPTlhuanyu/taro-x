
## 说明
> 需要注意的是对于第三方的taro组件，请在每个组件中加上addGlobalClass,确保外部可以通过样式覆盖的方式修改自定义组件中的样式，自定义组件中的样式不会影响外部页面的样式。

目前小程序端taro还不支持通过babel-plugin的方式实现按需加载，具体原因是mini-runner中会利用babel-plugin-danger-remove-unused-import插件将js相关的第三方库的import节点删除，因此会导致用户配置的babel获取不到组件的import节点。此外即便能过babel-plugin引入，但是还需将styleIsolation设置为shared，导致第三方组件之间的样式相互影响。因此为了实现按需加载，目前还没有比较方便的方案解决，只能在页面入口page.js/scss以及应用入口app.js/scss按需手动引入，建议在应用入口app.js/scss中引入。

---
## 通过babel做按需加载原理

目前给出的一种方式是利用已有的按需加载工作babel-plugin-import。可能还会存在利用babel-plugin-import实现的其他方案。

## 使用方法
在config中的index.js添加如下配置代码：
```
const {map, exludesMap} = require('taro-x/map/map.js')
const isWeb = process.argv.includes('h5')
const path = require('path')
const config = {
  ...
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['import',{
        'libraryName': 'taro-x',
        'camel2DashComponentName': false,
        'transformToDefaultImport': true,
        'customStyleName': (name) => {
          if(name in exludesMap){
            return `taro-x/dist/style/${exludesMap[name]}.scss`
          }
          return `taro-x/dist/style/${map[name]}.scss`
        },
        'customName': (name) => `taro-x/dist/${isWeb?'h5':'weapp'}/${map[name]}/index`,
      }]
    ]
  },
  ...
  mini: {
    ...
  },
  h5: {
    ...
    esnextModules: ['taro-x'],
    ...
  }
}
  ...
```
在使用的地方直接引入组件即可：
```
import { AtButton } from 'taro-ui'
```

## 此外对于icon图标的引入
iconfont图标样式的引入需要在入口单独添加，比如
```
import 'taro-ui/dist/style/components/icon.scss'
```
其他样式，比如主题可以按照这种方式自行导入。

## 按需加载结果
减少包体积，加速首屏渲染有两种方式：tree-shaking与按需加载。一般而言css作为组件库的副作用，会逃离tree-shaking的作用，因此按需加载也不可或缺。
> 按需加载前
```
import { AtButton } from 'taro-ui'
```

> 按需加载后
```
import AtButton from 'taro-ui/dist/h5/components/button/index'
import 'taro-ui/dist/style/components/button.scss'
```

注意上述配置有一个缺点，AtActionSheetItem得样式在action-sheet.scss中，每次遇到导入AtActionSheetItem的时候，都会要添加一个import节点，如果customStyleName中返回空字符或者undefined会报错，目前只能遇到AtActionSheetItem的时候也引入action-sheet.scss，导致了重复导入多个相同的style，但是这些重复导入的模块会被webpack处理掉，因此这里不必过多担心。

## 包体体积
在app.js之后全量引入css

https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/assets/1.png

按需加载

https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/assets/2.png

## 原理请参考
- [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- [taro-ui组件库的按需加载](https://github.com/BUPTlhuanyu/Deep-into-JS/blob/master/Babel/taro-import/taro-ui%E7%BB%84%E4%BB%B6%E5%BA%93%E7%9A%84%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD.md)