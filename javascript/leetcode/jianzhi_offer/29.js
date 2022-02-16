/*
输入一个数值数组，数组中有一个数值出现的次数超过数组长度的一半，请找出这个数值。
例如输入：[1,2,3,2,2,2,4,5,2]，输出2
*/

/**
 * 
 * @param {Number[]} nums 
 */
function moreThanHalfNumber (nums = []) {
  if(!nums.length) return
  let num = nums[0]
  let count = 1
  for(let i=1; i<nums.length; i++) {
    const n = nums[i]
    if(count === 0) {
      num = n
      count = 1
      continue
    }
    if(n === num) count++
    else count--
  }
  if (checkIsMoreThanHalf(nums, num)) return num
  return
}

function checkIsMoreThanHalf (nums, n) {
  let i=0, j=nums.length-1
  let count = 0
  while(i <= j) {
    if(nums[i] === n) count++
    if(nums[j] === n && j !== i) count++
    i++
    j--
  }
  return count >= (nums.length>>1)
}

console.log(checkIsMoreThanHalf([1,2,3,2,2,2,4,5,2], 2))
console.log(moreThanHalfNumber([1,2,3,2,2,2,4,5,2]))
console.log(moreThanHalfNumber([1,2,3,2,2,4,5]))