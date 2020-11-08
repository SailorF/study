Function.prototype.myCall = function (context, ...args) {
  // 判断是否是undefined和null
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  let fnSymbol = Symbol();
  context[fnSymbol] = this;
  let fn = context[fnSymbol](...args);
  delete context[fnSymbol];
  return fn;
};

Function.prototype.myApply = function (context, args) {
  // 判断是否是undefined和null
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  let fnSymbol = Symbol();
  context[fnSymbol] = this;
  let fn = context[fnSymbol](...args);
  return fn;
};

Function.prototype.myBind = function (context, args) {
  // 判断是否是undefined和null
  if (typeof context === "undefined" || context === null) {
    context = window;
  }
  self = this;
  return function () {
    return self.apply(context, args);
  };
};

let Person = {
  name: "Tom",
  say(x, y) {
    //console.log(this)
    console.log(`我叫${this.name}${x}${y}`);
  },
};
Person1 = {
  name: "Tom1",
};
Person.say.myCall(Person1, " call你干嘛", " 哈哈哈");
Person.say.myApply(Person1, [" apply你干嘛", " 哈哈哈"]);
Person.say.myBind(Person1, ["bind你干嘛", " 哈哈哈kk"])();
