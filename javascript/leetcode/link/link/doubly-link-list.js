class LinkNode {
  constructor ( elem ) {
    this.elem = elem
    this.next = null
    this.prev = null
  }
}

/** 双向链表容器 */
class LinkList {
  head // 链表头结点
  nodeCount

  constructor () {
    this.head = new LinkNode('head')
    this.head.next = null
    this.head.prev = null
    this.nodeCount = 0
  }

  /**
   * 查找值为elem的链表结点
   * @param {*} elem 
   */
  find ( elem ) {
    let cur = this.head.next
    while(cur && cur.elem !== elem) {
      cur = cur.next
    }
    return cur === null ? -1 : cur
  }

  /**
   * 根据索引查找节点
   * 首节点的索引为0
   * @param {number} index 
   */
  findByIndex (index) {
    if(index < 0) return -1
    let cur = this.head.next
    let count = 0
    while(cur && count < index) {
      cur = cur.next
      count ++
    }
    return cur === null ? -1 : cur
  }

  /**
   * 查找值为elem的前一个节点
   * @param {*} elem 
   */
  findPrev ( elem ) {
    const node = this.find(elem)
    if(node === -1) return -1
    return node.prev
  }

  /**
   * 在链表头部插入节点elem
   * @param {*} elem 
   */
  insertBefore ( elem ) {
    const  newNode = new LinkNode(elem)
    const next = this.head.next
    newNode.prev = this.head
    newNode.next = next
    this.head.next = newNode
    if(next !== null) {
      next.prev = newNode
    }
    this.nodeCount++
  }

  /**
   * 在链表尾插入节点elem
   * @param {*} elem 
   */
  insertAfter ( elem ) {
    const newNode = new LinkNode(elem)
    let cur = this.head.next
    let prev = this.head
    while(cur !== null) {
      prev = cur
      cur = cur.next
    }
    newNode.prev = prev
    newNode.next = cur
    prev.next = newNode
    this.nodeCount++
  }

  /**
   * 在节点elem后插入新的节点newElem
   * @param {*} elem 
   * @param {*} newElem 
   */
  insert ( elem, newElem ) {
    const node = this.find( elem )
    if ( node === -1 ) return
    const newNode = new LinkNode(newElem)
    const next = node.next
    newNode.prev = node
    newNode.next = next
    node.next = newNode
    if(next !== null) {
      next.prev = newNode
    }
    this.nodeCount++
  }

  /**
   * 移除值为elem的节点
   * @param {*} elem 
   */
  remove ( elem ) {
    const node = this.find(elem)
    if(node === null) return
    const next = node.next
    node.prev.next = next
    if ( next ) next.prev = node.prev
    this.nodeCount--
  }

  /**
   * 移除所有值为elem的节点
   * @param {*} elem 
   */
  removeAll ( elem ) {
    let cur = this.head.next
    while(cur) {
      const next = cur.next
      if(cur.elem === elem) {
        cur.prev.next = next
        if ( next ) next.prev = cur.prev
        this.nodeCount--
      }
      cur = next
    }
  }

  /** 反转链表 */
  reverse () {
    const head = new LinkNode('head')
    let cur = this.head.next
    while(cur) {
      const next = cur.next
      cur.prev = head
      cur.next = head.next
      head.next = cur
      if(cur.next) {
        cur.next.prev = cur
      }
      cur = next
    }
    this.head = head
  }

  /** 打印链表 */
  print () {
    let cur = this.head.next
    const elems = ['head']
    while(cur !== null) {
      elems.push(cur.elem)
      cur = cur.next
    }
    console.log( elems.join( ' <=> ' ), ' total node numbes = ', this.nodeCount)
  }
}

const linkList = new LinkList()
linkList.print()

linkList.insertBefore( 4 )
linkList.insertBefore( 3 )
linkList.insertBefore( 2 )
linkList.print()

linkList.insert( 3, 6 )
linkList.insert( 4, 7 )
linkList.insert( 5, 8 )
linkList.print()

linkList.insertAfter( 8 )
linkList.insertAfter( 9 )
linkList.insertAfter( 10 )
linkList.insertBefore( 1 )
linkList.print()

linkList.remove( 1 )
linkList.remove( 4 )
linkList.remove( 10 )
linkList.print()

linkList.insertBefore( 8 )
linkList.insertAfter( 8 )
linkList.insert( 3, 8 )
linkList.print()

linkList.removeAll(8)
linkList.print()

linkList.reverse()
linkList.print()

console.log( linkList.find( 9 ) )
console.log( linkList.find( 2 ) )
console.log( linkList.find( 6 ) )
console.log( linkList.find( 10 ) )
console.log( linkList.findByIndex( 0 ) )
console.log( linkList.findByIndex( 4 ) )
console.log( linkList.findByIndex( 3 ) )
console.log( linkList.findByIndex( 8 ) )