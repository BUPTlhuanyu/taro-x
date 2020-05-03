
1. 在src/components下编写组件代码
2. 在src/style下编写组件库公共样式代码以及组件样式，并在components/index.scss文件中引入组件样式代码
3. 编写完成之后，需要在入口文件src/index.ts引入组件
4. 在pages中相关页面中添加组件使用示例，分别在`npm run dev:h5`/`npm run dev:weapp`进行简单的测试验证
5. 编写使用文档，md格式并存放在blog目录下 
6. 组件打包：`npm run build:component`,然后在dist目录查看结果
7. 组件发布
