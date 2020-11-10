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

module.exports = {
  GET_MESSAGE_REG,
  NEED_CHANGE_NUMBER,
  BASE_TYPE,
};
