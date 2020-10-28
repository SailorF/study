function pySegSort(arr) {
  if (!String.prototype.localeCompare) return null;
  var letters = "*abcdefghjklmnopqrstwxyz".split(''); 
  var zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
  var segs = []; 
  var curr;
  letters.forEach(function (item, i) {
    curr = { letter: item, data: [] };
    arr.forEach(function (item2) {
      if ((!zh[i - 1] || zh[i - 1].localeCompare(item2) <= 0) && item2.localeCompare(zh[i]) == -1) {
        curr.data.push(item2);
      }
    }); 
    if (curr.data.length) {
      segs.push(curr);
      curr.data.sort(function (a, b) {
        return a.localeCompare(b);
      });
    }
  }); 
  return segs;
}

pySegSort(["我","懂","爱","啊","按","已","呀","选","县"])

// "[{"letter":"a","data":["啊","爱","按"]},{"letter":"d","data":["懂"]},{"letter":"w","data":["我"]},{"letter":"x","data":["县","选"]},{"letter":"y","data":["呀","已"]}]"