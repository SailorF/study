function baseApiModule(apiList) {
  let str = "";
  // for (let [k, v] of Object.entries(api)) {
  //   str += `${k.toLocaleUpperCase()}: ${v}, \n`;
  // }
  for (let i = 0; i < apiList.length; i++) {
    const apiItem = apiList[i];
    str += `${apiItem.name.toLocaleUpperCase()}: ${apiItem.funcid}, // ${
      apiItem.descript
    } \n`;
  }
  return `
    module.exports = {
      ${str}
    }
  `;
}

module.exports = baseApiModule;
