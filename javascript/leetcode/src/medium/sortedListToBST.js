/**
 * Definition for singly-linked list.
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function ( head ) {
  const treeNode = buildTree( head )
  return treeNode
};

function buildTree ( head, end = null ) {
  if ( !head ) return null
  const midNode = getMidNode( head, end )
  if ( !midNode ) return null
  // console.log(midNode.val)
  // buildTree( midNode.next, null )
  if(midNode === head && !midNode.next) return new TreeNode(midNode.val)
  let left = buildTree( head, midNode )
  console.log('left ----------')
  printLink( left )
  console.log( '----------\n' )
  // let right = buildTree( midNode.next, null )
  let right = null
  printLink( right )
  return new TreeNode(
    midNode.val,
    left,
    right
  )
}


function getMidNode ( head, end = null ) {
  if(!head) return head
  let slow = head
  let fast = head
  while ( fast && fast !== end && fast.next !== null && fast.next !== end ) {
    console.log('getMidNode------------')
    printLink(fast)
    printLink(slow)
    console.log('----------------------')
    fast = fast.next
    fast = fast.next
    slow = slow.next
  }
  return slow
}

function printLink ( head ) {
  const record = []
  let node = head
  while ( node ) {
    record.push( node.val )
    node = node.next
  }
  console.log( record.join( ' -> ' ) )
}

const link = new ListNode( 1, new ListNode(2, new ListNode(3, new ListNode(4))) )

console.log(sortedListToBST(link))