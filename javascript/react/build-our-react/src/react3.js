/**
 * 创建节点元素
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 * @returns 
 */
function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextElement(child)
      })
    }
  }
}

/**
 * 创建文本节点元素
 * @param {*} text 
 * @returns 
 */
function createTextElement (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

/**
 * 渲染
 * @param {*} element 需要渲染的元素
 * @param {*} container 挂载的容器
 */
function render (element, container) {
  const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)

  const isProperty = key => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach((child) => {
    render(child, dom)
  })

  container.appendChild(dom)
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