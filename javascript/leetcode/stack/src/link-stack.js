/**
 * 链式栈
 * @author Hiya
 * @date 2020/9/12
 */

class LinkNode {
  constructor (elem) {
    this.elem = elem
    this.next =null
  }
} 

class LinkStack {
  stack
  length
  count

  /**
   * 链式栈构造函数
   * @param {number} length 栈的长度
   */
  constructor ( length ) {
    if ( typeof length !== 'number' || length <= 0 ) {
      throw `初始化栈失败，必须指定栈的长度，长度必须是有效的数值`
    }
    this.stack = new LinkNode('head')
    this.length = length
    this.count = 0
  }

  /** 元素入栈 */
  push ( elem ) {
    if(this.isFull()) return false
    const newNode = new LinkNode(elem)
    newNode.next = this.stack.next
    this.stack.next = newNode
    this.count ++
  }

  /** 元素出栈 */
  pop () {
    if(this.isEmpty()) return false
    const topNode = this.stack.next
    this.stack.next = topNode.next
    topNode.next = null
    this.count --
    return topNode.elem
  }

  /** 返回栈顶元素 */
  top () {
    const topNode = this.stack.next
    if(!topNode) return undefined
    return topNode.elem
  }

  /** 返回栈的长度 */
  size () {
    return this.length
  }

  /** 判断栈是否为空 */
  isEmpty () {
    if ( this.count === 0 ) return true
    return false
  }

  /** 判断栈是否满 */
  isFull () {
    if ( this.count === this.length ) return true
    return false
  }

  print () {
    if ( this.isEmpty() ) {
      return console.log( 'stack is empty.' )
    }
    const elems = []
    let c = 0
    let curNode = this.stack.next
    while(curNode && c < this.count) {
      elems.unshift(curNode.elem)
      curNode = curNode.next
      c++
    }
    console.log( 'stack: ', elems.join( ' => ' ) )
  }
}

const linkStack = new LinkStack(6)
console.log( 'stack length = ', linkStack.size() )
console.log( 'stack top element = ', linkStack.top())

linkStack.push( 1 )
linkStack.push( 2 )
linkStack.push( 3 )
linkStack.push( 4 )
linkStack.push( 5 )
linkStack.push( 6 )
linkStack.push( 7 )
linkStack.print()
console.log( 'stack top element = ', linkStack.top() )

linkStack.pop()
linkStack.pop()
linkStack.pop()
linkStack.print()
console.log( 'stack top element = ', linkStack.top() )

