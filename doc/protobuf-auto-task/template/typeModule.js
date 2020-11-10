const { BASE_TYPE, NEED_CHANGE_NUMBER } = require("../resource");

const interfaceTReg = new RegExp(
  `(?<type>${BASE_TYPE.join(
    "|"
  )}) (?<key>\\w+)[\\s|\\S]+?;(?<note>[\\s|\\S]*?\n)`,
  "g"
);

function getBaseBody(code) {
  let getCode = interfaceTReg.exec(code);
  const interfaceArr = [];
  if (getCode) {
    do {
      interfaceArr.push({
        value: getCode.groups.type,
        key: getCode.groups.key,
        note: getCode.groups.note,
      });
    } while ((getCode = interfaceTReg.exec(code)) !== null);
  }
  return interfaceArr;
}

function formatBody(code) {
  const body = getBaseBody(code);
  return `
    ${body
      .map((item) => {
        return `/** ${item.note.replace(/\/\/|\n|\s/g, "")} */
        ${item.key}: ${
          NEED_CHANGE_NUMBER.includes(item.value) ? "number" : item.value
        };
      `;
      })
      .join("\n")
      .trim()}
  `;
}

function baseTypeModule(messageContent, cacheContent = {}) {
  const name =
    messageContent.name.indexOf(".") > 0
      ? messageContent.name.split(".")[1]
      : messageContent.name;
  let cacheMessage = cacheContent[name];
  let str = "";
  let parentStr = "";
  if (cacheMessage) {
    cacheMessage.forEach((item) => {
      parentStr += `
        ${item.key}: ${
        item.rule === "repeated" ? `Array<${item.name}>` : item.name
      };
      `;
      str += `interface ${item.name} {
        ${formatBody(item.code)}
      };`;
    });
  }
  return `
    /** 功能号 ${messageContent.funid} */
    interface ${messageContent.name} {
      ${formatBody(messageContent.code)}

      ${parentStr}
    }
    ${str}
  `;
}

module.exports = baseTypeModule;
