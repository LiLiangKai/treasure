const target = []

const targetProxy = new Proxy(target, {
  set: (target, key, value) => {
    const index = Number( key )
    if ( !isNaN( index ) && typeof value === 'number') {
      target[key] = value
    }
    return value === false ? -1 : value
  }
})

targetProxy[0] = 1
targetProxy[1] = 2
targetProxy[2] = 2
targetProxy['a'] = 3
targetProxy[2] = 'abc'
targetProxy.push( 3 )
targetProxy.push( 'a' )
targetProxy.push( true )
targetProxy.push( false )
targetProxy.push( { a: 1 } )
console.log(targetProxy) // [1, 2, 2, 3]
