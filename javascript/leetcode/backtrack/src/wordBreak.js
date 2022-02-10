/*
给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。

说明：

分隔时可以重复使用字典中的单词。
你可以假设字典中没有重复的单词。
示例 1：

输入:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]
输出:
[
  "cats and dog",
  "cat sand dog"
]
示例 2：

输入:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
输出:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
解释: 注意你可以重复使用字典中的单词。
示例 3：

输入:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]
输出:
[]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-break-ii
*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function ( s, wordDict ) {
  const result = []
  const length = s.length

  function backtrack (start=0, path=[]) {
    if(start === length) {
      result.push(path.join(' '))
      return
    }
    for(let i=start; i<length; i++) {
      const sub = s.slice(start, i+1)
      if(wordDict.indexOf(sub) === -1) continue
      path.push(sub)
      backtrack(i+1, path)
      path.pop()
    }
  }

  backtrack()

  return result
};

console.log( wordBreak( 'catsanddog', [ "cat", "cats", "and", "sand", "dog" ]))
console.log( wordBreak( 'pineapplepenapple', [ "apple", "pen", "applepen", "pine", "pineapple" ]))
console.log( wordBreak( 'catsandog', [ "cats", "dog", "sand", "and", "cat" ]))