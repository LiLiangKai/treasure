/*
给你一个非负整数数组 nums ，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。你的目标是使用最少的跳跃次数到达数组的最后一个位置。假设你总是可以到达数组的最后一个位置。

示例 1:

输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
示例 2:

输入: nums = [2,3,0,1,4]
输出: 2
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function ( nums ) {
  const length = nums.length;
  let end = 0;
  let maxPosition = 0; 
  let steps = 0;
  for ( let i = 0; i < length - 1; i++) {
    maxPosition = Math.max( maxPosition, i + nums[ i ] );
    if ( i == end ) {
      end = maxPosition;
      steps++;
    }
  }
  return steps;
};

console.time('jump')
console.log( jump( [ 5, 6, 4, 4, 6, 9, 4, 4, 7, 4, 4, 8, 2, 6, 8, 1, 5, 9, 6, 5, 2, 7, 9, 7, 9, 6, 9, 4, 1, 6, 8, 8, 4, 4, 2, 0, 3, 8, 5 ]))
console.timeEnd( 'jump' )
/*
length = 39
end = 0
maxPosition = 0
steps = 0

i=0
maxPosition = Math.max(0, 0+5) = 5
i === end ? (end = 5, steps=1)

i=1
maxPosition = Math.max(5, 1+6) = 7

i=2
maxPosition = Math.max(7, 2+4) = 7

i=3
maxPosition = Math.max(7, 3+4) = 7

i=4
maxPosition = Math.max(7, 4+6) = 10

i=5
maxPosition = Math.max(10, 5+9) = 14
i = end ? (end = 15, steps=2)
*/