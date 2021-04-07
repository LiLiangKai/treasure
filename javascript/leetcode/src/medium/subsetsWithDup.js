/*
给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。



示例 1：

输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
示例 2：

输入：nums = [0]
输出：[[],[0]]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function ( nums ) {
  nums = nums.sort( ( a, b ) => a - b )
  const record = {
    0: [[]]
  }
  for(let i=1; i<=nums.length; i++) {
    record[i] = record[i-1].concat(record[i-1].map(subset => subset.concat(nums[i-1])))
  }
  return record[nums.length]
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function ( nums ) {
  nums = nums.sort( ( a, b ) => a - b )
  
};


/*
[1,2,2,3]

n=0 => [[], [1]]
n=1 => [[],[1], [2],[1,2]]
n=2 => [[],[1],[2],[1,2],[2,2],[1,2,2]]
n=3 => [[],[1],[2],[1,2],[2,2],[1,2,2], [3],[1,3],[2,3],[1,2,3],[2,2,3],[1,2,2,3]]

  [1]            [1, 1]
 /   \           /    \
[]   [1]        []    [1]
                       |
      [1,2]            [1,1] 
     /  |  \
    [] [1] [2]
        |
        [1,2]
        
            [1,2,2]
          /  |  |  \ 
        [] [1] [2]
           / \  /
        [1,2]   [2,2]
         |
        [1,2,2] 

            [1,2,2,2]
          /  |  |  \
        [] [1] [2]
           / \   \
        [1,2]     [2,2]
         |            \
        [1,2,2]       [2,2,2]
         |
        [1,2,2,2] 

dup 1 => 1 2n-1
dup 2 => 3 
dup 3 => 5
*/