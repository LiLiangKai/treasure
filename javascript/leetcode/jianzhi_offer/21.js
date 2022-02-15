/*
定义栈的数据结构，请在该类型中实现一个能得到栈中最小元素的min函数，调用min、pop、push的时间复杂度为O(1)
*/

class Stack {
  dataStack = []
  minStack = []
  
  min () {
    return this.minStack[this.minStack.length-1]
  }

  push (value) {
    this.dataStack.push(value)
    const top = this.minStack[ this.minStack.length - 1 ]
    if(!top) this.minStack.push(value)
    else {
      this.minStack.push(top < value ? top : value)
    }
  }

  pop () {
    this.minStack.pop()
    return this.dataStack.pop()
  }
}

const stack = new Stack()
console.log( 'min: ', stack.min() )
stack.push( 3 )
console.log( 'min: ', stack.min() )
stack.push( 4 )
console.log( 'min: ', stack.min() )
stack.push( 2 )
console.log( 'min: ', stack.min() )
stack.pop()
console.log( 'min: ', stack.min() )
stack.push(1)
console.log( 'min: ', stack.min() )
stack.push( 0 )
console.log( 'min: ', stack.min() )
stack.pop()
console.log( 'min: ', stack.min() )