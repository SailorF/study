/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// 思路：排序，左右指针
var threeSum = function(nums) {
  if (!nums || nums.length < 3) return [];
  nums.sort((a, b) => {return a - b});
  let result = [];
  for (let loop = 0, len = nums.length; loop < len; loop++) {
      if (nums[loop] > 0) break;
      if (loop > 0 && nums[loop] === nums[loop - 1]) continue; // 去重
      let left = loop + 1, right = nums.length - 1;
      // console.log('loop', loop);
      while(left < right) {
          // console.log('left', left, right)
          const sum = nums[loop] + nums[left] + nums[right];
          if (sum > 0) right--;
          if (sum < 0) left++;
          if (!sum) {
              while(left < right && nums[left] === nums[left+1]) left++;
              while(left < right && nums[right] === nums[right-1]) right--;
              result.push([nums[loop], nums[left], nums[right]]);
              left++;
              right--;
          }
      }
  }

  return result;
};