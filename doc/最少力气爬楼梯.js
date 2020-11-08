/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let n = cost.length;
  let dp = new Array(n + 1).fill(0);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i <= n; i++) {
    let base = cost[i];
    let base1 = dp[i - 1];
    let base2 = dp[i - 2];
    if (i == n) {
      dp[i] = Math.min(base2, base1);
    } else {
      dp[i] = Math.min(base2, base1) + base;
    }
  }
  return dp[n];
};
console.log(minCostClimbingStairs([0, 1, 2, 2]));
