function TreeNode (key, value, p = null) {
  this.key = key
  this.value = value
  this.p = p
  this.left = this.right = null
}

function putNode (n, key, value, p) {
  if(!n) {
    return new TreeNode(key, value, p)
  }
  if(n.key === key) {
    n.value = value
  } else if(n.key > key) {
    n.left = putNode(n.left, key, value, n)
  } else {
    n.right = putNode(n.right, key, value, n)
  }
  return n
}

function inorder (n, record = []) {
  if(!n) return record
  inorder(n.left, record)
  record.push(n.key)
  inorder(n.right, record)
}

class BST {
  root = null

  constructor () {}

  put (key, value = undefined) {
    // this.root = putNode(this.root, key, value, null)
    let p
    let node = this.root
    while(node !== null) {
      p = node
      if (node.key === key) {
        node.value = value
        return
      } else if(node.key > key) {
        node = node.left
      } else {
        node = node.right
      }
    }

    const newNode = new TreeNode( key, value, p)
    if(!p) {
      this.root = newNode
    } else if(p.key < newNode.key) {
      p.right = newNode
    } else {
      p.left = newNode
    }
  }

  /**
   * 
   * @param {TreeNode} oldNode 
   * @param {TreeNode} newOld 
   */
  _transplant (oldNode, newOld) {
    if(oldNode.p === null) {
      this.root = newOld
    } else if(oldNode.p.left === oldNode) {
      oldNode.p.left = newOld
    } else {
      oldNode.p.right = newOld
    }
    if(newOld !== null) {
      newOld.p = oldNode.p
    }
  }

  delete (key) {
    const node = this.search(key)
    if(!node) return
    if(!node.left) {
      // 如果要删除的结点的左孩子为空，则用右孩子替换待删除的结点
      this._transplant(node, node.right)
    } else if(!node.right) {
      // 如果要删除的结点的右孩子为空，则用左孩子替换待删除的结点
      this._transplant(node, node.left)
    } else {
      // 获取删除的结点的后继结点
      const successorNode = this.min(node.right)
      if(successorNode.p !== node) {
        // 后继结点的父结点不是待删除的阶段
        // 将后继节点与其右孩子进行替换
        this._transplant(successorNode, successorNode.right)
        successorNode.right = node.right
        successorNode.right.p = successorNode
      }
      // 用后继节点替换待删除节点
      this._transplant(node, successorNode)
      successorNode.left = node.left
      successorNode.left.p = successorNode
    }
  }

  search (key) {
    let node = this.root
    while(node) {
      if(node.key === key) {
        return node
      } else if(node.key > key) {
        node = node.left
      } else {
        node = node.right
      }
    }
    return node
  }

  min (node) {
    node = node || this.root
    while(node && node.left) {
      node = node.left
    }
    return node
  }

  max (node) {
    node = node || this.root 
    while(node && node.right) {
      node = node.right
    }
    return node
  }

  /** 前驱节点 */
  precursor (key) {
    let node = this.search( key )
    if(!node) return node
    if(node.left) {
      // 如果存在左子树，则当前节点的前驱节点是其左子树中的最大节点
      return this.max(node)
    }
    // 沿着查找路径向上查找，直到找到第一个祖先节点的左节点不等于当前节点
    let p = node.p
    while(p !== null && node === p.left) {
      node = p
      p = p.p
    }
    return p
  }

  /** 后继节点 */
  successor (key) {
    let node = this.search(key)
    if(!node) return node
    if(node.right) {
      // 如果存在右子树，则当前节点的后继节点是其右子树中的最小节点
      return this.min(node.right)
    }
    // 沿着查找路径向上查找，直到找到第一个祖先节点的右节点不等于当前节点
    let p = node.p
    while(p !== null && node === p.right) {
      node = p
      p = p.p
    }
    return p
  }

  print () {
    const record = []
    inorder(this.root, record)
    console.log(record)
  }
}

const bst = new BST()
bst.put( 5 )
bst.put( 3 )
bst.put( 1 )
bst.put( 7 )
bst.put( 10 )
bst.put( 6 )
bst.put( 4 )
bst.print()
bst.delete( 5 )
bst.print()
console.log(bst.root)