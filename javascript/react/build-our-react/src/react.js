const TEXT_ELEMENT = 'TEXT_ELEMENT'
const PLACEMENT = 0
const UPDATE = 1
const DETETION = 3

let nextUnitOfWork = null
let rootFiber = null
let currentFiber = null
let deletions = null

let wipFiber = null
let hookIndex = null

function createTextElement (text) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: text,
      children: []
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

const isEvent = key => /^on/.test(key)
const isProperty = key => [ 'children' ].indexOf( key ) === -1 && !isEvent(key)
const isGone = (prev, next) => key => !(key in next)
const isNew = (prev, next) => key => next[key] !== prev[key]

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

/** 更新DOM节点 */
function updateDom (dom, prevProps, nextProps) {
  if(prevProps) {
    // 移除旧事件监听
    Object.keys(prevProps)
      .filter(isEvent)
      .filter(prop => !(prop in (nextProps||{})) || isNew(prevProps, nextProps||{})(prop))
      .map(prop => {
        const eventType = prop.toLowerCase().substring( 2 )
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
        const eventType = prop.toLowerCase().substring( 2 )
        dom.addEventListener(eventType, nextProps[prop])
      })
  }
}

/** 更新原生组件 */
function updateHostComponent (fiber) {
  // 将element添加到DOM中
  if ( !fiber.dom ) {
    fiber.dom = createDom( fiber )
  }

  // 创建element的children的fiber节点
  const children = fiber.props.children
  reconcileChildren( fiber, children )
}

/** 更新函数式组件 */
function updateFunctionComponent (fiber) {
  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

function useState (initial) {
  const oldHook = wipFiber?.alternate?.hooks && wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }

  const actions = oldHook?.queue || []
  actions.forEach(action => {
    hook.state = typeof action === 'function' ? action(hook.state) : action
  })

  const setState = action => {
    hook.queue.push(action)
    // setState的工作类似render方法
    // 开始构建work in process tree
    rootFiber = {
      dom: currentFiber.dom,
      props: currentFiber.props,
      alternate: currentFiber
    }
    nextUnitOfWork = rootFiber
    deletions = []
  }

  wipFiber.hooks.push(hook)
  hookIndex ++
  return [ hook.state, setState]
}

/** 查找父级为真实DOM节点的parent fiber */
function findParentDom (fiber) {
  let parentFiber = fiber.parent
  while ( parentFiber && !parentFiber.dom) {
    parentFiber = parentFiber.parent
  }
  return parentFiber
}

function render ( element, container ) {
  rootFiber = {
    dom: container,
    props: {
      children: [ element ]
    },
    alternate: currentFiber
  }
  nextUnitOfWork = rootFiber
  deletions = []
}

function workLoop (deadline) {
  let shouldYield = false
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }
  if(!nextUnitOfWork && rootFiber) {
    commitRoot()
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function performUnitOfWork (unitOfWork) {
  const isFunction = unitOfWork.type instanceof Function
  if(isFunction) {
    updateFunctionComponent(unitOfWork)
  } else {
    updateHostComponent(unitOfWork)
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
  }

  // 回到rootFiber
  if ( nextFiber === rootFiber ) return null

  return nextFiber
}


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

function commitRoot () {
  deletions && deletions.map(commitWork) // 删除要被删除的旧fiber节点
  commitWork(rootFiber)
  currentFiber = rootFiber
  rootFiber = null
  deletions = null
  console.log( currentFiber)
}

function commitWork (fiber) {
  if(!fiber) return
  const parentDom = findParentDom(fiber)?.dom

  // 删除
  if(fiber.effectTag === DETETION) {
    parentDom && commitDetetion(fiber, parentDom)
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

function commitDetetion (fiber, parentDom) {
  if(fiber.dom) {
    parentDom.removeChildren( fiber.dom )
  } else {
    commitDetetion(fiber.child, parentDom)
  }
}

const meact = {
  createElement,
  render,
  useState
}