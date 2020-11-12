const fs = require("fs");
const path = require("path");
const protobuf = require("protobufjs");
const root = new protobuf.Root();
const childProgress = require("child_process");
const baseProtoModule = require("./template/protoModule");
const baseApiModule = require("./template/apiModule");
const baseConfModule = require("./template/confModule");
const baseTypeModule = require("./template/typeModuleWithJSON");
const { GET_MESSAGE_REG, BASE_TYPE, PROTO_FILE_PATH } = require("./resource");

const protoFilePath = path.resolve(__dirname, PROTO_FILE_PATH);

function getAllFilePath() {
  return new Promise((resolve) => {
    const protoFileList = [];
    fs.readdir(protoFilePath, (_err, files) => {
      for (var i=0; i<files.length; i++) {
        if (/.proto$/.test(files[i])) protoFileList.push(path.resolve(__dirname, PROTO_FILE_PATH, files[i]));
      } 
      resolve(protoFileList); 
    });
  })
}

async function batchReadFile(list) {
  let cache = {};
  await list.reduce(async (last, next) => {
    const result = await last;
    cache = Object.assign(cache, result);
    return await readSignFile(next);
  }, readSignFile(list[0]));
  return cache;
}

function readSignFile(path) {
  return new Promise(resolve => {
    fs.readFile(path, {
      encoding: 'utf-8',
    }, (__err, code) => {
      console.log(path, 'finish');
      
      root.load(path, { keepCase: true }, (err, bufCode) => {
        if (err) {
          console.log(err);
        }
        if (bufCode) {
          resolve(bufCode.nested);
        } else {
          resolve();
        }
      });
    })
  })
}

getAllFilePath()
  .then(list => {
    return batchReadFile(list);
  })
  .then(data => {
    console.log(data);
  })