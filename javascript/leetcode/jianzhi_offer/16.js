/*
实现一个函数，输入一个链表的头结点，反转该链表并输出反转后的链表的头结点
*/

function ListNode (value, next) {
  this.value = value
  this.next = next ?? null
}

function reverseListLink (head) {
  if(!head) return head

  const hd = new ListNode('')
  let cur = head

  while(cur) {
    const next = cur.next
    cur.next = hd.next
    hd.next = cur
    cur = next
  }

  return hd.next
}

const head = new ListNode( 1, new ListNode( 2, new ListNode( 3, new ListNode( 4, new ListNode( 5 ) ) ) ) )
console.log(reverseListLink(head))