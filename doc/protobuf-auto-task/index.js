const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");
const baseProtoModule = require("./template/protoModule");
const baseApiModule = require("./template/apiModule");
const baseConfModule = require("./template/confModule");
const childProgress = require("child_process");

const protoFilePath = path.resolve(__dirname, "./test.proto");
const reg = /@funid (?<funid>\d+)[\s|\S]+?message (?<name>(\w+))[\s|\S]+?{(?<messageContent>[\s|\S]+?)}/g;
const basetype = [
  "int",
  "init32",
  "int64",
  "float",
  "double",
  "long",
  "short",
  "string",
  "bool",
];

function startTask() {
  return new Promise((resolve) => {
    fs.readFile(protoFilePath, (_e, code) => {
      // 1.读取proto文件, 获取具有funid的接口
      var getCode = reg.exec(code);
      const funArr = [];
      const cacheMsgReader = [];
      const cacheMsgObj = {};
      do {
        funArr.push({
          funid: getCode.groups.funid,
          name: getCode.groups.name,
          code: getCode.groups.messageContent,
          parent: null,
        });
      } while ((getCode = reg.exec(code)) !== null);
      // 2.通过protobuf解析proto的信息,获取proto对象
      protobuf.load(protoFilePath, (_err, bufCode) => {
        for (let i = 0; i < funArr.length; i++) {
          // console.log(funArr[i].funid);
          // console.log(bufCode[funArr[i].name]);
          const messageItem = bufCode[funArr[i].name];
          // 3. 获取消息item, 如果type不为基础类型, 则递归遍历item中的字段, 获取对应消息体, 并写入缓存中
          complierMsg(messageItem, bufCode, cacheMsgReader);
        }
        // 4. 获取缓存消息体后, 重新读取未被加载的消息体, 并将消息体推入obj
        for (let i = 0; i < cacheMsgReader.length; i++) {
          const item = cacheMsgReader[i];
          const reg = new RegExp(
            `message ${item.name}[\\s|\\S]+?{(?<messageContent>[\\s|\\S]+?)}`
          );
          const message = reg.exec(code);
          if (cacheMsgObj[item.parent]) {
            cacheMsgObj[item.parent].push({
              code: message.groups.messageContent,
              name: item.name,
            });
          } else {
            cacheMsgObj[item.parent] = [
              {
                code: message.groups.messageContent,
                name: item.name,
              },
            ];
          }
        }

        // 5.遍历消息体列表, 传入未被加载的消息体obj, 写入proto文件
        for (let i = 0; i < funArr.length; i++) {
          writeProtoFile(funArr[i], cacheMsgObj);
        }
        // 6.写入配置文件
        writeConfFile(funArr);
        // 7.格式化文件
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    });
  });
}

function complierMsg(messageContent, bufCode, cacheMsgReader) {
  messageContent.fieldsArray.forEach((item) => {
    const itemType = item.type;
    if (!basetype.includes(itemType)) {
      if (bufCode[itemType]) {
        cacheMsgReader.push({
          parent: messageContent.name,
          name: itemType,
        });
        complierMsg(bufCode[itemType]);
      } else {
        console.log("找不到消息体", itemType);
      }
    }
  });
}

function writeProtoFile(messageContent, cache) {
  const fileName = `./proto/${messageContent.name}.js`;
  const filePath = path.resolve(__dirname, fileName);
  fs.writeFileSync(
    filePath,
    baseProtoModule(messageContent, cache),
    "utf-8",
    (err, code) => {
      if (err) {
        console.log(`写入${fileName}失败`);
        return;
      }
      console.log(`写入${fileName}成功`);
    }
  );
}

function writeConfFile(funArr) {
  const filePath = path.resolve(__dirname, "./funConf/index.ts");
  const { api, conf } = require(filePath);
  console.log(api, conf);
  const newApi = funArr.map((item) => {
    return {
      [item.name]: item.funid,
    };
  });
  const AssingApi = Object.assign({}, ...newApi);
  const apiPath = path.resolve(__dirname, "./funConf/FUNAPI.ts");
  const confPath = path.resolve(__dirname, "./funConf/FUNCONF.ts");
  fs.writeFileSync(apiPath, baseApiModule(AssingApi), "utf-8", (err, code) => {
    console.log(err);
  });
  fs.writeFileSync(
    confPath,
    baseConfModule(AssingApi),
    "utf-8",
    (err, code) => {
      console.log(err);
    }
  );
}

// "node ./node_modules/prettier/bin-prettier.js --write ."
startTask().then(() => {
  const filePath = path.resolve(
    __dirname,
    "./node_modules/prettier/bin-prettier.js"
  );
  childProgress.exec(`node ${filePath} --write .`, (err, code) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("格式化成功");
  });
});
