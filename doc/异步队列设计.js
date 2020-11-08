const queue = () => {
  const list = []; // 队列
  let index = 0; // 游标

  // next 方法
  const next = () => {
    if (index >= list.length - 1) return;

    // 游标 + 1
    const cur = list[++index];
    cur(next);
  };

  // 添加任务
  const add = (...fn) => {
    list.push(...fn);
  };

  // 执行
  const run = (...args) => {
    const cur = list[index];
    typeof cur === "function" && cur(next);
  };

  const log = () => {
    console.log(index);
  };

  // 返回一个对象
  return {
    add,
    run,
    log,
  };
};

// 生成异步任务
const async = (x) => {
  return (next) => {
    // 传入 next 函数
    setTimeout(() => {
      console.log(x);
      next(); // 异步任务完成调用
    }, 1000);
  };
};

const q = queue();
const funs = "653421".split("").map((x) => async(x));
q.add(...funs);
q.run();

// class Queue {
//     constructor() {
//         this.queueMaxLength = 10;
//         this.queue = [];
//         this.cache = [];    // 缓冲区
//     }

//     push(fn) {
//         if (this.size > this.queueMaxLength - 1) {
//             // throw Error('Error: The queue has over size');
//             return this.cache.push(fn);
//         }
//         fn.id = Math.random() * 10;
//         this.queue.push((fn)());
//     }

//     pop() {
//         this.queue.pop();
//     }

//     splice(startIndex, endIndex, item) {
//         if (this.size === 0) {
//             throw Error('Error: There is nothing on the queue.');
//         }
//         this.queue.splice(...arguments);
//     }

//     find(fn) {
//         return this.queue.find(fn);
//     }

//     findIndex(fn) {
//         return this.queue.findIndex(fn);
//     }

//     clear() {
//         this.queue = [];
//     }

//     emit(fn) {
//         this.on('finish', this.findIndex(item => item.id == fn.id))
//     }

//     on(type, fnIndex) {
//         switch(type) {
//             case 'finish':
//                 this.splice(fnIndex, 1, this.cache.shift());
//         }
//     }

//     get size() {
//         return this.queue.length;
//     }

//     set queueMaxLength(num) {
//         console.warn('queue max length had change to ', num);
//         // this.queueMaxLength = num;
//     }
// }

// const test = new Queue();
// // for (let i = 1; i < 100; i++) {
// //     test.push({item: i});
// // }
