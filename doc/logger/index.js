const fs = require("fs");
const basePath = "./";
const limitSize = 50000;

class Logger {
  constructor(userId) {
    const time = new Date().getTime();
    this.fileid = userId;
    this.fileName = `${basePath}${userId}_${time}.txt`;
    this.timer = setInterval(() => {
      fs.access(this.fileName, fs.constants.F_OK, (err) => {
        console.log(`${this.fileName} ${err ? "不存在" : "存在"}`);
        if (!err) {
          const file = fs.statSync(`${this.fileName}`, (err) => {
            if (err) {
              console.log(err);
            }
          });
          console.log("文件大小:", file.size);
          if (file.size > limitSize) {
            const time = new Date().getTime();
            this.fileName = `${basePath}${userId}_${time}.txt`;
          }
        }
      });
    }, 5000);
  }

  log(type, msg) {
    this.write(type, msg);
  }

  write(type, msg) {
    const time = new Date().toLocaleString();
    const loggerMsg = `[${time}] ${type} ${msg}\n`;
    fs.writeFileSync(
      `${this.fileName}`,
      loggerMsg,
      {
        encoding: "utf8",
        flag: "a",
      },
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );
  }
}

var a = new Logger("1");
setInterval(() => {
  for (let i = 0; i < 100; i++) {
    a.write("Debug", JSON.stringify(process.memoryUsage()));
  }
}, 5000);
