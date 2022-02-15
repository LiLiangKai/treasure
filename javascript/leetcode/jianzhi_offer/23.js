/*
从上往下打印二叉树的结点，同一层的结点按照从左到右顺序打印
*/

function BinaryTreeNode (value, left, right) {
  this.value = value
  this.left = left ?? null
  this.right = right ?? null
}

function levelOrderTree (root) {
  if(!root) return
  const queue = [root]
  const result = []
  while(queue.length) {
    const size = queue.length
    for(let i=0; i<size; i++) {
      const node = queue.shift()
      result.push(node.value)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return result
}

const root = new BinaryTreeNode(8,
  new BinaryTreeNode(6, 
    new BinaryTreeNode(5),
    new BinaryTreeNode(7)
  ),
  new BinaryTreeNode(10,
    new BinaryTreeNode(9),
    new BinaryTreeNode(11)
  )
)

console.log(levelOrderTree(root))