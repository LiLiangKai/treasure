/*
给定字典中的两个词，长度相等。写一个方法，把一个词转换成另一个词， 但是一次只能改变一个字符。每一步得到的新词都必须能在字典中找到。

编写一个程序，返回一个可能的转换序列。如有多个可能的转换序列，你可以返回任何一个。

示例 1:

输入:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

输出:
["hit","hot","dot","lot","log","cog"]
示例 2:

输入:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

输出: []

解释: endWord "cog" 不在字典中，所以不存在符合要求的转换序列。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-transformer-lcci
*/

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[]}
 */
var findLadders = function ( beginWord, endWord, wordList ) {
  const letterlist = wordList.reduce((list, word) => {
    for(let i=0; i<word.length; i++) {
      const char = word.charAt( i )
      list[ i ] = list[ i ] || []
      !list[ i ].includes(char) && list[i].push(char)
    }
    return list
  }, [])
  console.log(letterlist)

  function backtrack (level = 0, nextWord, path = []) {
    console.log(path)
    if ( nextWord === endWord) {
      return
    }
    if(level === letterlist.length) return
    const list = letterlist[level]
    for(let i=0; i<list.length; i++) {
      const char = list[i]
      if(nextWord.charAt(level) === char) {
        backtrack(level+1, nextWord, path)
      } else {
        const old = nextWord
        nextWord = nextWord.slice(0, level) + char + nextWord.slice(level)
        path.push(nextWord)
        backtrack(level+1, nextWord, path)
        nextWord = old
        path.pop()
      }
    }
  }

  backtrack(0, beginWord, [])
  
};

console.log( findLadders( 'hit', 'cog', [ "hot", "dot", "dog", "lot", "log", "cog" ]))