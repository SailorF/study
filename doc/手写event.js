class Event {
  constructor() {
    this.events = {};
  }

  on(type, fn, isPre) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    if (isPre) {
      this.events[type].unshift(fn);
      return;
    }
    this.events[type].push(fn);
  }

  emit(type, ...arg) {
    if (this.events[type]) {
      this.events[type].forEach((fn) => fn.call(this, ...arg));
    }
  }

  off(type, fn) {
    if (this.events[type]) {
      const index = this.events[type].findIndex((item) => item === fn);
      this.events[type].splice(index, 1);
      !this.events[type].length && delete this.events[type];
    }
  }

  once(type, fn) {
    const only = () => {
      fn();
      this.off(type, fn);
    };
    this.on(type, only);
  }

  preOn(type, fn) {
    this.on(type, fn, true);
  }
}

const ee = new Event();
const emitFirst = () => {
  console.log("the First");
};
const emitSecond = (a, b) => {
  console.log("the Second");
  console.log(a, b);
};
const emitThrid = () => {
  console.log("the Thrid");
};
ee.on("first", emitFirst);
ee.on("first", emitSecond);

ee.on("third", emitThrid);

ee.emit("first", "yo", "xi");
ee.emit("first");
