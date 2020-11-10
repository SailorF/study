const { BASE_TYPE, NEED_CHANGE_NUMBER } = require("../resource");

const interfaceTReg = new RegExp(
  `(?<type>${BASE_TYPE.join(
    "|"
  )}) (?<key>\\w+)[\\s|\\S]+?;(?<note>[\\s|\\S]*?\n)`,
  "g"
);

function isNeedChangeNumber(str) {
  if (NEED_CHANGE_NUMBER.includes(str)) return "number";
  return str;
}

function flatten(ary) {
  return ary.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : [cur]);
  }, []);
}

function formatBody(msgContent, obj, messageCache) {
  const message = obj[msgContent.name];
  let str = "";
  let childStr = "";
  for (let [k, v] of Object.entries(message)) {
    const msgName = v.type.indexOf(".") > 0 ? v.type.split(".")[1] : v.type;
    if (obj[msgName]) {
      // 递归将消息底下拓展类型输出
      const flatCache = flatten(Object.values(messageCache));
      const msgItem = flatCache.find((item) => item.name == msgName);
      childStr += formatBody(msgItem, obj, messageCache);
    }
    // 添加注释
    const reg = new RegExp(`${k}[\\s|\\S]+?;(?<note>[\\s|\\S]*?\\n)`);
    const getNote = reg.exec(msgContent.code);

    str += `
      /** ${getNote && getNote.groups.note.replace(/\/\/|\n|\s/g, "")} */
      ${k}: ${
      v.rule === "repeated" ? `Array<${msgName}>` : isNeedChangeNumber(msgName)
    };
    `;
  }
  return `interface ${msgContent.name} {
    ${str}
  }
  ${childStr}
  `;
}

function baseTypeModule(messageContent, interfaceObj = {}, messageCache = {}) {
  return `
    /** 功能号 ${messageContent.funid} */
    ${formatBody(messageContent, interfaceObj, messageCache)}

  `;
}

module.exports = baseTypeModule;
