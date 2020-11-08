const data = [
  {
    id: "1",
    name: "test1",
    children: [
      {
        id: "11",
        name: "test11",
        children: [
          {
            id: "111",
            name: "test111",
          },
          {
            id: "112",
            name: "test112",
          },
        ],
      },
      {
        id: "12",
        name: "test12",
        children: [
          {
            id: "121",
            name: "test121",
          },
          {
            id: "122",
            name: "test122",
          },
        ],
      },
    ],
  },
];

function bfs(target, id) {
  const quene = [...target];
  do {
    const current = quene.shift();
    if (current.children) {
      quene.push(
        ...current.children.map((x) => ({
          ...x,
          path: (current.path || current.id) + "-" + x.id,
        }))
      );
    }
    if (current.id === id) {
      return current;
    }
  } while (quene.length);
  return undefined;
}

console.log(bfs(data, "122"));
