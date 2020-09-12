class LinkNode {
  constructor ( elem ) {
    this.elem = elem
    this.next = null
  }
}

/** 单向链表容器 */
class LinkList {
  head // 链表头结点
  nodeCount // 链表结点数

  constructor () {
    this.head = new LinkNode('head')
    this.head.next = this.head
    this.nodeCount = 0
  }

  /**
   * 查找值为elem的链表结点
   * @param {*} elem 
   */
  find ( elem ) {
    let cur = this.head.next
    while(cur && cur !== this.head && cur.elem !== elem) {
      cur = cur.next
    }
    return cur === this.head ? -1 : cur
  }

  /**
   * 根据索引查找节点
   * @param {number} index 
   */
  findByIndex ( index ) {
    let count = 0
    let cur = this.head.next
    while(cur && cur !== this.head && count < index) {
      cur = cur.next
      count++
    }
    return cur === this.head ? -1 : cur
  }

  /**
   * 查找值为elem的前一个节点
   * @param {*} elem 
   */
  findPrev ( elem ) {
    let cur = this.head.next
    let prev = this.head
    while(cur && cur !== this.head && cur.elem !== elem) {
      prev = cur
      cur = cur.next
    }
    return (prev === this.head || prev.next === this.head)? -1 : prev
  }

  /**
   * 在链表头部插入节点elem
   * @param {*} elem 
   */
  insertBefore ( elem ) {
    const newNode = new LinkNode(elem)
    newNode.next =  this.head.next
    this.head.next = newNode
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
    while(cur && cur !== this.head) {
      prev = cur
      cur = cur.next
    }
    newNode.next = this.head
    prev.next = newNode
    this.nodeCount++
  }

  /**
   * 在节点elem后插入新的节点newElem
   * @param {*} elem 
   * @param {*} newElem 
   */
  insert ( elem, newElem ) {
    const node = this.find(elem)
    if(node === -1) return
    const newNode = new LinkNode(newElem)
    newNode.next = node.next
    node.next = newNode
    this.nodeCount++
  }

  /**
   * 移除值为elem的节点
   * @param {*} elem 
   */
  remove ( elem ) {
    const 
  }

  /**
   * 移除所有值为elem的节点
   * @param {*} elem 
   */
  removeAll ( elem ) {
    
  }

  /** 反转链表 */
  reverse () {
    
  }

  /** 打印链表 */
  print () {
    const elems = [ 'head' ]
    let cur = this.head.next
    while ( cur && cur.elem ) {
      elems.push( cur.elem )
      if(cur === this.head) {
        break
      }
      cur = cur.next
    }
    console.log( elems.join( ' -> ' ), ' total node numbes = ', this.nodeCount )
  }
}

const linkList = new LinkList()
linkList.insertBefore( 4 )
linkList.insertBefore( 2 )
linkList.insertBefore( 1 ) 
linkList.print()

linkList.insertAfter( 5 )
linkList.insertAfter( 6 )
linkList.insertAfter( 7 )
linkList.print()

console.log( linkList.find( 1 ) )
console.log( linkList.find( 7 ) )
console.log( linkList.find( 5 ) )
console.log( linkList.find( 9 ) )
linkList.print()

console.log( linkList.findByIndex( 0 ) )
console.log( linkList.findByIndex( 1 ) )
console.log( linkList.findByIndex( 5 ) )
console.log( linkList.findByIndex( 6 ) )

linkList.insert( 1, 4 )
linkList.insert( 7, 9 )
linkList.insert( 4, 8 )
linkList.insert( 0, 8 )
linkList.print()

console.log( linkList.findPrev( 9 ) )
console.log( linkList.findPrev( 4 ) )
console.log( linkList.findPrev( 1 ) )
console.log( linkList.findPrev( 10 ) )