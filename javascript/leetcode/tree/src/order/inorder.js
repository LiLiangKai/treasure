function TreeNode ( val ) {
  this.val = val
  this.left = null
  this.right = null
}

/**
 * 二叉树中序遍历
 * 先遍历左子树，再遍历根节点，最后遍历右子树
 * @param {TreeNode} treeNode
 */
function inorder(treeNode) {
  if(!treeNode) return
  inorder(treeNode.left)
  console.log('inorder current order: ', treeNode.val)
  inorder(treeNode.right)
}

function inorderIterate (root) {
  const result = []
  if(!root) return result
  const stack = []
  let node = root
  while(node || stack.length) {
    if(node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      result.push(node.val)
      node = node.right
    }
  }
  return result
}

function inorderIterate (root) {
  const result = []
  if(!root) return result
  const stack = []
  let node = root
  while(node || stack.length) {
    if(node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      result.push(node.val)
      node = node.right
    }
  }
  return result
}

module.exports = inorder

const tree = { 
  val: 'A', 
  left: { 
    val: 'B', 
    left: { val: 'D' }, 
    right: { 
      val: 'E', 
      left: {
        val: 'G'
      },
      right: {
        val: 'H'
      }
    } 
  }, 
  right: { 
    val: 'C', 
    right: { val: 'F' } 
  } 
}
console.log( inorderIterate( tree ) ) // ["D", "B", "E", "A", "C", "F"]