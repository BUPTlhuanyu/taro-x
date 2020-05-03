import Nerv from 'nervjs'
import { renderToString } from 'nerv-server'

import AtAvatar from '../../../.temp/components/avatar/index'

// 快照测试：renderToString将传入的jsx组件return的结果转成string
// 组件在后期修改的时候，会与第一次不同，因此避免了不经意的对组件进行修改，其他用处未发现
// 如果组件样式结构修改了，需要更新快照，可参考 https://jestjs.io/docs/zh-Hans/snapshot-testing#updating-snapshots
// 注意： 单元测试的是.temp文件夹下的内容，需要先npm run dev构建一下，最终打包组件库的时候没有必要进行单元测试了
describe('Avatar Snap', () => {
  it('render Avatar -- props size(large) ', () => {
    const component = renderToString(<AtAvatar size='large' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props size(normal) ', () => {
    const component = renderToString(<AtAvatar size='normal' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props size(small) ', () => {
    const component = renderToString(<AtAvatar size='small' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props circle', () => {
    const component = renderToString(<AtAvatar circle />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props image', () => {
    const component = renderToString(<AtAvatar image='https://jdc.jd.com/img/100' />)
    expect(component).toMatchSnapshot()
  })

  it('render Avatar -- props text', () => {
    const component = renderToString(<AtAvatar text='凹凸实验室' />)
    expect(component).toMatchSnapshot()
  })
})
