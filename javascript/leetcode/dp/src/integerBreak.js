/*
给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

示例 1:

输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
示例 2:

输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
说明: 你可以假设 n 不小于 2 且不大于 58。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/integer-break
*/

/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function ( n ) {

};

/*
dp[i]    1<= i <= n


n

2  => 1x1 = 1

3  => 1x2 = 2

4  => 2x2 = 4

5  => 2x3 = 6

6  => 3x3 = 9

7  => 2x3x2 = 12

8  => 2x3x3 = 18

9  => 2x3x4 = 24

10 => 3x3x4 =>36
*/