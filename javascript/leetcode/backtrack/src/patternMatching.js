/*
你有两个字符串，即pattern和value。 pattern字符串由字母"a"和"b"组成，用于描述字符串中的模式。例如，字符串"catcatgocatgo"匹配模式"aabab"（其中"cat"是"a"，"go"是"b"），该字符串也匹配像"a"、"ab"和"b"这样的模式。但需注意"a"和"b"不能同时表示相同的字符串。编写一个方法判断value字符串是否匹配pattern字符串。

示例 1：
输入： pattern = "abba", value = "dogcatcatdog"
输出： true

示例 2：
输入： pattern = "abba", value = "dogcatcatfish"
输出： false

示例 3：
输入： pattern = "aaaa", value = "dogcatcatdog"
输出： false

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/pattern-matching-lcci
*/

/**
 * @param {string} pattern
 * @param {string} value
 * @return {boolean}
 */
var patternMatching = function ( pattern, value ) {
  const result = []

  function backtrack (start = 0, path = []) {
    if(path.length === 2) {
      console.log(path)
      if(isValid(pattern, value, ...path)) {
        result.push([...path])
      }
      return
    }

    for(let i=start; i<=value.length; i++) {
      const sub = value.slice(start, i)
      path.push(sub)
      backtrack(i, path)
      path.pop()
    }
  }


  if ( !value.length && pattern.length === 1 ) return true

  backtrack()
  console.log(result)
  return !!result.length
};

/**
 * @param {string} pattern
 * @param {string} value
 * @return {boolean}
 */
function isValid (pattern, value, a, b) {
  if(!value.length && pattern.length === 1) return true
  const str = pattern.split('').map(i => i==='a' ? a : b).join('')
  return str === value && a !== b
}

console.log( patternMatching( 'baabab', 'eimmieimmieeimmiee' ) )
// console.log( patternMatching( 'abba', 'dogcatcatdog' ) )
// console.log( patternMatching( 'abba', 'dogcatcatfish' ) )
// console.log( patternMatching( 'aaaa', 'dogcatcatdog' ) )
// console.log( patternMatching( 'abba', 'dogdogdogdog' ) )
// console.log( patternMatching( 'ababa', 'dogdogcatdogdog' ) )