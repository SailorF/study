const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
    },
    right: {
      val: 4,
    },
  },
  right: {
    val: 5,
    left: {
      val: 6,
    },
    right: {
      val: 7,
    },
  },
};

// const tree = {
//     val: 1,
//     left: {
//         val: 2,
//     },
//     right: {
//         val: 3,
//     }
// }

var flatten = function (root) {
  if (root == null) {
    return;
  }
  //将根节点的左子树变成链表
  flatten(root.left);
  //将根节点的右子树变成链表
  flatten(root.right);
  let temp = root.right;
  //把树的右边换成左边的链表
  root.right = root.left;
  //记得要将左边置空
  root.left = null;
  //找到树的最右边的节点
  while (root.right != null) root = root.right;
  //把右边的链表接到刚才树的最右边的节点
  root.right = temp;
};

console.log(flatten(tree));
