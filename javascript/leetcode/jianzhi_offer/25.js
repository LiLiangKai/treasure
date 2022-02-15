/*
输入一个二叉树和一个整数，输出出二叉树中节点的和尾输入整数的所有路径。从树的根结点从上往下一直到叶子结点形成一条路径
*/
function BinaryTreeNode (value, left, right) {
  this.value = value
  this.left = left ?? null
  this.right = right ?? null
}

function findAllPath (root, target) {
  const result = []
  if ( !root ) return result

  function findPath (root, target, path = []) {
    if(!root) return
    if(!root.left && !root.right) {
      if(target === root.value) {
        result.push([...path, root.value])
      }
      return
    }

    const val = root.value
    path.push(val)
    root.left && findPath(root.left, target-val, path)
    root.right && findPath(root.right, target-val, path)
    path.pop()
  }

  findPath(root, target, [])
  return result
}

const root = new BinaryTreeNode(10,
  new BinaryTreeNode(5,
    new BinaryTreeNode(4),
    new BinaryTreeNode(7)
  ),
  new BinaryTreeNode(12)
)

console.log( findAllPath( null, 10 ) )
console.log( findAllPath( root, 10 ) )
console.log( findAllPath( root, 22 ) )
console.log( findAllPath( root, 19 ) )