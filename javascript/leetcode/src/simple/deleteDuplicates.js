/*
给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例 1:

输入: 1->1->2
输出: 1->2
示例 2:

输入: 1->1->2->3->3
输出: 1->2->3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function ( head ) {
  var link = head
  var newLink
  var tmp
  var map = {}
  while(link && link.val !== undefined) {
    if(map[link.val]!==undefined) {
      link = link.next
      continue
    } 
    if(!newLink) {
      newLink = new ListNode(link.val)
      tmp = newLink
    } else {
      tmp.next = new ListNode(link.val)
      tmp = tmp.next
    }
    map[link.val] = link.val
    link = link.next
  }
  return newLink || new ListNode()
};

var link = new ListNode(1)
link.next = new ListNode(1)
var tmp = link.next
tmp.next = new ListNode(2)

console.log( deleteDuplicates(link))