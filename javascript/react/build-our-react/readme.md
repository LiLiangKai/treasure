# 一个极简的react

实现一个简单的react，名字定为`meact`

```js
const meact = {}
```

## createElement 方法

```jsx
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("app")
ReactDOM.render(element, container)
```

在以上React代码中，第一行代码本身不是标准的JavaScript代码，只是一种语法糖写法，方便开发者编写，通常需要借助babel工具转换成标准的JavaScript代码，通过babel转换后，会被替换为 `React.createElement`。

第一行代码最终会被替换成：

```js
const element = React.createElement(
  'h1',
  { title: 'foo' },
  'Hello'
)
```

`React.createElement`方法会生成一个`ReactElement`，即`element`的结果为：

```js
const elements = {
  type: 'h1',
  props: {
    title: 'foo',
    children: ['Hello']
  }
}
```

说明：
- `type` - 要创建的element的类型
- `props` - element的属性，`children` 默认是所有element都有的属性

目前只关注element的`type`和`props`

根据以上内容，实现 `meact.createElement` 方法

```js
function createElement = function (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

meact.createElement = createElement
```

使用 `meact.createElement('div')`

输出
```js
{
  type: 'div',
  props: {
    children: []
  }
}
```

由于children可能是字符串或数字等一些简单文本内容，需要针对这些文字children做一些处理，将文本也当做一个element。

```js
function createTextElement (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text
    }
  }
}

function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children ? children.map(child => {
        return typeof child === 'object' ? child : createTextElement(child)
      }) : []
    }
  }
}
```

## render 方法

如果想把React应用渲染到浏览器上，通常是使用 `ReactDom.render` 方法，本节内容将会实现一个 `meact.render` 方法，用于将通过`meact.createElement` 方法创建的element渲染到浏览器上。

```js
function render (element, container) {
  // 根据type创建对应的DOM元素节点
  const dom = element.type === TEXT_ELEMENT 
    ? document.createTextNode('') 
    : document.createElement(element.type)

  // 处理属性
  const isProperty = key => ['children'].indexOf(key) === -1
  for(const prop in element.props) {
    if(!isProperty(prop)) continue
    dom[prop] = element.props[prop]
  }

  // 递归处理children
  element.props.children?.map(child => {
    render(child, dom)
  })

  container.appendChild(dom) // 添加到要挂载的节点中
}

meact.render = render
```

## Concurrent Mode 和 Fiber

在以上的 `meact.render` 方法中，有很大的缺陷，就是使用递归，递归一旦开始便无法停止。如果创建的`element`过大，可能导致主线程一直被占用，造成页面卡顿甚至崩溃。

因此需要一种机制，允许可中断的渲染，在React中叫`Concurrent Mode`，将整个渲染分解成一个个独立的工作单元，当一个工作单元执行完毕就进入下一个工作单元，直到没有需要执行的工作单元。整个render过程由递归变为循环。

```js
let nextUnitOfWork = null
function workLoop (deadline) {
  let shouldYield = false // 中断标志
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

// 执行工作单元，并返回下一个工作单元
function performUnitOfWork () {}
```

在React中是使用`Schedule`进行任务调度，这里使用`requestIdleCallback` 进行循环调度。

为了实现上述功能，需要一种数据结构，用于描述每个工作单元，这里把这种数据结称为 `Fiber`。

定义 `Fiber` 的数据结构

```ts
interface Fiber {
  /** fiber对应的真实DOM节点 */
  dom?: HTMLElement
  /** fiber的属性，与element的属性对应 */
  props?: any
  /** 第一个子fiber */
  child?: Fiber
  /** 相邻fiber */
  sibling?: Fiber
  /** 父fiber */
  parent?: Fiber
}
```

在`workLoop`函数中，工作单元的执行是有函数`performUnitOfWork`负责，该函数主要负责以下三件事：

1. 将创建的element添加到DOM节点中
2. 创建当前fiber的子级fiber
3. 选择下一个工作单元

下一个工作单元的选择遵循如下规则：

- 如果当前工作单元有子级fiber，即child存在，则返回child
- 如果当前工作单元有相邻兄弟fiber，即sibling存在，则返回sibling
- 如果child和sibling都不存在，从父级的相邻兄弟fiber中查找，直到返回顶部

首先将上面实现的render方法中的生成DOM元素的代码提取出来：

```js
function createDom (fiber) {
   // 根据type创建对应的DOM元素节点
  const dom = fiber.type === TEXT_ELEMENT 
    ? document.createTextNode('') 
    : document.createElement(fiber.type)

  // 处理属性
  const isProperty = key => ['children'].indexOf(key) === -1
  for(const prop in fiber.props) {
    if(!isProperty(prop)) continue
    dom[prop] = fiber.props[prop]
  }
  return dom
}
```

修改render方法

```js
let nextUnitOfWork = null
let rootFiber = null
function render ( element, container ) {
  rootFiber = {
    dom: container,
    props: {
      children: [ element ]
    }
  }
  nextUnitOfWork = rootFiber
}
```

这里定义了两个变量：  

- `rootFiber` - 调用render时，会生成一个特殊的fiber，即`root fiber`，表示整个应用的根。
- `nextUnitOfWork` - 记录要执行的工作单元。

现在开始实现`performUnitOfWork` 方法

```js
function performUnitOfWork (unitOfWork) {
  // 将element添加到DOM中
  if(!unitOfWork.dom) {
    unitOfWork.dom = createDom(unitOfWork)
  }
  
  if(unitOfWork.parent) {
    unitOfWork.parent.dom.appendChild(unitOfWork.dom)
  }

  // 创建element的children的fiber节点
  const children = unitOfWork.props.children
  let index = 0
  let prevSibling = null

  while(index < children.length) {
    const child = children[index]
    const childFiber = {
      ...child,
      parent: unitOfWork,
      dom: null
    }
    if(index === 0) {
      // 记录第一个子fiber
      unitOfWork.child = childFiber
    } else {
      // 链接兄弟fiber
      prevSibling.sibling = childFiber
    }
    prevSibling = childFiber
    index++
  }

  // 返回下一个工作单元
  // 如果有子fiber，返回子fiber
  if(unitOfWork.child) return unitOfWork.child
  let nextFiber = unitOfWork
  while(nextFiber) {
    // 如果有兄弟fiber，返回兄弟fiber
    if ( nextFiber.sibling ) return nextFiber.sibling
    // 查找父级的兄弟fiber
    nextFiber = nextFiber.parent

    // 回到rootFiber
    if(nextFiber === rootFiber) return null
  }
  return nextFiber
}
```

以上变完成了`meact`的render功能，每次render，都将从 `root fiber` 出发，一直向下执行，最终再回到 `root fiber`

## render 和 commit 阶段

上面实现的`performUnitOfWork` 方法存在一个问题，在每次执行时都会把生成的DOM元素渲染到页面上，如果渲染中断，就会导致页面显示不完整。

将真实的DOM元素渲染到页面上这一步，应该是在整个`Fiber` 树都处理完毕后，这一步工作称为`commit`。

完善以上代码：

```js
function workLoop (deadline) {
  ...
  while(nextUnitOfWork && !shouldYield) {
    ...
  }
  // 已经没有下一个工作单元，root fiber存在，表示处理完毕，可以提交fiber tree到DOM上
  if(!nextUnitOfWork && rootFiber) {
    commitRoot()
  }
  ...
}

function commitRoot () {
  commitWork(rootFiber)
  rootFiber = null
}

function commitWork (fiber) {
  if(!fiber) return
  commitWork(fiber.child)
  fiber.parent.dom.appendChild(fiber.dom)
  commitWork(fiber.sibling)
}
```

最后还要移除 `performUnitOfWork` 方法中以下代码：

```js
if(unitOfWork.parent) {
  unitOfWork.parent.dom.appendChild(unitOfWork.dom)
}
```

## Reconciliation

到目前为止，只完成了DOM元素的添加，接下来要实现DOM元素的更新和删除。

为了实现DOM元素的更新和删除，需要将本次要更新的element和上次更新到DOM上对应的fiber做比较（不可能每次到从头到为都构建新的DOM树），为了方便做比较，需要记录上次提交到DOM的`fiber tree`，称为 `currentFiber`。

同时每个`fiber`节点都新增`alternate`属性，用于记录上次更新对应的`fiber`节点

```js
let nextUnitOfWork = null
let rootFiber = null
let currentFiber = null
function render ( element, container ) {
  rootFiber = {
    dom: container,
    props: {
      children: [ element ]
    },
    alternate: currentFiber
  }
  nextUnitOfWork = rootFiber
}

function commitRoot () {
  commitWork(rootFiber)
  currentFiber = rootFiber
  rootFiber = null
}
```

接下来修改 `performUnitOfWork` 方法，将其中关于“创建element的children的fiber节点”的内容提取出来，用新的方法 `reconcileChildren` 代替

```js
function performUnitOfWork (unitOfWork) {
  // 将element添加到DOM中
  ...

  // 创建element的children的fiber节点
  const children = unitOfWork.props.children
  reconcileChildren(unitOfWork, children)

  // 返回下一个工作单元
  ...
} 

function reconcileChildren (fiber, chilren) {}
```

`reconcileChildren` 方法的职责：

- 比较本次要更新的`element`与上次更新对应的`oldFiber` 节点的`type` 值是否一样（在React中是用`key`）
 1. 如果`oldFiber`与新的`element` 具有相同的`type`值，则复用 `oldFiber` 的DOM节点，更新相应的`props`，标记为 `UPDATE`;
 2. 如果`type` 不同，表示新的`element` 需要生成新的`fiber`节点，标记为 `PLACEMENT`;
 3. 如果`type` 不同且 `oldFiber` 存在，表示 `oldFiber` 需要被删除，标记为 `DETETION`。

```js
let detetions = null
const PLACEMENT = 0
const UPDATE = 1
const DETETION = 3
function reconcileChildren ( fiber, children ) {
  let index = 0
  let oldFiber = fiber.alternate?.child
  let prevSibling = null

  while(index < children?.length || oldFiber) {
    const element = children[index]
    let newFiber = null

    // 旧fiber节点与新的element比较
    const isSame = element && oldFiber && element.type === oldFiber.type

    // 更新
    if(isSame) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: fiber,
        alternate: oldFiber,
        effectTag: UPDATE
      }
    } 

    // 新增
    if(element && !isSame) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: fiber,
        alternate: null,
        effectTag: PLACEMENT
      }
    }

    // 删除
    if(oldFiber && !isSame) {
      oldFiber.effectTag = DETETION
      deletions.push(oldFiber)
    }

    if(oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if(index === 0) {
      fiber.child = newFiber
    } else if(element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}
```

修改`render` 方法和`commitRoot` 方法。在`render` 方法中需要初始化变量 `detetions`，在`commitRoot` 方法中，需要额外处理 `detetions` 中记录的需要被删除的`fibers`

```js
function render ( element, container ) {
  ...
  // 其他代码不变，新增以下以后代码
  deletions = []
}

function commitRoot () {
  deletions && deletions.map(commitWork) // 删除要被删除的旧fiber节点
  commitWork(rootFiber)
  currentFiber = rootFiber
  rootFiber = null
  deletions = null
}
```

修改`commitWork` 方法，需要根据`fiber` 上的`effectTag` 分别做不同处理。

```js
function commitWork (fiber) {
  if(!fiber) return
  const parentDom = fiber.parent?.dom

  // 删除
  if(fiber.effectTag === DETETION) {
    parentDom && parentDom.removeChildren(fiber.dom)
    return
  }

  commitWork(fiber.child)

  if(fiber.effectTag === PLACEMENT && fiber.dom) { // 新增
    parentDom && parentDom.appendChild(fiber.dom) 
  } else if(fiber.effectTag === UPDATE && fiber.dom) { // 更新
    updateDom(
      fiber.dom,
      fiber.alternate.props,
      fiber.props
    )
  }

  commitWork(fiber.sibling)
}
```

- `DETETION` 标记的`fiber`，将其对应的DOM节点从它的父级DOM节点中移除
- `PLACEMENT` 标记的`fiber`，将其对应的DOM节点添加到它的父级DOM节点中
- `UPDATE` 标记的`fiber`，使用`updateDom` 方法做处理

`updateDom` 方法:

```js
const isEvent = key => /^on/.test(key)
const isProperty = key => [ 'children' ].indexOf( key ) === -1 && !isEvent(key)
const isGone = (prev, next) => key => !(key in next)
const isNew = (prev, next) => key => next[key] !== prev[key]

/** 更新DOM节点 */
function updateDom (dom, prevProps, nextProps) {
  if(prevProps) {
    // 移除旧事件监听
    Object.keys(prevProps)
      .filter(isEvent)
      .filter(prop => !(prop in (nextProps||{})) || isNew(prevProps, nextProps||{})(prop))
      .map(prop => {
        const eventType = props.toLowerCase().substring( 2 )
        dom.removeEventListener( eventType, prevProps[ prop ] )
      })

    // 重置无效的就属性
    Object.keys(prevProps)
      .filter(isProperty)
      .filter(isGone(prevProps, nextProps || {}))
      .map(prop => {
        dom[prop] = ''
      })
  }

  if(nextProps) {
    // 设置新的属性
    Object.keys(nextProps)
      .filter(isProperty)
      .filter(isNew(prevProps || {}, nextProps))
      .map(prop => {
        dom[prop] = nextProps[prop]
      })
     // 绑定新事件监听
     Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps || {}, nextProps))
      .map(prop => {
        const eventType = props.toLowerCase().substring( 2 )
        dom.addEventListener(eventType, nextProps[prop])
      })
  }
}
```

针对`fiber` 的`props` 中一些特别属性，假设以`on`开头的属性，将这些属性当做事件，因此在处理这些属性时，使用 `addEventListener` 和`removeEventListener` 做事件的监听和移除。

完成了 `updateDom` 方法，最后还需要修改 `createDom` 方法，将`createDom` 方法中关于设置属性的代码替换成 `updateDom` 方法

```js
/** 创建DOM节点 */
function createDom (fiber) {
   // 根据type创建对应的DOM元素节点
  const dom = fiber.type === TEXT_ELEMENT 
    ? document.createTextNode('') 
    : document.createElement(fiber.type)

  // 处理属性
  updateDom(dom, null, fiber.props)

  return dom
}
```

## Function Component


## Hooks



## 完整代码