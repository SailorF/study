var isValid = function (s) {
  let arr = [];
  // const pushObj = {
  //     '(': ')',
  //     '{': '}',
  //     '[': ']'
  // };
  const popObj = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const pushArr = "({[";
  const popArr = "]})";
  for (let i = 0; i < s.length; i++) {
    if (pushArr.indexOf(s[i]) >= 0) {
      arr.unshift(s[i]);
    } else if (popArr.indexOf(s[i]) >= 0) {
      var composeVal = arr.shift();
      if (composeVal != popObj[s[i]]) return false;
    }
  }
  if (arr.length > 0) {
    return false;
  } else {
    return true;
  }
};

console.log(isValid("{}"));
