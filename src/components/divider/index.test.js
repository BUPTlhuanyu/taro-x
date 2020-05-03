/*
 * @Descripttion: 
 * @Author: lhuanyu
 * @Date: 2020-03-24 16:56:41
 * @LastEditors: lhuanyu
 * @LastEditTime: 2020-03-24 17:55:59
 */
import Nerv, { findDOMNode } from 'nervjs'
import { renderToString } from 'nerv-server'
import { Simulate, renderIntoDocument } from 'nerv-test-utils'

import AtDivider from '../../../.temp/components/divider/index'

describe('AtDivider Snap', () => {
  it('render AtDivider -- props content(分割线)', () => {
    const component = renderToString(<AtDivider content = '分割线' />)
    expect(component).toMatchSnapshot()
  })
})


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