// const list = [5,7,9,8,6,4,2,3,0,1];
// const newArr = list.sort((a,b) => a - b);
let list = [];
let i = 0;
let searchIndex1 = 0;
let searchIndex2 = 0;
while (i < 1000010) {
  list.push({
    id: i,
    name: `myName_${i}`,
    key: Math.random() * 1000000,
  });
  i++;
}
/**
 * @description 二分法查找
 * @param {array} list
 * @param {num} item
 */
function binarySearch(list, id) {
  searchIndex1++;
  const center = Math.round(list.length / 2);
  const currentsearchIndex = list[center];
  if (id > currentsearchIndex.id) {
    return binarySearch(list.slice(center, list.length), id);
  } else if (id < currentsearchIndex.id) {
    return binarySearch(list.slice(0, center), id);
  }
  console.log("总共搜索 : ", searchIndex1, "次");
  return id;
}
/**
 * @description 顺序查找
 * @param {array} arr
 * @param {*} id
 */
function seqSearch(arr, id) {
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i].id == id) {
      return i;
    }
  }
  return -1;
}

function binSearch(arr, data) {
  var upperBound = arr.length - 1;
  var lowerBound = 0;
  while (lowerBound <= upperBound) {
    searchIndex1++;
    var mid = Math.floor((upperBound + lowerBound) / 2);
    if (arr[mid].id < data) {
      lowerBound = mid + 1;
    } else if (arr[mid].id > data) {
      upperBound = mid - 1;
    } else {
      console.log("总共搜索 : ", searchIndex1, "次");
      return mid;
    }
  }
  return -1;
}

console.time("二分法查询用时1");
console.log(binarySearch(list, 1000000));
console.timeEnd("二分法查询用时1");

console.time("二分法查询用时2");
console.log(binSearch(list, 1000000));
console.timeEnd("二分法查询用时2");

console.time("顺序查询用时");
console.log(seqSearch(list, 1000000));
console.timeEnd("顺序查询用时");

console.time("find查询用时");
console.log(list.find((item) => item.id === 1000000));
console.timeEnd("find查询用时");

console.time("直接取值");
console.log(list[1000000]);
console.timeEnd("直接取值");
