/*
输入两个递增排序的链表，合并这两个链表，并使新链表也是递增排序的
*/

function ListNode (value, next) {
  this.value = value
  this.next = next ?? next
}

function mergeListLink(h1, h2) {
  if(!h1) return h2
  if(!h2) return h1
  const hd = new ListNode('')
  let cur = hd

  while(h1 && h2) {
    let node = h1
    if(node.value > h2.value) {
      node = h2
      h2 = h2.next
    } else {
      h1 = h1.next
    }
    node.next = cur.next
    cur.next = node
    cur = node
  }

  if(h1) {
    cur.next = h1
  } else {
    cur.next = h2
  }

  return hd.next
}

const head1 = new ListNode( 1, new ListNode( 3, new ListNode( 5, new ListNode( 7, new ListNode( 9 ) ) ) ) )
const head2 = new ListNode( 2, new ListNode( 4, new ListNode( 6 ) ) )

// console.log( mergeListLink( head1, null ) )
// console.log( mergeListLink( null, head2 ) )
console.log( JSON.stringify(mergeListLink( head1, head2 )) )