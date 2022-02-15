/*
输入一个二叉搜索时，将该二叉搜索树转换成一个排序的双向循环链表。要求不能创建新的结点，只能调整树中结点的指向。
*/

function BinaryTreeNode (val, left, right) {
  this.val = val
  this.right = right ?? null
  this.left = left ?? null
}

function convert (root) {
  if(!root) return root
  let head = null
  let prevListNode = null
  let cur = root
  const stack = []
  while(cur || stack.length) {
    if(cur) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      const right = cur.right

      if(!head) {
        head = cur
        prevListNode = cur
      } else {
        prevListNode.right = cur
        cur.left = prevListNode
        prevListNode = cur
      }

      cur = right
    }
  }
  return head
}

const root = new BinaryTreeNode(10,
  new BinaryTreeNode(8,
    new BinaryTreeNode(6),
    new BinaryTreeNode(9)
  ),
  new BinaryTreeNode(12,
    new BinaryTreeNode(11),
    new BinaryTreeNode(13)
  )
)

function print (head) {
  let cur = head
  const result = []
  let path = []
  while(cur) {
    path.push(cur.val)
    if(!cur.right) break
    cur = cur.right
  }
  result.push(path)
  path = []
  while(cur) {
    path.push(cur.val)
    if(!cur.left) break
    cur = cur.left
  }
  result.push(path)
  return result
}

console.log(print(convert(root)));
console.log((convert(null)));