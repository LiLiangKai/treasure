const { preorder, inorder, postorder } = require('../src/order')

function TreeNode ( val ) {
  this.elem = val
  this.left = null
  this.right = null
}

/*
          5
         / \
        3   7
       / \  / \   
      1  4  6  8
*/

function main () {
  const tree = {
    elem: 5,
    left: {
      elem: 3,
      left: { elem: 1 },
      right: { elem: 4 }
    },
    right: {
      elem: 7,
      left: { elem: 6 },
      right: { elem: 8 }
    }
  }
  preorder(tree) // 5 3 1 4 7 6 8
  console.log('-------------------------------')
  inorder(tree) // 1 3 4 5 6 7 8
  console.log('-------------------------------')
  postorder(tree) // 1 4 3 6 8 7 5
}

main()