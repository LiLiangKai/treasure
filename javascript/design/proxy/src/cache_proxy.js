// 计算斐波那契数列，不实用缓存代理
// function fibonacci(num) {
//   if(num === 1 || num === 2) return 1
//   return fibonacci( num - 1 ) + fibonacci( num - 2 )
// }

// console.time('fibonacci')
// console.log( '20: ', fibonacci(20))
// console.timeEnd('fibonacci')
// 平均耗时7ms左右

const fibonacci = (function () {
  const cache = {}
  return (num) => {
    if(num === 1 || num === 2) return 1
    if ( !cache[ num ]) {
      const result = fibonacci( num - 1 ) + fibonacci( num - 2 )
      cache[num] = result
    }
    return cache[num]
  }
})()

console.time( 'fibonacci' )
console.log( '5: ', fibonacci( 20 ) )
console.timeEnd( 'fibonacci' )
// 平均耗时5ms左右