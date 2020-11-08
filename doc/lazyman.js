// 实现一个LazyMan，可以按照以下方式调用:
// LazyMan("Hank")输出:
// Hi! This is Hank!
//
// LazyMan("Hank").sleep(10).eat("dinner")输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~
//
// LazyMan("Hank").eat("dinner").eat("supper")输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~
//
// LazyMan("Hank").sleepFirst(5).eat("supper")输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

function _LazyMan(name) {
  this.queue = [];
  console.log("Hi, THis is ", name);
  setTimeout(() => {
    this.next();
  });
}

_LazyMan.prototype.next = function () {
  const fn = this.queue.shift();
  fn && fn();
};

_LazyMan.prototype.sleep = function (time) {
  const fn = () =>
    setTimeout(() => {
      console.log("Wake up after ", time);
      this.next();
    }, time * 1000);
  this.queue.push(fn);
  return this;
};

_LazyMan.prototype.eat = function (food) {
  const fn = () => {
    console.log("Eat ", food);
    this.next();
  };
  this.queue.push(fn);
  return this;
};

_LazyMan.prototype.sleepfirst = function (time) {
  const fn = () =>
    setTimeout(() => {
      console.log("sleepfirst ", time);
      this.next();
    }, time * 1000);
  this.queue.unshift(fn);
  return this;
};

function lazyman(name) {
  return new _LazyMan(name);
}

lazyman("Joe").eat("breakfast").sleep(5).eat("dinner").sleepfirst(3);
