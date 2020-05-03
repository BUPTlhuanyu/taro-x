<!--
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2019-10-26 11:22:29
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-04-07 17:16:43
 -->
基于taro的公共组件库

## 👽参考：
- [基于 Taro 开发第三方多端 UI 库](https://nervjs.github.io/taro/docs/ui-lib.html) 
- taro-ui(taro-ui是基于taro/components)
- [hook写的taro多端UI库](https://github.com/yinLiangDream/mp-colorui)

## 👽使用方法
在使用之前请升级taro-cli版本为2.1.0
```
npm install taro-x --save
```
注意： 在H5端，如果是通过tsx文件`import`样式，需要将config中的h5的配置添加`esnextModules`选项
```
const config = {
  ...
  h5: {
    esnextModules: ['taro-x']
    ...
  }
}
```
- #### [按需加载使用方式](https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/HowToImportOnDemand.md)(推荐)
- #### 非按需加载
  **引入组件样式的三种方式**

  - **全局引入（JS中）：** 在入口文件中引入 `taro-x` 所有的样式
  ```js
  import 'taro-x/dist/style/index.scss' // 引入组件样式 - 方式一
  ```

  - **全局引入（CSS中）：** 在 `app.scss` 样式文件中 `import` 组件样式并按照文档说明使用
  ```scss
  @import "~taro-x/dist/style/index.scss"; // 引入组件样式 - 方式二
  ```

  - **按需引入：** 在页面样式或全局样式中 `import` 需要的组件样式
  ```scss
  @import "~taro-x/dist/style/components/button.scss"; // 引入所需的组件样式 - 方式三
  ```


## 👽[组件开发流程](https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/HowToCreateComponent.md)

## 👽[typescript申明文件开发流程与规范](https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/HowToCreateTsForYourComponent.md)

## 👽[H5组件单元测试](https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/HowToTestWithJest.md)

## 👽[组件发布流程](https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/HowToPublish.md)


## 👽组件文档
TODO: 规范组件写法，利用react-docgen或借鉴react-docgen自动生成组件文档规范

## 👽组件库的公共样式与内部工具

## 👽辅助工具
使用[classnames](https://www.npmjs.com/package/classnames)拼接className，比如：
```
    const rootClass = classNames(
      'at-modal',
      {
        'at-modal--active': _isOpened
      },
      this.props.className
    )


    <View className={rootClass}></View>
```

## 👽[组件开发流程调研](https://github.com/BUPTlhuanyu/taro-x/blob/develop/blog/ResearchForHowToAddAComponent.md)



