/*
实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:

输入: 4
输出: 2
示例 2:

输入: 8
输出: 2
说明: 8 的平方根是 2.82842...,
     由于返回类型是整数，小数部分将被舍去。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/sqrtx
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function ( x ) {
  if( x <= 0 ) return 0
  let i = 1
  let pow2 = i * i
  while(pow2 <= x) {
    if(pow2 === x) break
    i ++
    pow2 = i * i
    if(pow2 > x) return i - 1
  }
  return i
};

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt2 = function ( x ) {
  let min = 0, max = x;
  while ( min <= max ) {
    let mid = Math.floor( ( min + max ) / 2 );
    if ( mid * mid <= x && ( mid + 1 ) * ( mid + 1 ) > x ) {
      return mid;
    } else if ( mid * mid < x ) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
}

console.log(mySqrt(1))
console.log(mySqrt(2))
console.log(mySqrt(3))
console.log(mySqrt(4))
console.log(mySqrt(8))

/*

8 => 2*2*2 => 3*3 
4 => 2*2 => 2*2
16 => 
15 => 
 */

function change () {
  const now = Date.now()
  document.body.style.backgroundColor = 'red'
  while((Date.now() - now) <= 2000) {
    document.body.style.backgroundColor = 'blue'
  }
}
