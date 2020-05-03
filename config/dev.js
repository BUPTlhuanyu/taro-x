/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {
    mode: "development",
    postcss: {
      // 小程序端样式引用本地资源内联
      url: {
        enable: true,
        limit: 102400000000
      }
    }
  },
  h5: {
    // devServer添加导致无法手机调试，package.json需要添加配置，待完成...
    // devServer: {
    //   host: '127.0.0.1',
    //   disableHostCheck: true,
    //   port: 10086
    // }
  }
}
