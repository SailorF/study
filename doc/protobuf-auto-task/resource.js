const BASE_TYPE = [
  "int",
  "int32",
  "int64",
  "float",
  "double",
  "long",
  "short",
  "string",
  "bool",
];

// 获取功能号使用的消息头
// const GET_FUNC_MESSAGE_REG = /@funcid\s+(?<funcid>.+)??[\r|\n][\s|\S]+@descript\s+(?<desc>.+)[\s|\S]+?message/g;
const GET_FUNC_MESSAGE_REG = /@funcid\s+(?<funcid>.+)??[\r|\n][\s|\S]+?@descript\s+(?<descript>.+)??[\r|\n][\s|\S]+?message\s+(?<name>(\w+))[\s|\S]+?{/g;
// 获取所有消息体
// const GET_ALL_MESSAGE_REG = /message (?<name>(\w+))[\s|\S]+?{(?<content>[\s|\S]+?)}/g;
const GET_ALL_MESSAGE_REG = /message (?<name>(\w+))[\s|\S]+?{(?<content>[\s|\S]+?)}/g;

const NEED_CHANGE_NUMBER = [
  "int",
  "int32",
  "int64",
  "float",
  "double",
  "long",
  "short",
];

const PROTO_FILE_PATH = "mtstable_protocol";

module.exports = {
  GET_FUNC_MESSAGE_REG,
  GET_ALL_MESSAGE_REG,
  NEED_CHANGE_NUMBER,
  BASE_TYPE,
  PROTO_FILE_PATH,
};
