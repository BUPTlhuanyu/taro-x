/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-24 09:19:27
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-24 16:55:03
 */
/* eslint-disable import/no-commonjs */
const apis = require('@tarojs/taro-h5/dist/taroApis')

// 插件在 Presets 前运行。
// 插件顺序从前往后排列。
// Preset 顺序是颠倒的（从后往前）。

module.exports = {
  presets: [
    // 从下往上，preset中的插件执行顺序按照插件顺序从前往后执行
    [
      '@babel/env',
      {
        spec: true,
        useBuiltIns: false
      }
    ]
  ],
  plugins: [
    // 从上往下
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'Nerv.createElement'
      }
    ],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['babel-plugin-transform-taroapi', {
      apis,
      packageName: '@tarojs/taro-h5'
    }]
  ]
}

