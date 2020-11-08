const tree = [
  {
    id: 0,
    text: "1",
    parent: null,
    child: [
      {
        id: 1,
        text: "2",
        parent: 0,
        child: [
          {
            id: 3,
            text: "4",
            parent: 1,
          },
          {
            id: 5,
            text: "6",
            parent: 1,
          },
          {
            id: 2,
            text: "3",
            parent: 1,
          },
        ],
      },
      {
        id: 4,
        text: "5",
        parent: 0,
        child: [
          {
            id: 8,
            text: "9",
            parent: 4,
            child: [
              {
                id: 10,
                text: "11",
                parent: 8,
              },
              {
                id: 11,
                text: "12",
                parent: 8,
              },
              {
                id: 7,
                text: "8",
                parent: 8,
              },
              {
                id: 9,
                text: "10",
                parent: 8,
              },
            ],
          },
          {
            id: 6,
            text: "7",
            parent: 4,
          },
        ],
      },
    ],
  },
];

function treeToArray(tree) {
  let result = [];
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i];
    if (node.child) {
      result = result.concat(treeToArray(node.child));
    }
    result = result.concat(node);
  }
  return result;
}

console.log(treeToArray(tree));
