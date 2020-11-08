var itertorTask = [
  {
    component: "<div>first</div>",
    check: async () => {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve("first ok"), 3000);
      });
      return result;
    },
  },
  {
    component: "<div>sencod</div>",
    check: async () => {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve("sencod ok"), 1000);
      });
      return result;
    },
  },
  {
    component: "<div>first</div>",
    check: async () => {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(true), 1000);
      });
      return result;
    },
  },
  {
    component: "<div>four</div>",
    check: async () => {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve("four true"), 1000);
      });
      return result;
    },
  },
];

const taskRun = itertorTask[Symbol.iterator]();
async function run() {
  for (let i = 0; i < itertorTask.length; i++) {
    const result = await itertorTask[i].check();
    console.log(result);
    if (result) {
      taskRun.next();
    } else {
      alert(result);
      break;
    }
  }
  if (taskRun.next().done) {
    console.log("结束了");
  }
}

run();
