Array.prototype.uniq = function () {
  let obj = {};
  let list = [];
  for (let i = 0; i < this.length - 1; i++) {
    if (obj[this[i]]) {
      continue;
    }
    list.push(this[i]);
    obj[this[i]] = 1;
  }
  obj = null;
  return list;
};

let arr = [false, true, undefined, null, NaN, 0, 1, {}, {}, "a", "a", NaN];
console.log(arr.uniq());
