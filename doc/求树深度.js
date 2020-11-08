var tree = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
};

var maxDepth = function (root) {
  console.log(root);
  if (!root) {
    return 0;
  } else {
    let leftDeep = maxDepth(root.left);
    let rihgtDeep = maxDepth(root.right);
    return Math.max(leftDeep, rihgtDeep) + 1;
  }
};

maxDepth(tree);
