/*
题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 
示例1：
输入: coins = [1, 2, 5], amount = 11
输出: 3

示例2：
输入: coins = [2], amount = 3
输出: -1
*/

function coinChange (coins, amount) {
  
  function dp (amount) {
    if(amount === 0) return 0
    if(amount < 0) return -1
    let min = Infinity
    for(let coin of coins) {
      const sub = dp( amount - coin )
      if(sub === -1) continue
      min = Math.min( min, sub+1)
    }
    return min === Infinity ? -1 : min
  }

  return dp(amount)
}

function coinChange2 (coins, amount) {
  const dp = new Array(amount+1).fill(Infinity)
  dp[0] = 0
  for(let i=1; i<=amount; i++) {
    for(let coin of coins) {
      if(i - coin < 0) continue
      dp[i] = Math.min(dp[i], dp[i-coin]+1)
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]
}

// console.time('coinChange')
// console.log( coinChange( [ 1, 2, 5 ], 11 ) )
// console.timeEnd('coinChange')

// console.time( 'coinChange' )
// console.log( coinChange2( [ 1, 2, 5 ], 11 ) )
// console.timeEnd( 'coinChange' )

// console.log( coinChange( [ 2 ], 3 ) )
// console.log( coinChange2( [ 2 ], 3 ) )
console.log( coinChange( [ 2, 5, 10, 1 ], 27 ) )
console.log( coinChange2( [ 2, 5, 10, 1 ], 27 ) )
/*

                        11
                    /   |    \ 
                  10    9    6
              /  |  \       / | \
            9   8  5       5  4  1
          / | \         / | \
         8  7  4       4  3  0
      / | \         / | \
     7  6  3       3  2  -1

f(n)     
|- n=0 => f(n)=0
|- n<0 => f(n)=-1
|- f(n) = min(f(n-coin[0])+1, f(n-coin[1])+1, ..., f(n-coin[cn])+1)
*/