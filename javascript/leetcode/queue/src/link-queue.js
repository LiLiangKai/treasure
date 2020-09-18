/**
 * 链式队列
 * @author Hiya
 * @create 2020/9/16
 */

class LinkNode {
  constructor (elem) {
    this.elem = elem
    this.next = null
  }
} 

class LinkQueue {
  head
  tail
  length
  count

  constructor ( length ) {
    if ( typeof length !== 'number' || length <= 0 ) {
      throw '初始化队列失败，必须指定队列的长度，长度必须是有效的数值'
    }
    this.head = new LinkNode('head')
    this.tail = this.head
    this.length = length
    this.count = 0
  }

  /** 判断队空 */
  isEmpty () {
    if(this.count === 0) return true
    return false
  }

  /** 判断队满 */
  isFull () {
    if(this.count === this.length) return true
    return false
  }

  /** 出队 */
  dequeue () {
    if ( this.isEmpty() ) return null
    const deNode = this.head.next
    this.head.next = deNode.next
    this.count --
    return deNode.elem
  }

  /** 入队 */
  enqueue ( elem ) {
    // 入队要判断是否队满
    if ( this.isFull() ) return false
    const node = new LinkNode(elem)
    node.next = this.tail.next
    this.tail.next = node
    this.tail = node
    this.count ++
    return true
  }

  size () {
    return this.length
  }

  print () {
    if ( this.isEmpty() ) {
      return console.log( 'queue is empty!' )
    }
    const elems = []
    let curNode = this.head.next
    while(curNode) {
      elems.push(curNode.elem)
      curNode = curNode.next
    }
    console.log('queue: ', elems.join(' <= '))
  }
}

const linkQueue = new LinkQueue( 6 )
console.log( 'queue size: ', linkQueue.size() )
linkQueue.enqueue( 1 )
linkQueue.enqueue( 2 )
linkQueue.enqueue( 3 )
linkQueue.enqueue( 4 )
linkQueue.enqueue( 5 )
linkQueue.enqueue( 6 )
linkQueue.enqueue( 7 )
linkQueue.print()
linkQueue.dequeue()
linkQueue.dequeue()
linkQueue.dequeue()
linkQueue.print()
linkQueue.enqueue( 1 )
linkQueue.enqueue( 2 )
linkQueue.enqueue( 3 )
linkQueue.enqueue( 5 )
linkQueue.print()