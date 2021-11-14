/*
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
*/

// 暴力解法
function minSubArrayLen(target, array) {
  const length = array.length
  if(!length) return 0
  let min = Infinity
  for(let i=0; i<length; i++) {
    let sum = 0
    for(let j=i; j<length; j++) {
      sum += array[j]
      if(sum >= target) {
        min = Math.min(min, j-i+1)
        break
      }
    }
  }
  return min === Infinity ? 0 : min
}

console.log(minSubArrayLen(7, [2,3,1,2,4,3]))

// 滑动窗口
function minSubArrayLen2 (target, array) {
  const length = array.length
  if(!length) return 0
  let min = Infinity
  let start = end = 0
  let sum = 0

  while(end < length) {
    sum += array[end]
    while(sum >= target) {
      min = Math.min(min, end-start+1)
      sum -= array[start++]
    }
    end++
  }

  return min === Infinity ? 0 : min
}

function minSubArrayLen2 (target, array) {
  const length = array.length
  if(!array.length) return 0
  let min = Infinity
  let start = end = 0
  let sum = 0

  while (end < length) {
    sum += array[end]

    while(sum >= target) {
      min = Math.min(min, end-start+1)
      sum -= array[start++]
    }

    end++
  }

  return min === Infinity ? 0 : min
}

console.log(minSubArrayLen2(11, [1,1,1,1,1,1,1,1]))