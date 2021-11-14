/*
我们从二叉树的根节点 root 开始进行深度优先搜索。

在遍历中的每个节点处，我们输出 D 条短划线（其中 D 是该节点的深度），然后输出该节点的值。（如果节点的深度为 D，则其直接子节点的深度为 D + 1。根节点的深度为 0）。

如果节点只有一个子节点，那么保证该子节点为左子节点。

给出遍历输出 S，还原树并返回其根节点 root。

示例 1：

输入："1-2--3--4-5--6--7"
输出：[1,2,5,3,4,6,7]
 */

/**
 * Definition for a binary tree node.
 */
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

/**
 * @param {string} S
 * @return {TreeNode}
 */
var recoverFromPreorder = function ( S ) {
  if ( !S ) return null
  let index = 0
  let prev = ''
  let level = 0
  const record = {}
  while(index < S.length) {
    const char = S[index]
    if(char === '-') {
      if(prev !== '') {
        const node = new TreeNode(Number(prev))
        // 以层级为key，记录当前节点，其父结点为层架-1
        // 若以存在记录 ，则用新的覆盖
        record[level] = node
        if(record[level-1]) {
          // 父结点不为空，设置父结点的孩子节点
          setChildNode( record[ level - 1 ], node )
        }
        prev = ''
        level = 0
      }
      level++
    }else {
      prev += char
    }
    index++
  }
  if(prev !== '') {
    const node = new TreeNode( Number( prev ) )
    record[level] = node
    if ( record[ level - 1 ] ) {
      setChildNode( record[ level - 1 ], node)
    }
  }
  return record[0]
}

function setChildNode (parent, child) {
  if(!parent.left) parent.left = child
  else parent.right = child
}

console.log(recoverFromPreorder("1-2--3---4-5--6---7"))

/*
"1-2--3--4-5--6--7"

*/