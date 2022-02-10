/*
给定一个数字字符串 S，比如 S = "123456579"，我们可以将它分成斐波那契式的序列 [123, 456, 579]。

形式上，斐波那契式序列是一个非负整数列表 F，且满足：0 <= F[i] <= 2^31 - 1，（也就是说，每个整数都符合 32 位有符号整数类型）；
F.length >= 3；
对于所有的0 <= i < F.length - 2，都有 F[i] + F[i+1] = F[i+2] 成立。
另外，请注意，将字符串拆分成小块时，每个块的数字一定不要以零开头，除非这个块是数字 0 本身。

返回从 S 拆分出来的任意一组斐波那契式的序列块，如果不能拆分则返回 []。

 
示例 1：
输入："123456579"
输出：[123,456,579]

示例 2：
输入: "11235813"
输出: [1,1,2,3,5,8,13]

示例 3：
输入: "112358130"
输出: []

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/split-array-into-fibonacci-sequence
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {string} num
 * @return {number[]}
 */
var splitIntoFibonacci = function ( num ) {
  const result = []

  function backtrack (start = 0, path=[]) {
    if(start === num.length && path.length>=3) {
      result.push([...path])
      return
    }

    for(let i=start+1; i<=num.length; i++) {
      const sub = num.slice(start, i)
      if(sub !== '0' && /^0/.test(sub)) continue
      if ( Number( sub ) > 2147483647) continue
      if(path.length < 2) {
        path.push(sub)
        backtrack(i, path)
        path.pop()
      } else {
        const n1 = Number(path[path.length - 2])
        const n2 = Number(path[path.length - 1])
        if(n1+n2 === Number(sub)) {
          path.push( sub )
          backtrack( i, path )
          path.pop()
        }
      }
    }
  }
  backtrack()

  return result[0] || []
};

console.log( splitIntoFibonacci( "539834657215398346785398346991079669377161950407626991734534318677529701785098211336528511" ) )