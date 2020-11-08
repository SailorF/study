var entry = {
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

// 要求转换成如下对象
var output = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

// function toEntry(obj) {
//   let returnObj = {};
//   function digui(obj, string = '') {
//     for (let [key, value] of Object.entries(obj)) {
//       if (key && Object.prototype.toString.call(value) === '[object Object]') {
//         string += `${key}.`;
//         digui(value, string)
//       } else {
//         string = string + key;
//         returnObj[string] = value;
//       }
//     }
//   }
//   digui(obj)
//   return returnObj;
// }

function flatObj(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`;
      if (typeof obj[key] === "object")
        flatObj(obj[key], keyName + ".", result);
      else result[keyName] = obj[key];
    }
  }
  return result;
}
var a = flatObj(entry);
console.log(a);
