/*
给你一个链表的头节点 head 。删除 链表的 中间节点 ，并返回修改后的链表的头节点 head 。

长度为 n 链表的中间节点是从头数起第 ⌊n / 2⌋ 个节点（下标从 0 开始），其中 ⌊x⌋ 表示小于或等于 x 的最大整数。

对于 n = 1、2、3、4 和 5 的情况，中间节点的下标分别是 0、1、1、2 和 2 。
 

示例 1：
输入：head = [1,3,4,7,1,2,6]
输出：[1,3,4,1,2,6]

示例 2：
输入：head = [2, 1]
输出：[2]

示例 3：
输入：head = [2]
输出：[]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/delete-the-middle-node-of-a-linked-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 var deleteMiddle = function(head) {
  if(!head) return head
  const hd = new ListNode('', head)
  let fast = head
  let slow = head
  while(fast && fast.next) {
      fast = fast.next.next
      slow = slow.next
  }
  const next = slow.next
  if(next) {
      slow.val = next.val
      slow.next = next.next
  }else {
    // 删除的结点正好是尾结点
      let cur = hd
      while(cur.next !== slow) {
          cur = cur.next
      }
      cur.next = slow.next
  }
  return hd.next
};