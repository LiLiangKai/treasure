/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 */
 
function threeSum (array = []) {
  const length = array.length
  const result = []
  array = array.sort((a, b) => a-b)
  for(let i=0; i<length-2; i++) {
    const val = array[i]
    let left = i+1  // 左指针
    let right = length - 1 // 右指正

    if(i>0 && val === array[i-1]) continue // 重复的数，跳过

    while(left < right) {
      const sum = val + array[ left ] + array[ right ]
      if ( sum === 0) { // 三数相加为0
        result.push([val, array[left], array[right]])
        left++
        right--
        while(left<right && array[left] === array[left-1]) left++
        while( left < right && array[right] === array[right+1]) right--
      } else if(sum < 0) { 
        // 三数相加小于0，左指针前进
        left++
        while ( left < right && array[ left ] === array[ left - 1 ] ) left++
      } else {
        // 三数相加大于0，右指针后退
        right--
        while ( left < right && array[ right ] === array[ right + 1 ] ) right--
      }
    }
  }
  return result
} 

function threeSum_2 ( nums ) {
  let res = []
  for ( let i = 0; i < nums.length - 2; i++ ) { // 每个人
    for ( let j = i + 1; j < nums.length - 1; j++ ) { // 依次拉上其他每个人
      for ( let k = j + 1; k < nums.length; k++ ) { // 去问剩下的每个人
        if ( nums[ i ] + nums[ j ] + nums[ k ] === 0 ) { // 我们是不是可以一起组队
          res.push( [ nums[ i ], nums[ j ], nums[ k ] ] )
        }
      }
    }
  }
  return res
}


function main () {
  const array = randomArray()

  console.time( 'three sum' )
  console.log( threeSum( array ).length )
  console.timeEnd( 'three sum' )

  // console.time( 'three sum_2' )
  // console.log( threeSum_2( array ).length )
  // console.timeEnd( 'three sum_2' )
}

function randomArray ( count = 10000 ) {
  const array = []
  for ( let i = 0; i < count; i++ ) {
    const rnum = Math.ceil( Math.random() * count - count/2 )
    array.push( rnum )
  }
  return array
}

main()