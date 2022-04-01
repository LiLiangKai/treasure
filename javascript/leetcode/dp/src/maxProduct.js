/*
给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 32-位 整数。

子数组 是数组的连续子序列。

 

示例 1:

输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
示例 2:

输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-product-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function ( nums ) {
  if(!nums || !nums.length) return
  const dp = new Array(nums.length).fill(0).map(() => new Array(nums.length).fill(-Infinity))
  dp[0][0] = dp[0][1] = nums[0]
  let result = nums[0]
  for(let i=1; i<nums.length; i++) {
    const n = nums[i]
    dp[i][0] = Math.min(dp[i-1][0]*n, dp[i-1][1]*n, n)
    dp[i][1] = Math.max(dp[i-1][0]*n, dp[i-1][1]*n, n)
    result = Math.max(result, dp[i][0], dp[i][1])
  }
  return result
};

var maxProduct2 = function ( nums ) {
  if(!nums || !nums.length) return
  let prevMin = prevMax = nums[0]
  let result = nums[0]
  for(let i=1; i<nums.length; i++) {
    const n = nums[i]
    const curMin = Math.min(prevMin*n, prevMax*n, n)
    const curMax = Math.max(prevMin*n, prevMax*n, n)
    prevMin = curMin
    prevMax = curMax
    result = Math.max(result, curMax, curMin)
  }
  return result
};

// console.log( maxProduct2( [ 2, 3, -2, 4,-2 ] ) )
// console.log( maxProduct2( [ -2, 0, -4 ] ) )

function getMaxSubArr ( arr ) {
  const firstVal = arr[ 0 ]
  let prev = {
    maxVal: firstVal,
    maxArray: [ firstVal ],
    minVal: firstVal,
    minArray: [ firstVal ]
  }
  let resultVal = prev.maxVal
  let result = prev.maxArray


  for ( let i = 1; i < arr.length; i++ ) {
    let currentObj = {}
    const current = arr[ i ]
    const lastMinVal = current * prev.minVal
    const lastMaxVal = current * prev.maxVal

    const minVal = Math.min( lastMaxVal, lastMinVal, current )
    const maxVal = Math.max( lastMaxVal, lastMinVal, current )

    currentObj.minVal = minVal
    if ( minVal === lastMinVal ) {
      currentObj.minArray = prev.minArray.concat( current )
    } else if ( minVal === lastMaxVal ) {
      currentObj.minArray = prev.maxArray.concat( current )
    } else {
      currentObj.minArray = [ current ]
    }

    currentObj.maxVal = maxVal
    if ( maxVal === lastMinVal ) {
      currentObj.maxArray = prev.minArray.concat( current )
    } else if ( maxVal === lastMaxVal ) {
      currentObj.maxArray = prev.maxArray.concat( current )
    } else {
      currentObj.maxArray = [ current ]
    }

    if ( currentObj.maxVal >= resultVal ) {
      if ( currentObj.maxVal > resultVal || result.length < currentObj.maxArray.length ) {
        result = currentObj.maxArray
      }
      resultVal = currentObj.maxVal
    }
    prev = currentObj
  }
  return result
}
// console.log( getMaxSubArr( [ 1, 1, 1, 1, 1 ] ) )
// console.log( getMaxSubArr( [ 1, 2, 3, -1, 4, -5,6 ] ) )


function getMaxSubArr2 (arr) {
  const dp = new Array(arr.length).fill(0).map(() => new Array(arr.length).fill(0))
  for(let i=0; i<arr.length; i++) {
    dp[i][i] = arr[i]
  }
  let start=end=0
  let result = arr[0]
  for(let i=0; i<arr.length-1; i++) {
    for(let j=i+1; j<arr.length; j++) {
      dp[i][j] = dp[i][j-1] * arr[j]
      if(dp[i][j] > result) {
        result = dp[i][j]
        start=i
        end=j
      }
    }
  }
  return arr.slice(start, end+1)
}

// console.log( getMaxSubArr2( [ 1, 2, 3, -1, 4, 5 ] ) )
// console.log( getMaxSubArr2( [ 1, 2, 3, -1, 4, 5, -1 ] ) )
// console.log( getMaxSubArr2( [ 1, 1, 1, 1, 1, 1 ] ) )
// console.log( getMaxSubArr2( [ 1, 1, 1, 2, 1, 3 ] ) )
// console.log( getMaxSubArr2( [ 1, 6, -1, 2, -1, -3 ] ) )

function getMaxSubArr3 (arr) {
  const dp = new Array(arr.length).fill(0)
  let start = end = 0
  let result = arr[ 0 ]
  for(let i=0; i<arr.length; i++) {
    dp[i] = arr[i]
    if ( dp[i] > result ) {
      result = dp[ i ]
      start = end = i
    }
    for(let j=i+1; j<arr.length; j++) {
      dp[j] = arr[j] * dp[j-1]
      if(dp[j] > result) {
        result = dp[j]
        start = i
        end = j
      }
    }
  }
  return arr.slice(start, end+1)
}

// console.log( getMaxSubArr3( [ 1, 1, 1, 3, -1, 5 ] ) )
// console.log( getMaxSubArr3( [ 1, 2, 3, -1, 4, 5 ] ) )
// console.log( getMaxSubArr3( [ 1, 2, 3, -1, 4, 5, -1 ] ) )
// console.log( getMaxSubArr3( [ 2,2,2,2,2 ] ) )
// console.log( getMaxSubArr3( [ 1, 1, 1, 2, 1, 3 ] ) )
// console.log( getMaxSubArr3( [ 1, 6, -1, 2, 3 ] ) )

/*
    2   3   -2  4
 2  2   
 3  6   3
-2 -12 -6   -2
 4 -48 -24  -8  4
*/


function minTransferCount (source, target) {
  let result = Infinity
  const operates = {
    '+1': (n) => n+1,
    '*2': (n) => n<<1
  }

  function backtrack (source, target, path = []) {
    if(source[0] === target[0] && source[1] === target[1]) {
      if(path.length < result) {
        result = path.length
      }
      return
    }
    if(source[0] > target[0] || source[1] > target[1]) {
      return
    }
    for(const key in operates) {
      const originSource = [...source]
      path.push(key)
      source = source.map(operates[key])
      if(source[0] <= target[0] && source[1] <= target[1]) {
        backtrack(source, target, path)
      }
      path.pop()
      source = originSource
    }
  }

  backtrack(source, target)
  return result === Infinity ? -1 : result
}

console.log(minTransferCount([1,1], [1,1]))
