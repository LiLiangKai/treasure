/*
请实现一个函数，把字符串中的每个空格替换成 “%20”，例如输入：“We are happy”，则输出：”We%20are%20happy“
*/

/**
 * 
 * @param {string} str 
 * @returns {string}
 */
function replaceBlank (str) {
  if(!str) return str
  let result = ''
  let i = str.length-1
  while(i >= 0) {
    const char = str.charAt(i)
    result = (char === ' ' ? '%20' : char) + result
    i--
  }
  return result
}

console.log( replaceBlank( 'We are happy' ) )
console.log( replaceBlank( 'We  are happy' ) )