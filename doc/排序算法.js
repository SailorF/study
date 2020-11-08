// const list = [9, 10, 23, 6, 88, 1, 0, 29, 45];
const list = [];
let i = 0;
while (i < 1000) {
  list.push(parseInt(Math.random() * 10000));
  i++;
}

/**
 * @description 冒泡排序
 */
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      // 相邻元素两两对比，元素交换，大的元素交换到后面
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
/**
 * @description 快速排序
 */
function quickSort1(ary) {
  if (ary.length < 2) {
    return ary.slice();
  }
  var pivot = ary[Math.floor(Math.random() * ary.length)];
  var left = [];
  var middle = [];
  var right = [];
  for (var i = 0; i < ary.length; i++) {
    var val = ary[i];
    if (val < pivot) {
      left.push(val);
    }
    if (val === pivot) {
      middle.push(val);
    }
    if (val > pivot) {
      right.push(val);
    }
  }

  return quickSort1(left).concat(middle, quickSort1(right));
}
/**
 * @description 归并排序
 */
function mergeSort(ary) {
  if (ary.length < 2) {
    return ary.slice();
  }

  var mid = Math.floor(ary.length / 2);
  var left = mergeSort(ary.slice(0, mid));
  var right = mergeSort(ary.slice(mid));
  var result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  result.push(...left, ...right);

  return result;
}
/**
 * @description 插入排序
 */
function insertionSort1(arr) {
  var l = arr.length;
  var preIndex, current;
  for (var i = 1; i < l; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

console.time("冒泡排序");
console.log(bubbleSort(list));
console.timeEnd("冒泡排序");

console.time("快速排序");
console.log(quickSort1(list));
console.timeEnd("快速排序");

console.time("归并排序");
console.log(mergeSort(list));
console.timeEnd("归并排序");

console.time("插入排序");
console.log(insertionSort1(list));
console.timeEnd("插入排序");
