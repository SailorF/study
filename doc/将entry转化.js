var entry = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

// 要求转换成如下对象
var output = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
};

function toEntry(obj) {
  let returnObj = {};
  for (let [keys, value] of Object.entries(obj)) {
    let keyList = keys.split(".");
    let i = 0;
    let newObj = returnObj;
    while (true) {
      if (i == keyList.length - 1) {
        newObj[keyList[i]] = value;
        break;
      }
      if (!newObj[keyList[i]]) {
        newObj[keyList[i]] = {};
      }
      newObj = newObj[keyList[i]];
      i++;
    }
  }
  return returnObj;
}

const a = toEntry(entry);
console.log(a);
