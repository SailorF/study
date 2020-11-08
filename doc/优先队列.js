class Queue {
  constructor() {
    this.queue = [];
  }

  /**
   * @description 入队
   * @param {object} ele
   */
  enqueue(
    ele = {
      name: "",
      level: 0,
    }
  ) {
    this.queue.push(ele);
  }
  /**
   * @description 出队
   * 如果存在优先级高的，则优先出队，否则按顺序出队
   */
  dequeue() {
    if (!this.queue.length) {
      console.warn("Queue is Empty!");
      return;
    }
    let level = 0;
    let qIndex = null;
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].level > level) {
        level = this.queue[i].level;
        qIndex = i;
      }
    }
    let Person;
    // 如果有高优先级存在
    if (level > 0) {
      Person = this.queue.splice(qIndex, 1);
      console.log(`${Person[0].name} had been deal`);
      return;
    }
    // 否则，先进先出
    Person = this.queue.shift();
    console.log(`${Person.name} had been deal`);
  }
}

const workList = new Queue();
workList.enqueue({
  name: "Bob",
  level: 0,
});

workList.enqueue({
  name: "Paul",
  level: 5,
});

workList.enqueue({
  name: "Marry",
  level: 2,
});

workList.enqueue({
  name: "Tom",
  level: 0,
});

workList.enqueue({
  name: "John",
  level: 0,
});

workList.enqueue({
  name: "Sailor",
  level: 1,
});

while (workList.queue.length > 0) {
  workList.dequeue();
}
