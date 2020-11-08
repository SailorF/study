const treeList = [
  { id: 0, text: "1", parent: null },
  { id: 3, text: "4", parent: 1 },
  { id: 1, text: "2", parent: 0 },
  { id: 4, text: "5", parent: 0 },
  { id: 5, text: "6", parent: 1 },
  { id: 8, text: "9", parent: 4 },
  { id: 2, text: "3", parent: 1 },
  { id: 10, text: "11", parent: 8 },
  { id: 6, text: "7", parent: 4 },
  { id: 11, text: "12", parent: 8 },
  { id: 7, text: "8", parent: 8 },
  { id: 9, text: "10", parent: 8 },
];

function toTree(data) {
  let result = [];
  let map = Object.create(null);
  data.forEach((item) => {
    map[item.id] = item;
  });

  data.forEach((item) => {
    let parent = map[item.parent];
    if (parent) {
      (parent.child || (parent.child = [])).push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}
console.log(toTree(treeList));
