var sumRootToLeaf = function ( root ) {
  const binaryNumbers = []
  getBinaryNumberFromTree( root, binaryNumbers )
  return binaryNumbers.reduce((sum, n) => {
    sum += parseInt(n, 2)
    return sum
  }, 0)
};

function getBinaryNumberFromTree ( root, result = [], prefix = '' ) {
  if ( !root ) return result
  prefix += root.val

  if (!root.left && !root.right) {
    prefix && result.push( prefix )
    return result
  }

  getBinaryNumberFromTree( root.left, result, prefix )
  getBinaryNumberFromTree( root.right, result, prefix )
  return result
}

const tree = {
  val: 1,
  left: {
    val: 0,
    left: {
      val: 0,
    },
    right: {
      val: 1
    }
  },
  right: {
    val: 1,
    left: {
      val: 0
    },
    right: {
      val: 1
    }
  }
}

console.log(sumRootToLeaf(tree))