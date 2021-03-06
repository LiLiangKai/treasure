/**
 * 顺序队列
 * @author Hiya
 * @create 2020/9/16
 */

class ArrayQueue {
  queue
  head
  tail
  length

  constructor (length) {
    if(typeof length !== 'number' || length <= 0) {
      throw '初始化队列失败，必须指定队列的长度，长度必须是有效的数值'
    }
    this.queue = new Array(length)
    this.head = 0
    this.tail = 0
    this.length = length
  }

  /** 判断队空 */
  isEmpty () {
    if(this.tail === this.head) return true
    return false
  }

  /** 判断队满 */
  isFull () {
    if(this.tail === this.length && this.head === 0) return true
    return false
  }

  /** 出队 */
  dequeue () {
    if(this.isEmpty()) return null
    const elem = this.queue[this.head]
    this.queue[ this.head ] = null
    this.head ++
    return elem
  }

  /** 入队 */
  enqueue (elem) {
    // 入队要判断是否队满
    if(this.isFull()) return false
    console.log(elem)
    if(this.head > 0) {
      // head指针不为0，将队列元素前移
      const queue = this.queue
      let n = 0
      for(let i=this.head; i<this.tail; i++) {
        queue[n] = this.queue[i]
        this.queue[ i ] = null
        n++
      }
      this.queue = queue
      this.head = 0
      this.tail = n
    }
    this.queue[this.tail] = elem
    this.tail++
    return true
  } 

  size () {
    return this.length
  }

  print () {
    if(this.isEmpty()) {
      return console.log('queue is empty!')
    }
    const elems = []
    for(let i=this.head; i<this.tail; i++) {
      elems.push(this.queue[i])
    }
    console.log(elems.join(' <= '))
  }
}

const arrayQueue = new ArrayQueue(6)
console.log('queue size: ', arrayQueue.size())
arrayQueue.enqueue( 1 )
arrayQueue.enqueue( 2 )
arrayQueue.enqueue( 3 )
arrayQueue.enqueue( 4 )
arrayQueue.enqueue( 5 )
arrayQueue.enqueue( 6 )
arrayQueue.enqueue( 7 )
arrayQueue.print()

arrayQueue.dequeue()
arrayQueue.print()
arrayQueue.dequeue()
arrayQueue.print()
arrayQueue.dequeue()
arrayQueue.print()
arrayQueue.dequeue()
arrayQueue.print()
arrayQueue.enqueue( 1 )
arrayQueue.enqueue( 2 )
arrayQueue.print()