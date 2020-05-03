## 使用方法
#### JSX
```
<AtList hasBorder={false} className='content'>
    <AtListItem
        className = 'without-margin-top'
        hasBorder={false}
        title='基础组件'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        onClick={this.handleClick.bind(this, 0)}
        hasBorder={false}        
        title='视图组件'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        hasBorder={false}
        title='基础组件'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        onClick={this.handleClick.bind(this, 1)}
        hasBorder={false}
        title='操作反馈'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        hasBorder={false}
        title='表单组件'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        hasBorder={false}
        title='布局组件'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        hasBorder={false}
        title='导航组件'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
    <AtListItem
        hasBorder={false}
        title='业务组件'
        note='描述信息'
        arrow='right'
        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    />
</AtList>
```
#### scss
```
    .content{
        background-color: rgba(245,248,252,0);
        position: absolute;
        top: 173px;
        left: 32px;
        padding-bottom: 100px;
        // 覆盖原有的title
        .item-content__info-title{
            font-family: PingFangSC-Medium;
            font-size: 32px;
            color: #2E2D2D;
            letter-spacing: 0;   
            font-weight: bolder;          
        }
        // 覆盖原有的note
        .item-content__info-note{
            font-family: PingFangSC-Regular;
            font-size: 26px;
            color: #848484;
            letter-spacing: 0;
        }
        // 为每一个item都加上一些公共的属性
        .at-list__item{
            width: 686px;
            height: 180px;
            background: #FFFFFF;
            box-shadow: 0 8px 20px 0 rgba(0,34,89,0.06);
            border-radius: 6px;
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
        }
        // 为每一个item都加上一些公共的属性之后，由于第一个item不需要margin-top
        // 但是小程序不支持伪类，因此给第一个item加上一个class是为了增加他的优先级
        // 然后将第一个item的at-list__item类的样式覆盖掉。
        .without-margin-top.at-list__item{
            margin-top: 0,
        }
        // 覆盖图片容器的宽高 
        .at-list__item-thumb{
            width: 102px;
            height: 102px 
        }
    }
```
## 使用总结
出于css文件缓存以及html文件体积对首屏渲染的性能问题，应该尽量减少组件使用内联样式，因此组件中也不会频繁的暴露出customStyle作为组件的props，这样也减少了组件props的数量，简化了props的数据结构，因此使用起来更加简单。

在覆盖样式的时候，为了确保优先级高于组件原本的样式，需要在组件上根元素添加一个新的className，然后在这className上添加目标子组件的样式，进行覆盖。
比如，需要覆盖AtList组件下中间文本的title样式，应该在AtList上添加一个类名content，然后再覆盖title样式类名.item-content__info-title，这样覆盖的原因是，后加载的样式覆盖先加载的全局样式。
```
.content{
    // 覆盖原有的title
    .item-content__info-title{
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E2D2D;
        letter-spacing: 0;   
        font-weight: bolder;          
    }    
}
```
再覆盖的时候需要注意优先级。

## 原理