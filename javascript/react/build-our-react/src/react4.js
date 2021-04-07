let nextUnitOfWork = null
let wipRoot = null
let currentRoot = null
let deletions = null

function createElement ( type, props, ...children ) {
  return {
    type,
    props: {
      ...props,
      children: children.map( child =>
        typeof child === "object"
          ? child
          : createTextElement( child )
      ),
    },
  }
}

function createTextElement ( text ) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

/**
 * 根据fiber节点创建dom元素
 * @param {*} fiber 
 * @returns 
 */
function createDom (fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode( "" )
      : document.createElement( fiber.type )

  updateDom( dom, {}, fiber.props )

  return dom
}

const isEvent = key => key.startsWith( "on" )
const isProperty = key =>
  key !== "children" && !isEvent( key )
const isNew = ( prev, next ) => key =>
  prev[ key ] !== next[ key ]
const isGone = ( prev, next ) => key => !( key in next )

/**
 * 更新DOM节点
 * @param {*} dom 
 * @param {*} oldFiberProps 
 * @param {*} fiberProps 
 */
function updateDom ( dom, prevProps, nextProps ) {
  //Remove old or changed event listeners
  Object.keys( prevProps )
    .filter( isEvent )
    .filter(
      key =>
        !( key in nextProps ) ||
        isNew( prevProps, nextProps )( key )
    )
    .forEach( name => {
      const eventType = name
        .toLowerCase()
        .substring( 2 )
      dom.removeEventListener(
        eventType,
        prevProps[ name ]
      )
    } )
  // Remove old properties
  Object.keys( prevProps )
    .filter( isProperty )
    .filter( isGone( prevProps, nextProps ) )
    .forEach( name => {
      dom[ name ] = ""
    } )

  // Set new or changed properties
  Object.keys( nextProps )
    .filter( isProperty )
    .filter( isNew( prevProps, nextProps ) )
    .forEach( name => {
      dom[ name ] = nextProps[ name ]
    } )

  // Add event listeners
  Object.keys( nextProps )
    .filter( isEvent )
    .filter( isNew( prevProps, nextProps ) )
    .forEach( name => {
      const eventType = name
        .toLowerCase()
        .substring( 2 )
      dom.addEventListener(
        eventType,
        nextProps[ name ]
      )
    } )
}

/**
 * 渲染
 * @param {*} element 需要渲染的元素
 * @param {*} container 挂载的容器
 */
function render (element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  }
  nextUnitOfWork = wipRoot
  deletions = []
}


/**
 * 任务循环
 * 将任务分解成小单元，在完成每个单元后，如果还有其他需要做的事情，会让浏览器中断渲染。
 * @param {*} deadline 
 */
function workLoop (deadline) {
  let shouldYield = false
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }

  if(!nextUnitOfWork && wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}

/**
 * 使用requestidcallback来进行循环。可以将requestIdleCallback看作一个setTimeout，但不会告诉它何时运行，浏览器将在主线程空闲时运行回调函数。
 */
requestIdleCallback(workLoop)

/**
 * 执行任务，而且返回下一个任务单元
 * TODO add dom node
 * TODO create new fibers
 * TODO return next unit of work
 * @param {*} fiber
 */
function performUnitOfWork(fiber) {
  if(!fiber) return null
  // 1.创建一个新节点并将其添加到DOM
  if(!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  reconcileChildren(fiber)

  // 3.寻找下一个工作单元，首先是当前fiber节点的子节点，然后是兄弟节点，接着是父节点的兄弟节点，直到访问到根fiber节点结束
  if(fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber
  while(nextFiber) {
    if(nextFiber.sibling) return nextFiber.sibling
    nextFiber = nextFiber.parent
  }
  return nextFiber
}

function reconcileChildren (wipFiber) {
  if(!wipFiber || !wipFiber.props) return
  // 2.遍历children，为每个child元素创建新的fiber节点
  const children = wipFiber.props.children || []
  let index = 0
  let prevSibling
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child

  while ( index < children.length || oldFiber !== null) {
    const child = children[ index ]
    let newFiber = null

    // 将旧fiber与当前节点比较
    const sameType = child && oldFiber && child.type === oldFiber.type

    if(sameType) {
      // 旧fiber与当前节点类型相当，保留DOM，使用新的props更新
      newFiber = {
        type: oldFiber.type,
        props: child.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectType: 'UPDATE'
      }
    } 
    if(child && !sameType) {
      // 类型不同，当前节点是新节点，需要创建心得DOM节点
      newFiber = {
        type: child.type,
        props: child.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectType: 'PLACEMENT'
      }
    }
    if(oldFiber && !sameType) {
      // 类型不同呢，旧fiber存在，移除旧节点
      oldFiber.effectType = 'DELETE'
      deletions.push(oldFiber)
    }

    if ( index === 0 ) {
      // 首个child元素作为当前fiber节点的子节点
      wipFiber.child = newFiber
    } else {
      // 非首个child元素作为上个child元素的fiber节点的兄弟节点
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}

/**
 * 提交阶段
 * 当没有下一个工作单元时，表示当前所有工作已完成
 * 此时提交整个fiber树，用于生成真实DOM树
 */
function commitRoot () {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function commitWork (fiber) {
  if(!fiber) return
  const domParent = fiber.parent.dom

  if ( fiber.effectType === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  } else if(fiber.effectType === 'DELETE') {
    domParent.removeChild(fiber.dom)
  } else if(fiber.effectType === 'UPDATE' && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }

  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

const Didact = {
  createElement,
  render
}

const element = Didact.createElement(
  'div',
  { title: 'hello' },
  Didact.createElement( 'a', null, 'link' ),
  'text'
)

render(element, document.getElementById('app'))