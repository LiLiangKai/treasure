/*
输入一个字符串，输出该字符串中字符的所有排列。
例如输入字符串abc，则输出字符a、b、c的所能排列出来的所有字符串：abc、acb、bac、bca、cab、cba
*/

function permutation (str) {
  const result = []
  if(!str) return result

  function backtrack (used = new Map(), path=[]) {
    if(path.length === str.length) {
      const s = path.join('')
      if(!used.has(s)) {
        result.push(s)
        used.set(s, true)
      }
      return
    }

    for(let i=0; i<str.length; i++) {
      if(used.has(i)) continue
      const char = str[i]
      path.push(char)
      used.set(i, true)
      backtrack(used, path)
      path.pop()
      used.delete(i)
    }
  }

  backtrack()
  return result
}

console.log( permutation( '' ) )
console.log( permutation( 'abc' ) )
console.log( permutation( 'abb' ) )
console.log( permutation( 'abbadd' ) )