function baseConfModule(apiList) {
  let str = '';
  let importStr = '';
  let hadRequire = {};
  for (let i = 0; i < apiList.length; i++) {
      const apiItem = apiList[i];
      if (!hadRequire[apiItem.realName]) {
          hadRequire[apiItem.realName] = true;
          importStr += `const ${apiItem.realName.toLocaleLowerCase()} = require('../proto/${apiItem.realName}.js'); \n`;
      }

      str += `[FUNAPI.${apiItem.name.toLocaleUpperCase()}]: createPbjsCls(${apiItem.realName.toLocaleLowerCase()}), \n`;
  }
  return `
  import FUNAPI from './FUNAPI';
  const protobuf = require("../../protocol-buffers");
  ${importStr}

  function createPbjsCls({ stringDescriptor, type }) {
    return protobuf(stringDescriptor)[type];
  }
  export default {
    ${str}
  }
`;
}

module.exports = baseConfModule;
