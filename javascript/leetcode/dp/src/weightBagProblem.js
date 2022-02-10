/*
背包最大重量为4。

物品为：

     重量w	价值v
物品0	  1	   15
物品1	  3	   20
物品2	  4	   30
问背包能背的物品最大价值是多少？

 dp  0  |  1  |  2  |  3  |  4   重量j     
   |------------------------------ 
 0 | 0  | 15  | 15  | 15  | 15  
 1 | 0  | 15  | 15  | 20  | 35
 2 | 0  | 15  | 15  | 20  | 35
物品i 

dp[i][j] = max(dp[i-1][j], dp[i][j-w[i]]+v[i])
*/

function weightBagProblem (weight, value, size) {
  const dp = Array(weight.length).fill(0).map(() => Array(size+1).fill(0))
  for(let j=weight[0]; j<=size; j++) {
    dp[0][j] = value[0]
  }
  for(let i=1; i<weight.length; i++) {
    for(let j=0; j<=size; j++) {
      if(j < weight[i]) {
        dp[i][j] = dp[i-1][j]
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-weight[i]]+value[i])
      }
    }
  }
  console.log(dp)
  return dp[weight.length-1][size]
}

weightBagProblem([1,3,4], [15,20,30], 4)