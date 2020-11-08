/**
 * @description 异步循化任务队列
 */
class Queue {
  constructor() {
    this.queue = [];
    this.cacheList = [];
    this.maxLength = 10;
  }

  /**
   * @description 入队
   * @param {object} ele
   */
  enqueue(
    ele = {
      id: "",
      name: "",
      time: 0,
    }
  ) {
    if (this.queue.length >= this.maxLength) {
      console.warn("Queue is full, the element is push on cache list");
      this.cacheList.push(ele);
      return;
    }
    this.push(ele);
  }
  /**
   * @description 出队
   */
  dequeue(id) {
    const index = this.queue.findIndex((item) => item.id === id);
    this.queue.splice(index, 1);
    if (this.cacheList.length > 0) {
      console.log("还有缓存，缓存列表长度：", this.cacheList.length);
      this.enqueue(this.cacheList.shift());
    }
  }

  push(ele) {
    this.queue.push(ele);
    new Promise((resolve) => {
      console.log(`${ele.name} is cooking`);
      setTimeout(() => {
        console.log(`${ele.name} had been cook`);
        resolve(ele);
      }, ele.time * 1000);
    }).then(() => {
      this.dequeue(ele.id);
    });
  }
}

const list = [
  {
    id: 0,
    name: "白切鸡",
    time: 4,
  },
  {
    id: 1,
    name: "烧鹅",
    time: 1,
  },
  {
    id: 2,
    name: "烤乳猪",
    time: 3,
  },
  {
    id: 3,
    name: "红烧乳鸽",
    time: 1,
  },
  {
    id: 4,
    name: "蜜汁叉烧",
    time: 3,
  },
  {
    id: 5,
    name: "脆皮烧肉",
    time: 3,
  },
  {
    id: 6,
    name: "上汤焗龙虾",
    time: 2,
  },
  {
    id: 7,
    name: "清蒸东星斑",
    time: 4,
  },
  {
    id: 8,
    name: "阿一鲍鱼",
    time: 2,
  },
  {
    id: 9,
    name: "鲍汁扣辽参",
    time: 2,
  },
  {
    id: 10,
    name: "白灼象拔蚌",
    time: 3,
  },
  {
    id: 11,
    name: "椒盐濑尿虾",
    time: 5,
  },
  {
    id: 12,
    name: "蒜香骨",
    time: 5,
  },
  {
    id: 13,
    name: "白灼虾",
    time: 2,
  },
  {
    id: 14,
    name: "椰汁冰糖燕窝",
    time: 4,
  },
  {
    id: 15,
    name: "木瓜炖雪蛤 菠萝咕噜肉 菠萝咕噜肉 ",
    time: 1,
  },
  {
    id: 16,
    name: "干炒牛河",
    time: 1,
  },
  {
    id: 17,
    name: "广东早茶",
    time: 2,
  },
  {
    id: 18,
    name: "老火靓汤",
    time: 2,
  },
  {
    id: 19,
    name: "罗汉斋",
    time: 4,
  },
  {
    id: 20,
    name: "广州文昌鸡",
    time: 5,
  },
  {
    id: 21,
    name: "煲仔饭",
    time: 3,
  },
];

const workList = new Queue();
list.map((item) => {
  workList.enqueue(item);
});

workList.enqueue({
  name: "酸菜鱼",
  id: 23,
  time: 5,
});
