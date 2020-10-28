let testArr = [];
while(testArr.length < 1000) {
  testArr.push(Math.floor(Math.random() * 10000));
}

function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        var v = arr[i];
        arr[i] = arr[j];
        arr[j] = v;
      }
    }
  }
  return arr;
}

function bubbleSort(arr, compareFunc) {
  for (var i = arr.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (compareFunc(arr[j], arr[j + 1]) > 0) {
        var v = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = v;
      }
    }
  }
  return arr;
}

// 选择排序
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }

  return arr;
}

// 插入排序
function insertionSort(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    let preIndex = i - 1;

    while (arr[preIndex] > temp) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = temp;
  }

  return arr;
}

/**
 * 快速排序
 *                        [5,6,9,2,1,8,4,3,7,10]
 *                                  ||
 *                              randomNum = 6
 *                            /     \         \
 *                        left        middle   right
 *                     [5,2,1,4,3]      [6]   [9,8,7,10]
 *                        /              |        \
 *                    randomNum = 4     [6]   randomNum = 7
 *                      /                           \
 *              [2,1,3] [4]  [5]              []  [7]  [9,8,10]
 *                /                                         \
 *               3                                           9
 *              /                                        [8] [9] [10]
 *          [2,1] [3] []  
 *            /
 *           1
 *          /
 *       [][1][2]
 */
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var randomNum = arr[Math.floor(arr.length * Math.random())]
  var left = [];
  var right = [];
  var middle = [];
  for (var i = 0; i < arr.length; i++) {
    var val = arr[i];
    if (val < randomNum) {
      left.push(val)
    } else if (val > randomNum) {
      right.push(val);
    } else if (val === randomNum) {
      middle.push(val);
    }
  }

  return quickSort(left).concat(middle, quickSort(right));
}

/**
 * 归并排序
 *                        [5,6,9,2,1,8,4,3,7,10]
 *                                  ||
 *                              midNum = 1
 *                            /             \
 *                        left              right
 *                     [5,6,9,2]         [1,8,4,3,7,10]
 *                        /                     \
 *                    midNum = 9              midNum = 3
 *                      /                           \
 *              [5,6] [9,2]                  [1,8,4] [3,7,10]
 *                   /                              \
 *             [5,6] [2, 9]                  [1][4,8] [3][7,10]     
 *                 ||                          ...      ...
 *             [2,5,6,9]                       ||       ||     
 *                 ||                         [1,4,8]  [3,7,10]
 *                 ||                             \        /
 *             [2,5,6,9]                        [1,3,4,7,8,10]
 *                      \                       /
 *                       [1,2,3,4,5,6,7,8,9,10]
 */
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var midNum = Math.floor(arr.length / 2);
  var left = mergeSort(arr.slice(0, midNum));
  var right = mergeSort(arr.slice(midNum));
  var result = []

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length)
        result.push(left.shift());

  while (right.length)
      result.push(right.shift());

  return result;
}

insertionSort([5,6,9,2,1,8,4,3,7,10]);