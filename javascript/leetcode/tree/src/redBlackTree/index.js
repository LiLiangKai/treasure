const RED = true
const BLACK = false

/**
 * 
 * @param {number} val 
 * @param {RED | BLACK} color 
 */
function TreeNode ( val, color ) {
  this.val = val
  this.color = color
  this.left = null
  this.right = null
}

/**
 * 新增节点
 * @param {TreeNode} node
 * @param {number} val
 */
function putNode (node, val) {
  if ( !node ) return new TreeNode( val, RED )
  if (val < node.val) {
    node.left = putNode(node.left, val)
  } else if (val > node.val) {
    node.right = putNode(node.right, val)
  } else {
    node.val = val
  }

  // 左子节点黑色，右子节点红色，左旋
  if ( !isRed( node.left ) && isRed( node.right ) ) node = rotateLeft( node )
  // 左子节点红色，该左子节点的左子节点红色，右旋旋
  if(isRed(node.left) && isRed(node.left.left)) node = rotateRight(node)
  // 左子节点红色，右节子点红色，颜色转换
  if(isRed(node.left) && isRed(node.right)) flipColors(node)

  return node
}

/**
 * 左旋
 * @param {TreeNode} node
 */
function rotateLeft (node) {
  const t = node.right
  node.right = t.left
  t.left = node
  t.color = node.color
  node.color = RED
  return t
}

/**
 * 右旋
 * @param {TreeNode} node 
 */
function rotateRight (node) {
  const t = node.left
  node.left = t.right
  t.right = node
  t.color = node.color
  node.color = RED
  return t
}

/**
 * 颜色反转
 * @param {TreeNode} node 
 */
function flipColors( node ) {
  node.color = RED
  node.left.color = BLACK
  node.right.color = BLACK
}

/**
 * 判断是不是红链接
 * @param {TreeNode} node 
 */
function isRed (node) {
  if(!node) return false
  return node.color === RED
}

/** 红黑树 */
class RedBlackTree {
  constructor () {
    this.root = null
  }

  /**
   * 新增节点
   * @param {number} val 
   */
  put (val) {
    this.root = putNode(this.root, val)
    this.root.color = BLACK
  }

  /** 删除节点 */
  delete () {}

  /** 选择节点 */
  select () {}

}

const rbTree = new RedBlackTree()
rbTree.put( 4 )
rbTree.put( 5 )
rbTree.put( 6 )
rbTree.put( 3 )
console.log( rbTree.root )