
https://www.tslang.cn/docs/handbook/declaration-files/publishing.html

## 采取的方式：包含声明文件到你的npm包

#### 编写申明文件
在src文件夹同级创建types文件夹，并增加单个组件申明文件avatar.d.ts以及入口文件index.d.ts，文件结构如下：

```
|--- src
|--- types
        |--- index.d.ts
        |--- avatar.d.ts
```
> index.d.ts文件

```
export { default as AtAvatar } from './avatar'
```

> avatar.d.ts文件

```
...
export interface AtAvatarProps extends AtComponent{
    ...
}
export interface AtAvatarState {
  isWEAPP: boolean
}

declare const AtAvatar: ComponentClass<AtAvatarProps>

export default AtAvatar
```
需要注意的是，这里的export是为了组件库组件类型引用以及给index.d.ts导出。这里的declare是不能缺少的。

#### 配置组件库的package.json文件：为了让ts找到组件库申明文件

添加如下内容：

```
"types": "./types/index.d.ts"
```
由于在publish到npm上的时候，package.json文件会和组件包一起存在，ts在检查类型的时候，会根据包的这个文件的types字段来找到申明文件入口index.d.ts，从而ts才会起作用。

#### 配置package.json进行发布
在发布的时候还需要在package.json中添加如下字段：

```
  "files": [
    ...
    "types"
  ]
```
这样npm才会把types发布出去。组件库打包的时候不会处理types，只有npm发布的时候会处理这个types。


