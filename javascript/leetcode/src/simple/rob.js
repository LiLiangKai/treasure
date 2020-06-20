/**
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

示例 1:

输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 。
示例 2:

输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/house-robber
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
* @param {number[]} nums
* @return {number}
*/
var rob = function ( nums ) {
  return getRob( nums )
};

function getRob ( nums ) {
  if ( !nums.length ) return 0
  if ( nums.length <= 2 ) return Math.max( ...nums )
  var n1 = nums[ 0 ] + getRob( nums.slice( 2 ) )
  var n2 = nums[ 1 ] + getRob( nums.slice( 3 ) )
  return Math.max( n1, n2 )
}

function getRob2 (nums) {
  if ( !nums.length ) return 0
  if ( nums.length <= 2 ) return Math.max( ...nums )
  var first = nums[0]
  var second = Math.max(nums[0], nums[1])
  for(let i=2; i<nums.length; i++) {
    var tmp = second
    second = Math.max(first + nums[i], second)
    first = tmp
  }
  return second
}

/*
[2,7,9,3,1]
first = 2
second = 7
----------
i=2
tmp = second = 7
second = Math.max(first+9, second) = Math.max(2+9, 7) = 11
first = 7
-----
i=3
tmp = second = 11
second = Math.max(first+3, 11) = Math.max(10, 11) = 11
first = 11
-------
i=4
tmp = second = 11
second = Math.max(first+1, 11) = 12
first = 11
*/