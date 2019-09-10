/**
 * 2019/9/9
 * 深度拷贝
 */

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

module.exports = { clone, clone2 }