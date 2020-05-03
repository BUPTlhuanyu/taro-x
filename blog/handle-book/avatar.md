## 🍀使用
问题: 需要验证是否通过props传入的自定义样式设置的宽高无法被专程rem或者rpx了。

解决方案： 
> 在编译时，Taro 会帮你对样式做尺寸转换操作，但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API Taro.pxTransform 来做运行时的尺寸转换。

```
Taro.pxTransform(10) // 小程序：rpx，H5：rem
```
因此在使用的时候需要自行转换，如果直接写到组件里，会比较慢，因为需要遍历传入的customStyle，那些没有px的属性会导致一些无效的遍历，得不偿失。


#### 使用举例：
```
<AtAvatar 
    image='https://jdc.jd.com/img/200'
    circle
    text = 'text'
    //与react不同这里的className也可以是数组,数组的形式可以转换成多个类名组成的字符串形式
    // 但是由于calssnames这个库的限制，这里className只能添加类名
    // 这里添加类名如果要覆盖原来的样式，需要注意优先级，建议用下面的customStyle
    // 这里的customStyle不好用是因为taro不会将style上的px转换成rem，也不会在小程序中转换成rpx
    className = 'a b c' 
></AtAvatar>
<AtAvatar 
    image='https://jdc.jd.com/img/200'
    circle
    text = 'text'
    customStyle = {
      {
        width: `${Taro.pxTransform(200)}` ,
        height: `${Taro.pxTransform(200)}` 
      }
    }
></AtAvatar>      
```