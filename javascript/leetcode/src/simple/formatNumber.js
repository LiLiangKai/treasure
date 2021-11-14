/*
给一个数字，123000123，
输出 123，000，123 字符串
*/

function formatNumber (number) {
  if(number === undefined) return ''
  const str = String(number)
  let i = str.length
  let result = []
  while(i > 0) {
    result.unshift(str.slice(Math.max(0, i-3), i))
    i -= 3
  }
  return result.join(',')
}