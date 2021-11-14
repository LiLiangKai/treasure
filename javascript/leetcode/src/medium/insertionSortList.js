/*
插入排序算法：

插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
重复直到所有输入数据插入完为止。


示例 1：

输入: 4->2->1->3
输出: 1->2->3->4
示例 2：

输入: -1->5->3->4->0
输出: -1->0->3->4->5
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
var insertionSortList = function ( head ) {
  if(!head) return head
  let node = head.next
  head.next = null

  while(node) {
    let cur = node
    let q = head
    let prev = null
    while(q && cur) {
      if(q.val > cur.val) {
        cur.next = q
        if(prev === null) {
          head = cur
        } else {
          prev.next = cur
        }
        cur = null
      }
      console.log(q.val)

      prev = q
      q = q.next
    }

    if(cur) {
      cur.next = q
      if ( prev === null ) {
        head = cur
      } else {
        prev.next = cur
      }
    }

    node = node.next
  }

  return head
}

const link = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))))
console.log(insertionSortList(link))

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList2 = function ( head ) {
  if ( !head ) return head
  const array = []
  let node = head
  while ( node ) {
    array.push( node.val )
    node = node.next
  }
  insertSort( array )

  let idx = 0
  node = head
  while ( node ) {
    node.val = array[ idx ]
    node = node.next
    idx++
  }
  return head
};

function insertSort ( array = [] ) {
  if ( !array.length ) return array
  for ( let i = 1; i < array.length; i++ ) {
    const val = array[ i ]
    let prevIndex = i - 1
    while ( prevIndex >= 0 && array[ prevIndex ] > val ) {
      array[ prevIndex + 1 ] = array[ prevIndex-- ]
    }
    array[ prevIndex + 1 ] = val
  }
  return array
}