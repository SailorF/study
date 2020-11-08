/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const result = [];
  for (let i = 0; i < s.length; i++) {
    let j = 0;
    let complieStr = s.slice(i, i + p.length).split("");
    while (j < p.length) {
      const index = complieStr.findIndex((item) => item == p[j]);
      if (index < 0) {
        break;
      }
      complieStr.splice(index, 1);
      j++;
      if (complieStr.length === 0 && j == p.length) {
        result.push(i);
        break;
      }
    }
  }
  return result;
};

// var a = "beeaaedcbc"
// var b = 'c'
// console.log(findAnagrams(a, b));

var a = "baa";
var b = "aa";
console.log(findAnagrams(a, b));
