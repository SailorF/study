const basetype = [
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
const plustype = ["GFPB"];
const interfaceTReg = new RegExp(
  `(?<type>${basetype.join(
    "|"
  )}) (?<key>\\w+)[\\s|\\S]+?;(?<note>[\\s|\\S]*?\n)`,
  "g"
);

function getBaseBody(code) {
  let getCode = interfaceTReg.exec(code);
  const interfaceArr = [];
  do {
    interfaceArr.push({
      value: getCode.groups.type,
      key: getCode.groups.key,
      note: getCode.groups.note,
    });
  } while ((getCode = interfaceTReg.exec(code)) !== null);
  return interfaceArr;
}

function formatBody(code) {
  const body = getBaseBody(code);
  const changeNumber = [
    "int",
    "int32",
    "int64",
    "float",
    "double",
    "long",
    "short",
  ];
  return `
    ${body
      .map((item) => {
        return `
        /** ${item.note.replace("//", "")} */
        ${item.key}: ${
          changeNumber.includes(item.value) ? "number" : item.value
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
  if (cacheMessage) {
    cacheMessage.forEach((item) => {
      str += `interface ${item.name} {
        ${formatBody(item.code)}
      };`;
    });
  }
  return `
    interface ${messageContent.name} {
      ${formatBody(messageContent.code)}
    }
    ${str}
  `;
}

module.exports = baseTypeModule;
