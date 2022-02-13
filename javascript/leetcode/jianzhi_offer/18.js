/*
输入两颗树A和B，判断B是不是A的子树
*/

function BinaryTreeNode (value, left, right) {
  this.value = value
  this.left = left ?? null
  this.right = right ?? null
}

/**
 * 
 * @param {BinaryTreeNode} root1 
 * @param {BinaryTreeNode} root2 
 */
function hasSubTree (root1, root2) {
  let result = false
  if(root1 && root2) {
    if(root1.value === root2.value) {
      result = tree1HaveTree2(root1, root2)
    }
    if(!result) {
      result = hasSubTree(root1.left, root2)
    }
    if(!result) {
      result = hasSubTree(root1.right, root2)
    }
  }
  return result
}

function tree1HaveTree2 (root1, root2) {
  if(!root2) return true
  if(!root1) return false
  if(root1.value !== root2.value) return false
  return tree1HaveTree2(root1.left, root2.left) && tree1HaveTree2(root1.right, root2.right)
}

const root1 = new BinaryTreeNode(
  8, 
  new BinaryTreeNode(8,
    new BinaryTreeNode(9),
    new BinaryTreeNode(2, new BinaryTreeNode(4), new BinaryTreeNode(7))  
  ),
  new BinaryTreeNode(7)
)

const root2 = new BinaryTreeNode(8,
  new BinaryTreeNode(9),
  new BinaryTreeNode(2)
)

console.log( hasSubTree( root1, null ) )
console.log( hasSubTree( null, root2 ) )
console.log( hasSubTree( null, null ) )
console.log( hasSubTree( root1, root2 ) )
console.log( hasSubTree( root2, root1 ) )