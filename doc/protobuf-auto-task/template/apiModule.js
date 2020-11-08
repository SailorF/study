function baseApiModule(api) {
  let str = "";
  for (let [k, v] of Object.entries(api)) {
    str += `${k.toLocaleUpperCase()}: ${v}, \n`;
  }
  return `
    module.exports = {
      ${str}
    }
  `;
}

module.exports = baseApiModule;
