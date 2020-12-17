const { NEED_CHANGE_NUMBER } = require('../resource');

function isNeedChangeNumber(str) {
    if (NEED_CHANGE_NUMBER.includes(str)) return 'number';
    return str;
}

function baseProtoModule(main, childList) {
    const result = writeContent(main, childList, 'message', false);
    return `
    const stringDescriptor = \`
      ${result}
    \`;
    module.exports = {
      type: '${main.name}',
      stringDescriptor,
    }
  `;
}

function baseTypeModule(main, childList, allMsgCache) {
    return `
    /** 功能号 ${main.use || main.funcid} */
    ${writeContent(main, childList, 'interface', allMsgCache, true)}
  `;
}

function writeContent(main, childList, type, allMsgCache = {}, needExport = false) {
    let childStr = '';
    let childExportStr = false;
    let parentExportStr = false;
    if (needExport) {
        childExportStr = true;
        parentExportStr = true;
    }
    for (let i = 0; i < childList.length; i++) {
        childStr += messageContent(childList[i], type, allMsgCache, childExportStr ? 'export' : '');
    }
    return `
    ${messageContent(main, type, allMsgCache, parentExportStr ? 'export default' : '')}
    ${childStr}
  `;
}

function messageContent(message, type, allMsgCache, prefix = '') {
    let splitComman = ',';
    if (type == 'message') {
        splitComman = ';';
    }
    const mainContent = (fields, split) => `
      ${prefix} ${type} ${message.name} {
      ${createMessageContent(fields, split, allMsgCache)}
    }
  `;
    const enumContent = (message, split) => `
      ${prefix} enum ${message.name} {
      ${createEnumContent(message, split)}
    }
  `;
    if (message.fieldsArray) {
        return mainContent(message.fieldsArray, splitComman);
    } else {
        // 如果没有field, 则说明可能是特殊类型, 例如枚举Enum
        return enumContent(message, splitComman);
    }
}

function createMessageContent(list, split, allMsgCache = {}) {
    let str = ``;
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const type = item.type.indexOf('.') >= 0 ? item.type.split('.')[1] : item.type;
        if (split == ',') {
            // 获取消息体content, 以获取注释
            const msgContent = allMsgCache[item.parent.name];
            let note = '';
            if (msgContent) {
                const reg = new RegExp(`${item.name}[\\s|\\S]+?;(?<note>[\\s|\\S]*?\\n)`);
                const getNote = reg.exec(msgContent);
                note = `/** ${getNote && getNote.groups.note.replace(/\/\/|\n|\s/g, '')} */`;
            }
            str += `
        ${note}
        ${item.name}: ${item.rule === 'repeated' ? `Array<${type}>` : isNeedChangeNumber(type)}; \n
      `;
        } else if (split == ';') {
            str += `${item.rule || ''} ${type} ${item.name} = ${item.id}${split} \n`;
        }
    }
    return str;
}

function createEnumContent(enumObj, split) {
    let str = ``;
    for (let [k, v] of Object.entries(enumObj)) {
        // 过滤手动添加属性
        if (k == 'name') continue;
        str += `${k} = ${v}${split} \n`;
    }
    return str;
}

module.exports = {
    baseProtoModule,
    baseTypeModule,
};
