// /**
//  * @param {character[][]} board
//  * @param {string} word
//  * @return {boolean}
//  */
var exist = function (board, word) {
  if (!board) return false;
  if (!word) return false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // 匹配到， 开始遍历
      if (board[i][j] == word[0] && find(i, j, 0)) {
        return true;
      }
    }
  }

  function find(x, y, i) {
    if (i + 1 == word.length) return true;
    // 如果y的下一个等于word的下一个单词
    if (board[x][y + 1] == word[i + 1] && find(x, y + 1, i + 1)) return true;
    // 如果下一列的y等于word的下一个单词
    if (board[x][y - 1] == word[i + 1] && find(x, y - 1, i + 1)) return true;
    if (board[x + 1][y] == word[i + 1] && find(x + 1, y, i + 1)) return true;
    if (board[x - 1][y] == word[i + 1] && find(x - 1, y, i + 1)) return true;

    return false;
  }
  return false;
};

var exist = function (board, word) {
  //越界处理
  board[-1] = [];
  board.push([]);

  //寻找首个字母
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (word[0] === board[y][x] && backtrack(y, x, 0)) return true;
    }
  }

  //回溯
  function backtrack(y, x, i) {
    //回溯终止
    if (i + 1 === word.length) return true;

    //保存字母
    // var tmp = board[y][x]
    // board[y][x] = false

    if (board[y][x + 1] === word[i + 1] && backtrack(y, x + 1, i + 1))
      return true;
    if (board[y][x - 1] === word[i + 1] && backtrack(y, x - 1, i + 1))
      return true;
    if (board[y + 1][x] === word[i + 1] && backtrack(y + 1, x, i + 1))
      return true;
    if (board[y - 1][x] === word[i + 1] && backtrack(y - 1, x, i + 1))
      return true;

    //复原字母
    // board[y][x] = tmp
  }

  return false;
};

var board =
  // [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
  [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]

var word =
  // 'SEE';
  "ABCB";

console.log(exist(board, word));
