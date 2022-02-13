/*
输入一个链表，输出该链表倒数第k个节点。
*/

function ListNode (value, next) {
  this.value = value
  this.next = next ?? null
}

function findNthOfNode (head, k) {
  let fast = head
  let slow = head

  if(!head || k < 1) return null // 注意空指针或无效k值

  while(k-- > 1) {
    if(!fast.next) {
      return null
    }
    fast = fast.next
  }

  while(fast.next) {
    fast = fast.next
    slow = slow.next
  }
  return slow
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))
console.log(findNthOfNode(head, 6))