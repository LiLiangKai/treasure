/** 冒泡排序 */

module.exports = bubbleSort

function bubbleSort ( array ) {
  const length = array.length
  for ( let i = 0; i < length - 1; i++ ) {
    let hasBubble = false
    for ( let j = 0; j < length - 1 - i; j++ ) {
      if(array[j] > array[j+1]) {
        let t = array[ j + 1 ]
        array[ j + 1 ] = array[ j ]
        array[ j ] = t
        hasBubble = true
      }
    }
    if ( !hasBubble ) break
  }
  return array
}

// console.log(bubbleSort([29, 10, 14, 37, 10]))

function bubbleSort2 (array = []) {
  const length = array.length
  for ( let i = 0; i < length - 1; i++ ) {
    let hasBubble = false
    for(let j=0; j<length-1-i; j++) {
      if(array[j] > array[j+1]) {
        const temp = array[j+1]
        array[j+1] = array[j]
        array[ j ] = temp
        hasBubble = true
      }
    }
    if ( !hasBubble ) break
  }
  return array
}

// console.log( bubbleSort2( [ 29, 10, 14, 37, 10 ] ) )

function bubbleSort3 (array = []) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let hasBubble = false
    for(let j=0; j<length-1-i; j++) {
      if(array[j] > array[j+1]) {
        const tmp = array[j+1]
        array[j+1] = array[j]
        array[j] = tmp
        hasBubble = true
      }
    }
    if(!hasBubble) break
  }
  return array
}

// console.log( bubbleSort3( [ 10, 14, 10, 29, 37 ] ) )

function bubbleSort4 (array = []) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let hasBubble = false
    for(let j=0; j<length-1-i; j++) {
      if(array[j] > array[j+1]) {
        const temp = array[j]
        array[j] = array[j+1]
        array[j+1] = temp
        hasBubble = true
      }
    }
    if(!hasBubble) break
  }
  return array
}

// console.log( bubbleSort4( [ 10, 14, 10, 89, 29, 37 ] ) )

function bubbleSort5 (array = []) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let hasBubble = false
    for(let j=0; j<length-i-1; j++) {
      if(array[j] > array[j+1]) {
        const tmp = array[j+1]
        array[j+1] = array[j]
        array[j] = tmp
        hasBubble = true
      }
    }
    if(!hasBubble) break
  }
  return array
}

// console.log( bubbleSort5( [ 10, 14, 10, 89, 29, 37 ] ) )

function bubbleSort6(array = []) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let hasBubble = false
    for(let j=0; j<length-i-1; j++) {
      if(array[j] > array[j+1]) {
        const tmp = array[j+1]
        array[j+1] = array[j] 
        array[j] = tmp
        hasBubble = true
      }
    }
    if(!hasBubble) break
  }
  return array
}

// console.log( bubbleSort6( [ 10, 14, 10, 89, 29, 37 ] ) )

function bubbleSort7(array = []) {
  const length = array.length
  for(let i=0; i<length; i++) {
    let isBubble = false
    for(let j=0; j<length-1-i; j++) {
      if(array[j] > array[j+1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]]
        isBubble = true
      }
    }
    if(!isBubble) break
  }
  return array
}