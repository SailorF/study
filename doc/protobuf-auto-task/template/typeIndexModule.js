module.exports = function baseTypeIndexModule(list) {
  let importStr = '';
  let exportStr = '';
  let cache = {};
  for (let i = 0; i < list.length; i++) {
      // 去針
      if (cache[list[i].name]) {
          continue;
      }
      cache[list[i].name] = true;
      importStr += `import * as ${list[i].name} from './${list[i].name}'; \n`;
      exportStr += ` ${list[i].name}, \n`;
  }
  return `
      ${importStr}

      export {
          ${exportStr}
      }
  `;
};
