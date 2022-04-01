/*
输入一个整数数组，判断该数组是不是二叉搜索树的后续遍历结果，返回布尔值。假设输入的数组中任意两个元素都不相同.
例如 [5, 7, 6, 9, 11, 10, 8]
*/

/**
 * 
 * @param {Number[]} order 
 */
function isPostOrder (order = []) {
  if(!order.length) return true
  const length = order.length
  const rootVal = order[length-1]
  let i = 0

  // 二叉搜索树中，左子树的节点都比根结点小，右子树的节点都比根结点大
  while(i < length-1) {
    if(order[i] > rootVal) break
    i++
  }

  for(let j=i; j<length-1; j++) {
    if(order[j] < rootVal) return false
  }

  return isPostOrder(order.slice(0,i)) && isPostOrder(order.slice(i, length-1))
}

console.log( isPostOrder( [] ) )
console.log( isPostOrder( [ 2, 1 ] ) )
console.log( isPostOrder( [ 1,3,0, 2 ] ) )
console.log( isPostOrder( [ 5, 7, 6, 9, 11, 10, 8 ] ) )
console.log( isPostOrder( [ 5, 7, 6, 9, 4, 10, 8 ] ) )