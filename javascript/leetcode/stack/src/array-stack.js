/**
 * 顺序栈
 * 栈是一种先进后出的数据结构
 * @author Hiya
 * @date 2020/9/12
 */

class ArrayStack {
  stack
  length
  count

  /**
   * 顺序栈构造函数
   * @param {number} length 栈的长度
   */
  constructor (length) {
    if(typeof length !== 'number' || length <= 0) {
      throw `初始化栈失败，必须指定栈的长度，长度必须是有效的数值`
    }
    this.stack = new Array(length)
    this.length = length
    this.count = 0
  }

  /** 元素入栈 */
  push (elem) {
    if(this.isFull()) return false
    this.stack[this.count] = elem
    this.count ++
    return true
  }

  /** 元素出栈 */
  pop () {
    if(this.isEmpty()) return
    const elem = this.stack[this.count]
    this.count --
    this.stack[this.count] = undefined
    return elem
  }

  /** 返回栈顶元素 */
  top () {
    return this.stack[this.count-1]
  }

  /** 返回栈的长度 */
  size () {
    return this.length
  }

  /** 判断栈是否为空 */
  isEmpty () {
    if(this.count === 0) return true
    return false
  }

  /** 判断栈是否满 */
  isFull () {
    if(this.count === this.length) return true
    return false
  }

  print () {
    if(this.isEmpty()) {
      return console.log('stack is empty.')
    }
    const elems = []
    for(let i=0; i<this.count; i++) {
      elems.push(this.stack[i])
    }
    console.log('stack: ', elems.join(' => '))
  }
}

const arrayStack = new ArrayStack(6)
console.log('stack length = ', arrayStack.size())
arrayStack.push( 1 )
arrayStack.push( 2 )
arrayStack.push( 3 )
arrayStack.push( 4 )
arrayStack.push( 5 )
arrayStack.push( 6 )
arrayStack.push( 7 )
arrayStack.print()
console.log('stack top elem = ', arrayStack.top())

arrayStack.pop()
arrayStack.pop()
arrayStack.print()
console.log('stack top elem = ', arrayStack.top() )
