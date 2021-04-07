let nextUnitOfWork = null

/**
 * 根据fiber节点创建dom元素
 * @param {*} fiber 
 * @returns 
 */
function createDom (fiber) {
  
}

/**
 * 渲染
 * @param {*} element 需要渲染的元素
 * @param {*} container 挂载的容器
 */
function render (element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  }
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
}

/**
 * 使用requestidcallback来进行循环。可以将requestIdleCallback看作一个setTimeout，但不会告诉它何时运行，浏览器将在主线程空闲时运行回调函数。
 * @param {*} workLoop 
 */
function requestIdleCallback (workLoop) {

}

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
  if(fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom)
  }

  // 2.遍历children，为每个child元素创建新的fiber节点
  const children = fiber.props.children
  let index = 0
  let prevSibling

  while(index < children.length) {
    const child = children[index]
    const newFiber = {
      dom: null,
      type: child.type,
      props: child.props,
      parent: fiber
    }

    if(index === 0) {
      // 首个child元素作为当前fiber节点的子节点
      fiber.child = newFiber
    } else {
      // 非首个child元素作为上个child元素的fiber节点的兄弟节点
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }

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