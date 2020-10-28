// 示例 1:
// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 复制代码示例 2:
// 输入: "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 复制代码示例 3:
// 输入: "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

var lengthOfLongestSubstring = function(s) {
  let result = [];
  let max = 0;
  let current = 0;
  while (current < s.length) {
    if (result.indexOf(s[current]) >= 0) {
      result.splice(0, 1);
      current++;
    }
    result.push(s[current]);
    
    max = Math.max(result.length, max);
    current++;
  }
  return max;
}