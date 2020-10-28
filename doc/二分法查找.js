function binarySearch(arr, value) {
  let min = 0;
  let max = arr.length - 1;
  while(min <= max) {
    const mid = Math.floor((min + max) / 2);
    if (arr[mid] > value) {
      max = mid;
    } else if (arr[mid] < value) {
      min = mid;
    } else if (arr[mid] === value) {
      return mid;
    }
  }
  return 'not found'
}

binarySearch([1,2,3,4,5,6,7,8,9,10], 4);