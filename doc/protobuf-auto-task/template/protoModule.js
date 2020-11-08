function baseProtoModule(messageContent, cacheContent = {}) {
  const name =
    messageContent.name.indexOf(".") > 0
      ? messageContent.name.split(".")[1]
      : messageContent.name;
  let cacheMessage = cacheContent[name];
  let str = "";
  if (cacheMessage) {
    cacheMessage.forEach((item) => {
      str += `
        message ${item.name} {
          ${item.code}
        }
      `;
    });
  }
  return `
    const messageContent = \`
      message ${messageContent.name} {
        ${messageContent.code}
      }
      ${str}
    \`
    module.exports = {
      type: '${messageContent.name}',
      messageContent,
    }
  `;
}

module.exports = baseProtoModule;
