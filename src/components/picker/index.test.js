/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-30 09:39:34
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-30 11:45:32
 */
import Nerv, { findDOMNode } from 'nervjs'
import { renderToString } from 'nerv-server'
import { renderIntoDocument, Simulate } from 'nerv-test-utils'

import AtPicker from '../../../.temp/components/picker/index'

describe('Picker Snap', () => {
  it('AtPick Snap', () => {
    const component = renderToString(
      <AtPicker isOpened={true} fields='year'>
        请选择出生日期
      </AtPicker>
    )
    expect(component).toMatchSnapshot()
  })
})

describe('Picker DOM', () => {
  it('AtPick onCancel', () => {
    const onCancel = jest.fn()
    const component = renderIntoDocument(
      <AtPicker isOpened={true} fields='year' onCancel={onCancel}>
        请选择出生日期
      </AtPicker>
    )

    const componentDom = findDOMNode(component, 'at-picker')
    const clickTargetToClose = componentDom.querySelector('.at-picker__overlay')
    
    expect(component.state._isOpened).toBeTruthy()

    Simulate.click(clickTargetToClose)
  
    process.nextTick(() => {
      expect(onCancel).toHaveBeenCalledTimes(1)
      expect(component.state._isOpened).toBeFalsy()
    })
  })
})