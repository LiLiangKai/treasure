/*
斐波那契数列
*/

function fib (n) {
  const dp = [1,1]
  for(let i=2; i<=n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n]
}

console.log( fib( 1 ) )
console.log( fib( 2 ) )
console.log( fib( 3 ) )
console.log( fib( 4 ) )
console.log( fib( 5 ) )
console.log( fib( 10 ) )