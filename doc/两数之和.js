var twoSum = function (nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]] !== undefined) {
      return [i, map[nums[i]]];
    }
    map[target - nums[i]] = i;
  }
};

twoSum([2, 7, 11, 15], 9);
