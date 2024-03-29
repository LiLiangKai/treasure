/*
给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。

请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。

示例 1:

输入: 1->2->3->4->5->NULL
输出: 1->3->5->2->4->NULL
示例 2:

输入: 2->1->3->5->6->4->7->NULL
输出: 2->3->6->7->1->5->4->NULL
说明:

应当保持奇数节点和偶数节点的相对顺序。
链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。

*/

/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function ( head ) {
  if ( !head || !head.next ) return head

  let evenHead = head.next
  let odd = head
  let even = evenHead

  while(even && even.next) {
    odd.next = even.next
    odd = odd.next
    even.next = odd.next
    even = even.next
  }

  odd.next = evenHead

  return head
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList2 = function ( head ) {
  if ( !head || !head.next ) return head
  let count = 1
  let node = head 
  let odd = null
  let even = null
  let oddNode = null
  let evenNode = null

  while(node) {
    if(count % 2 === 0) {
      if(!even) {
        even = node
      } else {
        evenNode.next = node
      }
      evenNode = node
    } else {
      if(!odd) odd = node
      else oddNode.next = node
      oddNode = node
    }

    node = node.next
    count ++
  }


  oddNode.next = even
  evenNode.next = null

  return odd
};

function printLink (head) {
  const record = []
  let node = head
  while(node) {
    record.push(node.val)
    node = node.next
  }
  console.log(record.join(' -> '))
}

const link = new ListNode(1, new ListNode(2, new ListNode(3)))

printLink(link)
printLink(oddEvenList(link))