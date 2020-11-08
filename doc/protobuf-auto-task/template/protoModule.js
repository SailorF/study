function baseProtoModule(messageContent, cacheContent = {}) {
  let cacheMessage = cacheContent[messageContent.name];
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
