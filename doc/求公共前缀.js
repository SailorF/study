/**
 *
 * @param {[]string]} strs
 */
var longestCommonPrefix = function (strs) {
  return lcpPrefixRec(strs);
};

function lcpPrefixRec(strs) {
  let length = strs.length;
  if (length === 1) {
    return strs[0];
  }
  let mid = Math.floor(length / 2);
  let left = strs.slice(0, mid);
  let right = strs.slice(mid, length);
  return lcpPrefixTwo(lcpPrefixRec(left), lcpPrefixRec(right));
}

function lcpPrefixTwo(left, right) {
  let j = 0;
  for (; j < left.length && j < right.length; j++) {
    if (left.charAt(j) !== right.charAt(j)) {
      break;
    }
  }
  return left.substring(0, j);
}

console.log(longestCommonPrefix(["abcdef", "abcvsd", "abcas"]));
