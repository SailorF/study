/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
let topKFrequent = function (nums, k) {
  let map = new Map(),
    arr = [...new Set(nums)];
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1);
    else map.set(num, 1);
  });

  return arr.sort((a, b) => map.get(b) - map.get(a)).slice(0, k);
};

var nums = [1, 1, 1, 2, 2, 3];
var k = 2;
console.log(topKFrequent(nums, k));
