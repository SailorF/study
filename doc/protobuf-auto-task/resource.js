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

const GET_MESSAGE_REG = /@funid (?<funid>\d+)[\s|\S]+?message (?<name>(\w+))[\s|\S]+?{(?<messageContent>[\s|\S]+?)}/g;

const NEED_CHANGE_NUMBER = [
  "int",
  "int32",
  "int64",
  "float",
  "double",
  "long",
  "short",
];

const PROTO_FILE_PATH = 'mtstable_protocol';

module.exports = {
  GET_MESSAGE_REG,
  NEED_CHANGE_NUMBER,
  BASE_TYPE,
  PROTO_FILE_PATH,
};
