/*
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function ( l1, l2 ) {
  let node = new ListNode( 'head' )
  let temp = node, sum, n = 0
  while ( l1 || l2 ) {
    const n1 = l1 ? l1.val : 0
    const n2 = l2 ? l2.val : 0
    sum = n1 + n2 + n
    temp.next = new ListNode( sum % 10 )
    temp = temp.next
    n = parseInt( sum / 10 )
    if ( l1 ) l1 = l1.next
    if ( l2 ) l2 = l2.next
  }
  if ( n > 0 ) temp.next = new ListNode( n )
  return node.next
}

/**
 * 
 * @param {ListNode} link 
 */
function toNumber ( link ) {
  let n = 0
  if ( !link || !link.val ) return n
  let i = 0
  let l = link
  while(l) {
    n += l.val * Math.pow(10, i++)
    l = l && l.next
  }
  return n
}

function toLink ( number ) {
  if ( !number ) return new ListNode( 0 )
  let link
  let l
  let n = number
  while(n) {
    let mod = n % 10
    let cl = new ListNode(mod)
    if(!link) {
      link = cl
    } else {
      l.next = cl
    }
    l = cl
    n = (n - mod) / 10
  }
  return link
}
