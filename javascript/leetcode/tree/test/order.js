const { preorder, inorder, postorder } = require('../src/order')

function TreeNode ( val ) {
  this.val = val
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
    val: 5,
    left: {
      val: 3,
      left: { val: 1 },
      right: { val: 4 }
    },
    right: {
      val: 7,
      left: { val: 6 },
      right: { val: 8 }
    }
  }
  preorder(tree) // 5 3 1 4 7 6 8
  console.log('-------------------------------')
  inorder(tree) // 1 3 4 5 6 7 8
  console.log('-------------------------------')
  postorder(tree) // 1 4 3 6 8 7 5
}

main()