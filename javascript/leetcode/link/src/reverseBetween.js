/*
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
例如：
输入：[1,2,3,4,5], left=2, right=4
输出：[1,4,3,2,5]


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-linked-list-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
  if(!head) return head
  if(left === right) return head
  const hd = new ListNode('', head)
  let prev = hd
  let cur = hd.next
  let start = 1
  while(start < left && cur) {
      prev = cur
      cur = cur.next
      start++
  }
  if(!cur) return hd.next
  while (start < right) {
      const next = cur.next
      cur.next = next.next
      next.next = prev.next
      prev.next = next
      
      start++

  }

  return hd.next
};

const link = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))

console.log(reverseBetween(link, 2, 4))