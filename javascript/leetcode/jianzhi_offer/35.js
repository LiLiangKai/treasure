/*
第一个只出现一次的字符
在字符串中找出第一个只出现一次的字符，例如：abaccddeff，输出：b
*/

function firstUniqChar (str) {
  if(!str.length) return ' '
  const map = {}
  for(let i=0; i<str.length; i++) {
    const char = str[i]
    map[char] = map[char] || 0
    map[char]++
  }

  console.log( map )
  // for(let i=0; i<str.length; i++) {
  //   if(map[str[i]] === 1) return str[i]
  //   continue
  // }
  for(const char in map) {
    if(map[char] === 1) return char
    continue
  }
  return ' '
}

console.log( firstUniqChar( '' ) )
console.log( firstUniqChar( 'abaccddeff' ) )
console.log( firstUniqChar( 'abcabce' ) )