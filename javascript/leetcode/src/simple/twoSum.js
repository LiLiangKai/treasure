/*
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。



示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function ( nums, target ) {
  const numbers = [...nums]
  for(let i=numbers.length-1; i>=0; i--) {
    const n = numbers.pop()
    const tmp = target - n
    const idx = numbers.indexOf(tmp)
    if(idx > -1) return [idx, i]
  }
  return []
};

console.time('start')
console.log( twoSum( [ -3, 4, 3, 90, 3, 5,10, -42, -6, 6, 12 ], 13 ) )
console.timeEnd('start')

var twoSum_2 = function (array, target) {
  const map = {}
  for(let i=0; i<array.length; i++) {
    const val = array[i]
    const d = target - val
    if(map[d] !== undefined && map[d] !== null) {
      return [map[d], i]
    } else {
      map[val] = i
    }
  }
  return []
}

console.time( 'start' )
console.log( twoSum_2( [ -3, 4, 3, 90, 3, 5, 10, -42, -6, 6, 12 ], 13 ) )
console.timeEnd( 'start' )

/*

给定一个已按照升序排列 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

说明:

返回的下标值（index1 和 index2）不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。
示例:

输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

*/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function ( numbers, target ) {
  let last = 0
  let high = numbers.length - 1
  if(numbers[0] > target) return []
  while (last < high) {
    const sum = numbers[last] + numbers[high]
    if(sum === target) {
      return [last+1, high+1]
    }
    sum < target ? last++ : high--
  }
  return []
};

// console.time( 'start2' )
// console.log( twoSum2( [ 2, 7, 11, 15 ], 9 ) )
// console.timeEnd( 'start2' )
