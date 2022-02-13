/*
输入一个二叉树，输出它的镜像，即反转左右子树
*/

function BinaryTreeNode (value, left, right) {
  this.value = value
  this.left = left ?? null
  this.right = right ?? null
}

function mirrorBTree (root) {
  if(!root || (!root.left && !root.right)) return root
  const left = root.left
  // root.left = root.right
  // root.right = tmp
  // root.left && mirrorBTree(root.left)
  // root.right && mirrorBTree(root.right)
  root.left = mirrorBTree(root.right)
  root.right = mirrorBTree(left)
  return root
}

function mirrotBinaryTree(root) {
  if(!root || (!root.left && !root.right)) return root
  const left = root.left
  root.left = mirrotBinaryTree(root.right)
  root.right = mirrotBinaryTree(left)
  return root
}

const root1 = new BinaryTreeNode(
  8,
  new BinaryTreeNode( 8,
    new BinaryTreeNode( 9 ),
    new BinaryTreeNode( 2, new BinaryTreeNode( 4 ), new BinaryTreeNode( 7 ) )
  ),
  new BinaryTreeNode( 7 )
)

console.log( mirrorBTree( null ) )
console.log( mirrorBTree( new BinaryTreeNode(2) ) )
console.log( mirrorBTree( root1 ) )


