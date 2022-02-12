/*
用两个栈实现一个队列。队列的声明如下，请实现他的两个函数appendTail和deleteHead，分别完成在队列尾部插入节点和队列头部删除节点的功能
*/

class Queue {
  stack1 = []
  stack2 = []

  appendTail (value) {
    this.stack1.push(value)
  }

  deleteHead () {
    if(!this.stack2.length) {
      while(this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    } 
    if(!this.stack2.length) return null
    return this.stack2.pop()
  }
}

class Stack {
  queue1 = []
  queue2 = []

  push (value) {
    if(this.queue2.length) {
      this.queue1.push(this.queue2.shift())
    }
    this.queue1.push(value)
  }

  pop() {
    if(!this.queue2.length && !this.queue1.length) return null
    if(this.queue1.length) {
      while(this.queue1.length > 1) {
        this.queue2.push(this.queue1.shift())
      }
      return this.queue1.shift()
    }
    if(this.queue2.length) {
      while(this.queue2.length > 1) {
        this.queue1.push(this.queue2.shift())
      }
      return this.queue2.shift()
    }
  }
}

const queue = new Queue()
const stack = new Stack()
queue.appendTail( 1 )
queue.appendTail( 2 )
queue.appendTail( 3 )
stack.push(queue.deleteHead())
queue.appendTail( 4 )
stack.push( queue.deleteHead() )
stack.push( queue.deleteHead() )
stack.push( queue.deleteHead() )
console.log( queue.deleteHead() )
console.log( queue.deleteHead() )

console.log( stack.pop() )
console.log( stack.pop() )
console.log( stack.pop() )
console.log( stack.pop() )