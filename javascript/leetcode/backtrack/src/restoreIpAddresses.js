/*
有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你不能重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

示例 1：
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]

示例 2：
输入：s = "0000"
输出：["0.0.0.0"]

示例 3：
输入：s = "1111"
输出：["1.1.1.1"]

示例 4：
输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]

示例 5：
输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/restore-ip-addresses
*/

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function ( s ) {
  const result = []

  function backtrack(start = 0, ips = []) {
    if(ips.length === 4) {
      let ip
      if(isValid(ips) && (ip = ips.join('.'))) {
        s.length === ip.length-3 && result.push(ip)
      }
      return 
    }
    for(let i=start; i<s.length; i++) {
      const sub = s.slice(start, i+1)
      const num = Number(sub)
      if(/^0/.test(sub) && sub !== '0') continue
      if(num < 0 || num > 255) break
      ips.push(sub)
      backtrack(i+1, ips)
      ips.pop()
    }
  }

  backtrack()
  return result
};

function isValid (ips) {
  return ips.every(a => {
    const n = Number(a)
    if(/^0/.test(a) && a !== '0') return false // 0开头但不为0
    if(0 <= n && n <= 255) return true // 在 [0, 255] 区间内
    return false // 其他情况
  })
}

console.log( restoreIpAddresses( '25525511135' ) )
console.log( restoreIpAddresses( '0000' ) )
console.log( restoreIpAddresses( '1111' ) )
console.log( restoreIpAddresses( '010010' ) )
console.log( restoreIpAddresses( '101023' ) )