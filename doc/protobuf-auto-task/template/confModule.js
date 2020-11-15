function baseConfModule(apiList) {
  let str = "";
  let importStr = "";
  let hadRequire = {};
  for (let i = 0; i < apiList.length; i++) {
    const apiItem = apiList[i];
    if (!hadRequire[apiItem.realName]) {
      hadRequire[apiItem.realName] = true;
      importStr += `const ${apiItem.realName.toLocaleLowerCase()} = require('../proto/${
        apiItem.realName
      }.js'); \n`;
    }

    str += `[FUNAPI.${apiItem.name.toLocaleUpperCase()}]: cls(${apiItem.realName.toLocaleLowerCase()}), \n`;
  }
  return `
    const FUNAPI = require('./FUNAPI.ts');
    ${importStr}

    function cls(s) {
      return s;
    }
    module.exports = {
      ${str}
    }
  `;
}

module.exports = baseConfModule;
