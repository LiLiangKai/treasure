# 递归

## 爬楼梯

题目：

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例：
```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

解法：

根据题目，我们可以列出下列内容：

```
n = 1  =>  1                                  共1种
n = 2  =>  1+1、2                             共2种
n = 3  =>  1+1+1、1+2、2+1                    共3种
n = 4  =>  1+1+1+1、1+2+1、1+1+2、2+1+1、2+2   共5种
n = 5  =>  ...                                共8种 
n = 6  =>  ...                                共13种 
``` 
可以得出规律，n阶台阶爬楼梯的方法数是 `n-1` 阶台阶和 `n-2` 阶台阶爬楼梯方法的和，符合斐波那契数列。

根据斐波那契数列公式：fn(n) = fn(n-1)+fn(n-2)，其中，当n=1时，fn(1)=1；当n=2时，fn(2)=2。

代码实现：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  if(n===1) return 1
  if(n===2) return 2
  return climbStairs(n-1) + climbStairs(n-2)
};
```

存在缺陷：当n过大时，会出现内存溢出情况。针对该问题，我们可以使用缓存代理。

更新代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  return recursion(n)
};

var recursion = (function(){
  var cache={}
  return function d(n){
    if(n===1) return 1
    if(n===2) return 2
    if(!cache[n]) {
      var count =  d(n-1) + d(n-2)
      cache[n] = count
    }
    return cache[n]
  }
})()
```

题目链接：[爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)