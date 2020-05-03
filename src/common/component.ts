/*
 * @Author: your name
 * @Date: 2019-12-24 17:48:45
 * @LastEditTime: 2020-02-28 15:09:29
 * @LastEditors: lhuanyu
 * @Description: In User Settings Edit
 * @FilePath: \taro-x\src\common\component.ts
 */
import Taro, { Component } from '@tarojs/taro'

const objectToString = style => {
  if (style && typeof style === 'object') {
    let styleStr = ''
    Object.keys(style).forEach(key => {
      // '-$1'表示在捕获的第一组元素之前加入'-'
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      styleStr += `${lowerCaseKey}:${style[key]};`
    })
    return styleStr
  } else if (style && typeof style === 'string') {
    return style
  }
  return ''
}

export default class AtComponent<P = {}, S ={}> extends Component<P , S> {
  static options = {
    addGlobalClass: true
  }

  /**
   * 合并 style
   * @param {Object|String} style1
   * @param {Object|String} style2
   * @returns {String}
   */
  mergeStyle (style1: object | string, style2: object | string): object | string {
    if ((style1 && typeof style1 === 'object')
      && (style2 && typeof style2 === 'object')
    ) {
      return Object.assign({}, style1, style2)
    }
    return objectToString(style1) + objectToString(style2)
  }
}
