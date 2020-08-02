> 2020/8/2 by Hiya

# 防抖和节流

## 防抖

防抖的目的在于防止事件多次触发，原理是在一定时间内若事件不再被触发则处理事件。

使用防抖的场景有很多，如：

1、防止用户多次点击表单提交按钮重复发起请求；

2、对一些频繁触发的事件，如浏览器窗口resize事件做一些限制，防止频繁计算，造成性能损耗

代码：

```js
function debounce ( fn, delay ) {
  let timer
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arg)
    }, delay)
  }
}
```

从代码中可看出防抖的核心重在清零重置 `clearTimeout(timer)`

## 节流

节流的目的在于控制事件发生频率，例如控制事件1s发生一次、10s发生一次等。

常见使用场景：

1、浏览器播放事件，每隔1s计算一次进度信息等；

2、scroll事件，每隔1s计算一次位置信息等；

代码:

```js
function throttle (fn, delay ) {
  let timer
  return (...arg) => {
    if(timer) return
    timer = setTimeout(() => {
      fn.apply(this, arg)
      timer = null
    }, delay)
  }
}
```

节流的核心是开关锁：`timer = null`

## 总结

**防抖** ：防止抖动，单位时间内时间触发会被重置，事件会在一段时间后处理。

**节流** ：控制流量，单位时间内事件只会触发一次，执行一次。