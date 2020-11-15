const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");
const root = new protobuf.Root();
const iconv = require("iconv-lite");
const childProgress = require("child_process");
const { baseTypeModule, baseProtoModule } = require("./template/commonModule");
const baseApiModule = require("./template/apiModule");
const baseConfModule = require("./template/confModule");
const {
  GET_ALL_MESSAGE_REG,
  GET_FUNC_MESSAGE_REG,
  BASE_TYPE,
  PROTO_FILE_PATH,
} = require("./resource");

const protoFilePath = path.resolve(__dirname, PROTO_FILE_PATH);

function getAllFilePath() {
  return new Promise((resolve) => {
    const protoFileList = [];
    fs.readdir(protoFilePath, (_err, files) => {
      for (var i = 0; i < files.length; i++) {
        if (/.proto$/.test(files[i]))
          protoFileList.push(
            path.resolve(__dirname, PROTO_FILE_PATH, files[i])
          );
      }
      resolve(protoFileList);
    });
  });
}

async function batchReadFile(list) {
  let funcMsgCache = Object.create({});
  let funCache = Object.create({});
  let allMsgCache = Object.create({});
  await list.reduce(async (last, next) => {
    const result = await last;
    if (result) {
      funcMsgCache = Object.assign(funcMsgCache, result.nested);
      funCache = Object.assign(funCache, result.funcMsgCache);
      allMsgCache = Object.assign(allMsgCache, result.allMsgCache);
    }
    return await readSignFile(next);
  }, readSignFile(list[0]));
  return {
    funcMsgCache,
    funCache,
    allMsgCache,
  };
}

function readSignFile(path) {
  return new Promise((resolve) => {
    fs.readFile(path, (__err, originCode) => {
      const code = iconv.decode(originCode, "GB2312");

      let funcMsg = GET_FUNC_MESSAGE_REG.exec(code);
      let funcMsgCache = {};
      let allMsg = GET_ALL_MESSAGE_REG.exec(code);
      let allMsgCache = {};
      while (funcMsg !== null) {
        const funcid = funcMsg.groups.funcid;
        if (funcid.indexOf(",") > 0) {
          // 如果存在多个功能号使用同一个消息体的情况, 获取funlist并消除空格, 然后分组
          let funcList = funcid.replace(/\s/g, "").split(",");
          for (let i = 0; i < funcList.length; i++) {
            funcMsgCache[funcList[i]] = {
              funcid: funcList[i],
              name: funcMsg.groups.name,
              use: funcList.toString(),
              descript: funcMsg.groups.descript.split(",")[i],
            };
          }
        } else {
          funcMsgCache[funcMsg.groups.funcid] = {
            funcid: funcMsg.groups.funcid,
            name: funcMsg.groups.name,
            descript: funcMsg.groups.descript,
          };
        }

        funcMsg = GET_FUNC_MESSAGE_REG.exec(code);
      }

      while (allMsg !== null) {
        allMsgCache[allMsg.groups.name] = allMsg.groups.content;

        allMsg = GET_ALL_MESSAGE_REG.exec(code);
      }

      root.load(path, { keepCase: true }, (err, bufCode) => {
        if (err) {
          console.log(err);
        }
        if (bufCode) {
          resolve({
            nested: bufCode.nested, // 嵌套消息体
            funcMsgCache,
            allMsgCache,
          });
        } else {
          resolve();
        }
      });
    });
  });
}

// 递归获取消息体中嵌套引用的子消息体
function recursionCache(parentMessage, cache) {
  const { fieldsArray } = parentMessage;
  let msgList = [];
  if (!fieldsArray) {
    console.log("没有字段", parentMessage.name);
    return [];
  }
  for (let i = 0; i < fieldsArray.length; i++) {
    // 如果不属于基础类型, 递归子节点
    if (!BASE_TYPE.includes(fieldsArray[i].type)) {
      const message = getMessage(fieldsArray[i].type, cache, parentMessage);
      if (!message) {
        console.log("没有找到消息体", fieldsArray[i].type);
        continue;
      }
      // 枚举没有名字, 这里手动添加, 方便后面写入文件时定位
      if (!message.name) {
        message.name = fieldsArray[i].type;
      }
      msgList.push(message);
      msgList = msgList.concat(recursionCache(message, cache));
    }
  }
  return msgList;
}

// 根据名字在缓存中找到消息体
function getMessage(name, cache = {}, parent = {}) {
  /**
   * 由于一些消息头的type是GFPB.xxxx, 一些消息头则是xxx, 无法使统一的获取方法
   * 所以在这里做了兼容
   */
  if (name.indexOf(".") > 0) {
    return _.get(cache, name, false);
  } else {
    let message = false;
    const cacheList = Object.values(cache);
    for (let i = 0; i < cacheList.length; i++) {
      if (cacheList[i][name]) {
        message = cacheList[i][name];
        break;
      }
      // 内嵌情况
      if (parent) {
        const parentMessage = getMessage(parent.name, cache);
        if (
          parentMessage &&
          parentMessage.nested &&
          parentMessage.nested[name]
        ) {
          // 如果有values, 则取values(枚举), 否则去查内嵌消息
          message =
            parentMessage.nested[name].values || parentMessage.nested[name];
          break;
        }
      }
    }
    return message;
  }
}

getAllFilePath()
  .then((list) => {
    return batchReadFile(list);
  })
  .then(async (data) => {
    const { funCache, funcMsgCache, allMsgCache } = data;
    const list = Object.values(funCache);
    for (let i = 0; i < list.length; i++) {
      const main = list[i];
      const mainMsg = getMessage(main.name, funcMsgCache);
      const msgChildList = recursionCache(mainMsg, funcMsgCache);
      if (!mainMsg) {
        console.log(`没有找到消息头: ${main}!`);
      } else {
        // 手动注入funcid, 方便后面读取
        mainMsg.funcid = main.funcid;
        mainMsg.use = main.use;
        await writeProtoFile(mainMsg, msgChildList);
        await writeTypeFile(mainMsg, msgChildList, allMsgCache);
      }
    }
    // 写配置文件
    await writeConfFile(Object.values(funCache));
    return data;
  })
  .then(() => {
    console.log("任务完成");
  })
  .then(() => {
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

function writeConfFile(funArr) {
  // 读取旧的配置, 合并配置
  // const filePath = path.resolve(__dirname, "./funConf/index.ts");
  // const { api, conf } = require(filePath);
  // console.log(api, conf);
  const newApi = funArr.map((item, index) => {
    // 如果有多个功能号使用同一个消息头,则会导致功能号合并, 在这里加入index避免合并问题
    const name = item.use ? `${item.name}_${index}` : item.name;
    return {
      ...item,
      realName: item.name,
      name: name,
    };
  });
  const apiPath = path.resolve(__dirname, "./funConf/FUNAPI.ts");
  const confPath = path.resolve(__dirname, "./funConf/FUNCONF.ts");
  fs.writeFileSync(apiPath, baseApiModule(newApi), "utf-8");
  fs.writeFileSync(confPath, baseConfModule(newApi), "utf-8");
}

async function writeProtoFile(main, childlist) {
  return new Promise(async (resolve) => {
    const fileName = `./proto/${main.name}.js`;
    const filePath = path.resolve(__dirname, fileName);
    await write(filePath, baseProtoModule(main, childlist));
    resolve();
  });
}

function writeTypeFile(main, childlist, allMsgCache) {
  return new Promise(async (resolve) => {
    const fileName = `./type/${main.name}.ts`;
    const filePath = path.resolve(__dirname, fileName);
    await write(filePath, baseTypeModule(main, childlist, allMsgCache));
    resolve();
  });
}

function write(filePath, result) {
  return new Promise((resolve, reject) =>
    fs.writeFile(filePath, result, "utf-8", (err, _code) => {
      if (err) {
        console.log(`自动写入任务: path:${filePath}失败\n`);
        reject();
        return;
      }
      console.log(`自动写入任务: path:${filePath}成功\n`);
      resolve();
    })
  );
}
