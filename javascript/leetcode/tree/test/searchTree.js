const tree = [
  {
    name: 'A',
    children: [
      {
        name: 'AB',
        children: [
          {
            name: "CD",
            children: [
              {
                name: "EF"
              }
            ]
          },
          {
            name: "ABC"
          }
        ]
      },
      {
        name: 'BA'
      }
    ]
  },
  {
    name: 'B',
    children: [
      {
        name: 'BB'
      },
      {
        name: 'BAC'
      }
    ]
  },
  {
    name: 'C',
    children: [
      {
        name: 'CAB'
      },
      {
        name: 'BCA'
      }
    ]
  }
]

/*
//输入 AB
[
  {
    name: 'A',
    children: [
      {
        name: 'AB'
      }
    ]
  }
]

//输入C
[
  {
    name: 'C',
    children: [
      {
        name: 'CAB'
      },
      {
        name: 'BCA'
      }
    ]
  }
]
*/

function deepSearchTree (root, name) {
  if(!root) return null

  function deep (root, parent) {
    if(!root) return null
    // if(root.name !== name) {
    //   node = deepSearchTree( root.children, name )
    // }
    // if(node) {
    //   if(!parent) return root
    //   parent = {...parent, children: []}
    //   parent.children.push(root)
    // }
    if(root.name === name) return root
    parent = { ...parent, children: [] }
    if(root.children) {
      for(let i=0; i<root.children.length; i++ ){
        const child = root.children.length
        
      }
    }
    return parent
  }

  if(root.name === name) return root
  if ( root.children ) {
    for ( const child of root.children ) {
      const result = deep( child, root )
      if ( result ) return result
    }
  }
  return null
}

function searchTree (tree, name) {
  const result = []
  for(let i=0; i<tree.length; i++) {
    const root = deepSearchTree(tree[i])
    root && result.push(root)
  }
  return result
}

console.log(JSON.stringify(searchTree(tree, 'CD')))