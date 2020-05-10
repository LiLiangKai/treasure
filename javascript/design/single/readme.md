# Javascript 设计模式之单例模式

> 定义：保证一个类仅有一个实例，并提供一个全局访问它的全局访问点。

在JavaScript中，我们可以把全局变量近似的当成一个单例（严格来说全局变量并不是单例），例如：浏览器下的window对象、node下的global对象。

## 实现一个单例模式

```js
class SingleDog {
  static instance = null

  constructor () {
    this.name = 'singe dog'
    this.hasGirlFriend = false
  }

  static getInstance () {
    if ( !SingleDog.instance ) {
      SingleDog.instance = new SingleDog()
    }
    return SingleDog.instance
  }
}

const a = SingleDog.getInstance()
const b = SingleDog.getInstance() 
console.log(a === b) // true
```

以上例子就完成一个单例模式的编写，但存在一些不足之处，使用者必须知道这是一个单例，并且要通过 `getInstance` 方法获取实例。

改进：

```js
const SingleDog = (function() {
  let instance = null
   
  return function SingleDog () {
    if(instance) return instance
    this.name = 'singe dog'
    this.hasGirlFriend = false
    instance = this
  }
})()

const a = new SingleDog()
const b = new SingleDog()
console.log(a === b) // true
```

## 适用场景

单例模式只允许创建一个实例对象，因此可以节省内存，加快对象访问速度，单例模式适用于以下场景：

- 需要频繁创建实例然后销毁的的对象；
- 创建对象时耗时过多或者耗资源过多，但又经常用到的对象；
- 有状态的工具类对象; 
- 频繁访问数据库或文件的对象。

由于单例模式是全局可访问，因此不适用于需要对单例进行修改的场景，因为对单例的修改可能会导致其他适用单例的地方出现错误，即单例模式应该是可读但不可写的。

## 小结

单例模式是所有设计模式中相对最为简单的一种设计模式。使用单例模式时，应根据适用场景去选择适用。
