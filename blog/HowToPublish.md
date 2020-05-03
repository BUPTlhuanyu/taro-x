#### 打包
```
npm run build:component
```
会生成一个dist文件夹
#### 发布到npm
发布流程：
###### 登陆npm
```
npm login
```
###### 更新后发布
```
npm version patch //+0.0.1
npm version minor //+0.1.0小版本更新
npm version major //+1.0.0大版本更新
```
初次发布直接`npm publish`