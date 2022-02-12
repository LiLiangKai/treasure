/*
输入某二叉树的前序和中序遍历结果，请重建出该二叉树，假设输入的前序和中序遍历结果中都不含重复数字,
preorder = [1,2,4,7,3,5,6,8]
inorder = [4,7,2,1,5,3,8,6]
*/

/**
 * 
 * @param {*} value 
 * @param {TreeNode} left 
 * @param {TreeNode} right 
 */
function TreeNode (value, left, right) {
  this.value = value
  this.left = left ?? null
  this.right = right ?? null
}

/**
 * 
 * @param {number[]} preorder 
 * @param {number[]} inorder 
 */
function buildBinaryTree (preorder = [], inorder = []) {
  if(!preorder.length || !inorder.length) return null
  const root = new TreeNode(preorder[0])
  let m = 0
  for(; m < inorder.length; m++) {
    if(inorder[m] === root.value) break
  }
  root.left = buildBinaryTree(preorder.slice(1, 1+m), inorder.slice(0, m))
  root.right = buildBinaryTree(preorder.slice(m+1), inorder.slice(m+1))
  return root
}


console.log(buildBinaryTree([1,2,4,7,3,5,6,8], [4,7,2,1,5,3,8,6]))