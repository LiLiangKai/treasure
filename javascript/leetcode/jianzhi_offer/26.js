/*
请实现一个函数，复制一个复杂链表，在复杂链表中，除了有一个next指针指向下一个节点，可能还有一个sibling指针指向链表中的任意节点。
*/

function ListLinkNode (value, next, sibling) {
  this.value = value
  this.next = next ?? null
  this.sibling = sibling ?? null
}

function clone ( head ) {
  if ( !head ) return head
  const newHead = new ListLinkNode( '' )
  const map = new Map()
  let newCur = newHead
  let cur = head
  while ( cur ) {
    // 第一次遍历，生成复制的链表，并生成一份映射关系哈希表
    const node = new ListLinkNode( cur.value )
    map.set( cur, node )
    newCur.next = node
    newCur = node
    cur = cur.next
  }
  cur = head
  while ( cur ) {
    // 第二次遍历，设置sibling指针，根据映射关系哈希表进行设置
    if ( cur.sibling ) {
      map.get( cur ).sibling = map.get( cur.sibling )
    }
    cur = cur.next
  }
  return newHead.next
}
