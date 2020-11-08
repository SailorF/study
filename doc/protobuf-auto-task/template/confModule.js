function baseConfModule(api) {
  let str = "";
  let importStr = "";
  for (let k of Object.keys(api)) {
    importStr += `const ${k.toLocaleLowerCase()} = require('../proto/${k}.js'); \n`;
    str += `[FUNAPI.${k.toLocaleUpperCase()}]: cls(${k.toLocaleLowerCase()}), \n`;
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
