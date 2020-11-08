class Queue {
  constructor() {
    this.queueMaxLength = 10;
    this.queue = [];
    this.cache = []; // 缓冲区
  }

  push(fn) {
    if (this.size > this.queueMaxLength - 1) {
      // throw Error('Error: The queue has over size');
      return this.cache.push(fn);
    }
    fn.id = Math.random() * 10;
    this.queue.push(fn());
  }

  pop() {
    this.queue.pop();
  }

  splice(startIndex, endIndex, item) {
    if (this.size === 0) {
      throw Error("Error: There is nothing on the queue.");
    }
    this.queue.splice(...arguments);
  }

  find(fn) {
    return this.queue.find(fn);
  }

  findIndex(fn) {
    return this.queue.findIndex(fn);
  }

  clear() {
    this.queue = [];
  }

  emit(fn) {
    this.on(
      "finish",
      this.findIndex((item) => item.id == fn.id)
    );
  }

  on(type, fnIndex) {
    switch (type) {
      case "finish":
        this.splice(fnIndex, 1, this.cache.shift());
    }
  }

  get size() {
    return this.queue.length;
  }

  set queueMaxLength(num) {
    console.warn("queue max length had change to ", num);
    // this.queueMaxLength = num;
  }
}
