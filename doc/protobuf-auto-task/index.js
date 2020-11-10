const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");
const root = new protobuf.Root();
const childProgress = require("child_process");
const baseProtoModule = require("./template/protoModule");
const baseApiModule = require("./template/apiModule");
const baseConfModule = require("./template/confModule");
const baseTypeModule = require("./template/typeModule");
const { GET_MESSAGE_REG, BASE_TYPE } = require("./resource");

const protoFilePath = path.resolve(__dirname, "./test.proto");

function startTask() {
  return new Promise((resolve) => {
    fs.readFile(protoFilePath, (_e, code) => {
      // 1.读取proto文件, 获取具有funid的接口
      var getCode = GET_MESSAGE_REG.exec(code);
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
      } while ((getCode = GET_MESSAGE_REG.exec(code)) !== null);
      // 2.通过protobuf解析proto的信息,获取proto对象
      root.load(protoFilePath, { keepCase: true }, (_err, bufCode) => {
        for (let i = 0; i < funArr.length; i++) {
          // console.log(funArr[i].funid);
          // console.log(bufCode[funArr[i].name]);
          const messageItem = bufCode[funArr[i].name];
          // TODO: 通过interfaceItem 翻译更加简洁, 翻译并生成typescript的接口定义文件, 不过无法获取注释
          // console.log(messageItem.toJSON());
          // 3. 获取消息item, 如果type不为基础类型, 则递归遍历item中的字段, 获取对应消息体, 并写入缓存中
          complierMsg(messageItem, bufCode, cacheMsgReader);
        }
        // 4. 获取缓存消息体后, 重新读取未被加载的消息体, 并将消息体推入obj
        for (let i = 0; i < cacheMsgReader.length; i++) {
          const item = cacheMsgReader[i];
          const reg = new RegExp(
            `message ${item.messageName}[\\s|\\S]+?{(?<messageContent>[\\s|\\S]+?)}`
          );
          const message = reg.exec(code);
          if (cacheMsgObj[item.parent]) {
            cacheMsgObj[item.parent].push({
              code: message.groups.messageContent,
              name: item.messageName,
              rule: item.rule,
              type: item.type,
              key: item.key,
            });
          } else {
            cacheMsgObj[item.parent] = [
              {
                code: message.groups.messageContent,
                name: item.messageName,
                rule: item.rule,
                type: item.type,
                key: item.key,
              },
            ];
          }
        }

        // 5.遍历消息体列表, 传入未被加载的消息体obj, 写入proto文件
        for (let i = 0; i < funArr.length; i++) {
          // 写入proto文件
          writeProtoFile(funArr[i], cacheMsgObj);
          // 写入接口定义文件
          writeTypeFile(funArr[i], cacheMsgObj);
        }
        // 写入配置文件
        writeConfFile(funArr);
        // 6. 格式化文件
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    });
  });
}

function complierMsg(messageContent, bufCode, cacheMsgReader, parentName = "") {
  messageContent.fieldsArray.forEach((item) => {
    const itemType =
      item.type.indexOf(".") > 0 ? item.type.split(".")[1] : item.type;
    if (!BASE_TYPE.includes(itemType)) {
      if (bufCode[itemType]) {
        // 递归需要传递正确的父级, 使proto构建可以打到正确的位置
        cacheMsgReader.push({
          parent: parentName || messageContent.name,
          messageName: itemType,
          rule: item.rule,
          type: item.type,
          key: item.name,
        });
        complierMsg(
          bufCode[itemType],
          bufCode,
          cacheMsgReader,
          messageContent.name
        );
      } else {
        console.log("找不到消息体", itemType);
      }
    }
  });
}

function writeProtoFile(messageContent, cache) {
  const fileName = `./proto/${messageContent.name}.js`;
  const filePath = path.resolve(__dirname, fileName);
  fs.writeFile(
    filePath,
    baseProtoModule(messageContent, cache),
    "utf-8",
    (err, _code) => {
      if (err) {
        console.log(
          `自动写入任务: \n功能号${messageContent.funid} \npath:${fileName}失败\n`
        );
        return;
      }
      console.log(
        `自动写入任务: \n功能号${messageContent.funid} \npath:${fileName}成功\n`
      );
    }
  );
}

function writeTypeFile(messageContent, cache) {
  const fileName = `./type/${messageContent.name}.ts`;
  const filePath = path.resolve(__dirname, fileName);
  fs.writeFile(
    filePath,
    baseTypeModule(messageContent, cache),
    "utf-8",
    (err, _code) => {
      if (err) {
        console.log(
          `自动写入任务: \n功能号${messageContent.funid} \npath:${fileName}失败\n`
        );
        return;
      }
      console.log(
        `自动写入任务: \n功能号${messageContent.funid} \npath:${fileName}成功\n`
      );
    }
  );
}

function writeConfFile(funArr) {
  // 读取旧的配置, 合并配置
  // const filePath = path.resolve(__dirname, "./funConf/index.ts");
  // const { api, conf } = require(filePath);
  // console.log(api, conf);
  const newApi = funArr.map((item) => {
    return {
      [item.name]: item.funid,
    };
  });
  const AssingApi = Object.assign({}, ...newApi);
  const apiPath = path.resolve(__dirname, "./funConf/FUNAPI.ts");
  const confPath = path.resolve(__dirname, "./funConf/FUNCONF.ts");
  fs.writeFileSync(apiPath, baseApiModule(AssingApi), "utf-8");
  fs.writeFileSync(confPath, baseConfModule(AssingApi), "utf-8");
}

// "node ./node_modules/prettier/bin-prettier.js --write ."
startTask().then(() => {
  const filePath = path.resolve(
    __dirname,
    "./node_modules/prettier/bin-prettier.js"
  );
  childProgress.exec(`node ${filePath} --write .`, (err, _code) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("格式化成功");
  });
});
