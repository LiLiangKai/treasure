/*
输入一个链表的头结点，从尾到头打印每个链表结点的值
*/

/**
 * 
 * @param {*} value 
 * @param {LinkListNode} next 
 */
function LinkListNode (value, next) {
  this.value = value
  this.next = next ?? null
}

/**
 * 
 * @param {LinkListNode} head 
 */
function printLinkListReverse (head) {
  if(!head) return
  if(head.next) {
    printLinkListReverse(head.next)
  }
  console.log(head.value)
}

/**
 * 
 * @param {LinkListNode} head 
 */
function printLinkListReverse2 ( head ) {
  if ( !head ) return
  const stack = []
  let node = head
  while(node) {
    stack.push(node)
    node = node.next
  }
  while(stack.length) {
    const node = stack.pop()
    console.log(node.value)
  }
} 

const linkList = new LinkListNode(1, new LinkListNode(2, new LinkListNode(3, new LinkListNode(4, new LinkListNode(5)))))

console.time('1')
printLinkListReverse(linkList)
console.timeEnd( '1' )

console.time( '2' )
printLinkListReverse2( linkList )
console.timeEnd( '2' )