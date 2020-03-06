/**
 * 2019/9/9
 * 深度拷贝
 */

 /* 支持数据和对象的深度克隆 */
function clone(target) {
  if(typeof target === 'object') {
    const result = Array.isArray(target) ? [] : {}
    for(key in target) {
      result[ key ] = clone( target[ key ] )
    }
    return result
  } else {
    return target
  }
}

function forEach ( array = [], iteratee ) {
  let index = -1
  const length = array.length
  while(++index < length) {
    iteratee(array[index], index, array)
  }
  return array
}

/** 在clone的基础上，优化了数组/对象的遍历 */
function clone2 (target) {
  if(typeof target === 'object') {
    const isArray = Array.isArray(target)
    const result = isArray ? [] : {}
    const keys = isArray ? undefined : Object.keys(target)
    forEach(keys || target, (value, key) => {
      if(keys) {
        key = value
      } 
      result[key] = clone2(target[key])
    })
    return result
  } else {
    return target
  }
}

function clone3 (target, map = new WeakMap()) {
  if ( typeof target === 'object' ) {
    if ( map.get( target ) ) {
      return map.get( target )
    }

    const isArray = Array.isArray( target )
    const result = isArray ? [] : {}
    const keys = isArray ? undefined : Object.keys( target )

    map.set( target, result )

    forEach( keys || target, ( value, key ) => {
      if ( keys ) {
        key = value
      }
      result[ key ] = clone2( target[ key ], map )
    } )
    
    return result
  } else {
    return target
  }
}

module.exports = { clone, clone2, clone3 }