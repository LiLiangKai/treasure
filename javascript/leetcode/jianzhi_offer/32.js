/*
从1到n整数中1出现的次数
输入一个n，求从1到n这n个十进制数中1出现的次数。
例如输入12，从1到12这12个十进制数中，包含1的整数有1、10、11、12，一共出现5个1
*/

/**
 * @param {number} n
 * @return {number}
 */
var countDigitOne = function ( n ) {
  if(!n) return 0
  let count = 0
  let i=1, j = n
  while(i <= j) {
    count += computeCount(i)
    if(j !== i) count += computeCount(j)
    i++
    j--
  }
  return count
}; 

function computeCount (n) {
  let m = n
  let count = 0
  while ( m ) {
    const mod = m % 10
    if ( mod === 1 ) count++
    m = Math.floor( m / 10 )
  }
  return count
}

console.log( countDigitOne( 1 ) )
console.log( countDigitOne( 10 ) )
console.log( countDigitOne( 12 ) )
console.time('countDigitOne')
console.log( countDigitOne( 2**21 - 1 ) )
console.timeEnd('countDigitOne')