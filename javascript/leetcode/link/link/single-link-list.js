class LinkNode {
  constructor(elem) {
    this.elem = elem
    this.next = null
  }
}

/** 单向链表容器 */
class LinkList {
  head // 链表头结点

  constructor() {
    this.head = new LinkNode()
  }

  /**
   * 查找值为elem的链表结点
   * @param {*} elem 
   */
  find (elem) {
    let cur = this.head.next
    while(cur && cur.elem !== elem) {
      cur = cur.next
    }
    return cur === null ? -1 : cur
  } 

  /**
   * 根据索引查找节点
   * @param {number} index 
   */
  findByIndex (index) {
    if(index < 0) return -1
    let count = 0
    let cur = this.head.next
    while(cur && count < index) {
      cur = cur.next
      count++
    }
    return cur === null ? -1 : cur
  }

  /**
   * 查找值为elem的前一个节点
   * @param {*} elem 
   */
  findPrev (elem) {
    let cur = this.head.next
    let prev = this.head
    while(cur && cur.elem !== elem) {
      prev = cur
      cur = cur.next
    }
    return cur === null ? -1 : prev
  }

  /**
   * 在链表头部插入节点elem
   * @param {*} elem 
   */
  insertBefore (elem) {
    const newNode = new LinkNode(elem)
    newNode.next = this.head.next
    this.head.next = newNode
  }

  /**
   * 在链表尾插入节点elem
   * @param {*} elem 
   */
  insertAfter (elem) {
    const newNode = new LinkNode( elem )
    let cur = this.head.next
    let prev = this.head
    while(cur !== null) {
      prev = cur
      cur = cur.next
    }
    newNode.next = cur
    prev.next = newNode
  }

  /**
   * 在节点elem后插入新的节点newElem
   * @param {*} elem 
   * @param {*} newElem 
   */
  insert ( elem, newElem ) {
    const elemNode = this.find(elem)
    if ( elemNode === -1 ) return
    const newNode = new LinkNode( newElem )
    newNode.next = elemNode.next
    elemNode.next = newNode
  }

  /**
   * 移除值为elem的节点
   * @param {*} elem 
   */
  remove (elem) {
    const prevNode = this.findPrev(elem)
    if(prevNode === -1) return 
    prevNode.next = prevNode.next.next
  }

  /**
   * 移除所有值为elem的节点
   * @param {*} elem 
   */
  removeAll (elem) {
    let cur = this.head.next
    let prev = this.head
    while(cur) {
      if(cur.elem === elem) {
        prev.next = cur.next
        cur = prev.next
      } else {
        prev = cur
        cur = cur.next
      }
    }
  }

  /** 反转链表 */
  reverse () {
    const head = new LinkNode() 
    head.next = null
    let cur = this.head.next
    // 使用
    while(cur !== null) {
      // const node = new LinkNode(cur.elem)
      const next = cur.next
      cur.next = head.next
      head.next = cur
      cur = next
    } 
    this.head = head
  }

  /** 打印链表 */
  print () {
    const elems = ['head']
    let cur = this.head.next
    while(cur && cur.elem) {
      elems.push(cur.elem)
      cur = cur.next
    }
    console.log(elems.join(' -> '))
  }
}

const linkList = new LinkList()
linkList.insertAfter( 3 )
linkList.insertAfter( 4 )
linkList.insertAfter( 5 )
linkList.insertBefore( 2 )
linkList.insertBefore( 1 )
linkList.insert( 1, 6 )
linkList.insert( 0, 6 )
linkList.insert( 5, 6 )
linkList.print()

console.log( linkList.findByIndex( 0 ) )
console.log( linkList.findByIndex( 2 ) )
console.log( linkList.findByIndex( 6 ) )
console.log( linkList.findByIndex( 9 ) )

linkList.reverse()
linkList.print()

console.log( linkList.find( 3 ) )
console.log( linkList.findPrev( 3 ) )
console.log( linkList.findPrev( 9 ) )

linkList.remove( 4 )
linkList.remove( 5 )
linkList.print()

linkList.removeAll(6)
linkList.print()

linkList.reverse()
linkList.print()