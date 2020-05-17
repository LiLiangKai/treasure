# Javascript 设计模式之观察者模式

> 定义：观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。

观察者模型可以说是在JavaScript中应用最多，使用频率最高的一种设计模式了。观察着模式可能听起来比较陌生，但它还有个更广为人知的别名——“发布-订阅模型”。“发布-订阅模式“这个名字很好的说明了观察者模式需要的两个核心角色——“发布者”和“订阅者“


## 示例

用一个简单的小例子说明一下观察者模式。

为了开发一个新需求，产品经理会把前后端开发、测试等相关人员拉到一个群里（钉钉？微信？）。由于需求未确定，产品经理只是告知相关技术人员需要做好开发新需求的准备。过了几天，产品经理确定好了所有需求，将需求文档发到群里并 `@所有人`。开发人员接受到信息，便开始投入到开发中去。在开发过程中，经常会有新的开发加入，或旧的开发离开。

以上便是一个典型的观察者模式。在产品经理创建一个群并拉入相关技术人员后，此时产品经理便充当着发布者对象，技术人员则是订阅者对象，

现在我们可以写一个发布者对象，发布者至少具备3种职能：
- 添加订阅者（新开发入群）
- 移除订阅者（旧开发退群）
- 通知订阅者（需求通知）

代码如下：

```js
/**  */
/** 发布者  */
class Publisher {
  constructor () {
    this.observers = []
    console.log('create publisher')
  }
  // 添加订阅者
  add ( observer ) { 
    if(!observer || typeof observer !== 'object') return
    if(this.observers.some(obs => obs === observer)) return
    console.log('add observer ', observer.name)
    this.observers.push(observer)
  }

  // 移除订阅者
  remove ( observer ) {
    if ( !observer || typeof observer !== 'object' ) return
    const idx = this.observers.findIndex(obs => obs === observer)
    if ( idx === -1 ) return
    console.log( 'remove observer ', observer.name )
    this.observers.splice(idx, 1)
  }

  // 通知订阅者
  notify () {
    console.log('notify all observer')
    this.observers.map(obs => {
      obs.update()
    })
  }
}
```

接着实现订阅者对象，订阅者一般作为被动的一方，职能相对简单——被通知，再执行。我们已经在发布者中做了方法的调用，那么在订阅者里则需要做方法的定义，代码如下：

```js
/** 订阅者对象 */
class Observer {
  constructor (name) {
    this.name = name
    console.log('create observer')
  }

  update () {
    console.log(`observer ${this.name} update`)
  }
}
```

以上就是一个简单的观察者模式的应用。

例子中的发布者和订阅者两者存在直接进行联系的关系——发布者必须维护订阅者的集合，同时订阅者必须提供统一的方法被发布者调用。

然而在生成开发中，相对于这种有直接关系的观察者模式，我们更多的应用场景是希望两个相互独立的对象能够进行联系，同时两个对象既能是发布者，也可以是订阅者，这种情况就是观察者模式的另一种应用——**事件通信**。

## 事件通信机制

我们在开发过程中常用到的浏览器事件监听方法 `addEventListener` 就是事件通信的应用。以下是使用 `addEventListener`的例子

```jsx
class Button {
  constructor() {
    this.button = document.createElement( 'button' )
    this.button.addEventListener( 'click', this.click )
  }

  destory = () => {
    this.button.removeEventListener( 'click', this.click )
    this.button = null
  }

  click = () => {
    console.log( 'button click' )
    this.destory()
  }
}
const button = new Button()
button.click()
```

t

`addEventListener`事件监听方法仅使用于浏览器，对于非浏览器，如果想要使用事件通信机制，可能需要借助第三方库或自己实现，根据事件通信的三个动作，我们完全可以实现一个简易版的事件通信机制。

### 实现一个事件通信

```js
class EvtMsg {
  evts

  constructor () {
    this.evts = {}
  }

  /**
   * 监听事件
   * @param {string} event 事件名
   * @param {Function} cb 事件回调
   */
  on ( event, cb ) {
    if ( !event || typeof cb !== 'function' ) return
    if ( !this.evts[ event ] ) {
      this.evts[ event ] = []
    }
    this.evts[ event ].push( cb )
  }

  /**
   * 触发事件
   * @param {string} event 事件名
   * @param  {...any} arg 回调参数
   */
  emit ( event, ...arg ) {
    if ( !event || !this.evts[ event ] ) return
    const cbs = this.evts[ event ]
    for ( let i = 0; i < cbs.length; i++ ) {
      const cb = cbs[ i ]
      cb.apply( this, arg )
    }
  }

  /**
   * 移除事件
   * @param {string} event 事件名
   * @param {Function} cb 事件回调
   */
  off ( event, cb ) {
    if ( !event || !this.evts[ event ] ) return
    const cbs = this.evts[ event ]
    const idx = cbs.findIndex( c => c === cb )
    cbs.splice( idx, 1 )
    return
  }
}
```

事件通信除了上述的三个方法外，我们在使用时，可能存在一些仅执行一次的事件；在销毁事件时，可能希望一次性移除所有监听事件。在上面代码的基础下，再新增两个基础的方法：

```js
class EvtMsg {
  evts
  
  ...

  /** 移除所有监听的事件 */
  removeAll () {
    this.evts = {}
  }

  /**
   * 监听一次性事件
   * @param {string} event 事件名
   * @param {Function} cb 事件回调
   */
  once ( event, cb ) {
    if ( !event || typeof cb !== 'function' ) return
    const wrapperCb = (...arg) => {
      cb.apply(this, arg)
      this.off(event, wrapperCb)
    }
    this.on(event, wrapperCb)
  }
}

```

使用

```js
class A {
  constructor () {
    evtMsg.on('feedback', this.feedback)
  }

  feedback () {
    console.log( 'A get feedback' )
  }

  notify () {
    evtMsg.emit('notify')
  }
}

class B {
  constructor () {
    evtMsg.on('notify', this.update)
  }

  update () {
    console.log( 'B receive notify' )
    evtMsg.emit('feedback')
  }
}

const a = new A()
const b = new B()
a.notify()
// B receive notify
// A get feedback
```

### 事件通信的生成实践

- Vue中使用到的`Event Bus` （事件总线）

- node中的`Event Emitter`

## 小结

使用观察者模式，主要解决模块间的耦合问题，使两个相互独立的模块也能实现数据通信，同时，观察者模式也可以用来辅助其他一些设计模式的实现。

但观察者模式也存在着缺点，创建订阅者本身是会消耗一定的时间和空间的，而且消息一经订阅，即便该消息从未发生，也是会一直存在于内存中。如果过度使用的话，对象和对象之间也就存在着必然的联系，反而使得对象间的耦合度加深。

