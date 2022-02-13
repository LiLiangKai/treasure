/*
给定单向链表的头指针和一个结点指针，定义一个函数在O(1)时间内删除该结点
*/

/**
 * 
 * @param {*} value 
 * @param {ListNode} next 
 */
function ListNode (value, next) {
  this.value = value
  this.next = next ?? null
}

function deleteNode (head, node) {
  if(!head || !node) return head
  const hd = new ListNode('', head)

  if(node.next) {
    let next = node.next
    node.value = next.value
    node.next = next.next
    next = null
  } else if(node === head) {
    hd.next = head.next
  } else {
    let prev = hd
    while(prev.next !== node) {
      prev = prev.next
    }
    prev.next = null
  }

  return hd.next
}

const node1 = new ListNode( 2 )
const node2 = new ListNode( 1, node1 )
const head = new ListNode(0, node2)
console.log(head)
console.log(deleteNode(head, node2))