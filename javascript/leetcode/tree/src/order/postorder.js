function TreeNode ( val ) {
  this.val = val
  this.left = null
  this.right = null
}

/**
 * 二叉树后序遍历
 * 先遍历左子树和右子树，最后遍历根节点
 * @param {TreeNode} treeNode 
 */
function postorder (treeNode) {
  if(!treeNode) return
  postorder(treeNode.left)
  postorder(treeNode.right)
  console.log('postorder current node: ', treeNode.val)
}

function postorderIterate ( root ) {
  const result = []
  if ( !root ) return result
  const stack = [ root ]
  while ( stack.length ) {
    const node = stack.pop()
    result.push( node.val )
    node.left && stack.push( node.left )
    node.right && stack.push( node.right )
  }
  result.reverse()
  return result
}

module.exports = postorder

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
console.log(postorderIterate(tree))