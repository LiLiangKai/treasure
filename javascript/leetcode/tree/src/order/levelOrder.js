function levelOrder (root) {
  const result = []
  if(!root) return result
  const queue = [root]
  while(queue.length) {
    const size = queue.length
    for(let i=0; i<size; i++) {
      const node = queue.shift() // 出队
      result.push(node.val)
      // 左右孩子入队
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return result
}

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

console.log(levelOrder(tree))