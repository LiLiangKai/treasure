/*
实现一个函数，输入两个整数字符串，输出这两个整数相加的和
*/

/**
 * 
 * @param {String} n1 
 * @param {String} n2 
 */
function sum (n1, n2) {
  const arr1 = n1.split( '' ).reverse()
  const arr2 = n2.split( '' ).reverse()
  const result = []
  let flag = 0
  const length = Math.max(arr1.length, arr2.length)
  for(let i=0; i<length; i++) {
    let num = flag + Number(arr1[i]||0) + Number(arr2[i]||0)
    if(num > 9) {
      flag = 1
      num %= 10
    } else {
      flag = 0
    }
    result[i] = num
  }
  if(flag === 1) {
    result[result.length] = flag
  }
  return result.reverse().join('')
}

console.log( sum( '0', '0' ) )
console.log( sum( '', '123' ) )
console.log( sum( '999', '123' ) )
console.log( sum( '9876543210', '1234567890' ) )
console.log( sum( '98765432109876543210', '12345678901234567890' ) )
console.log( sum( '11111111111111111111', '98888888888888888889' ) )