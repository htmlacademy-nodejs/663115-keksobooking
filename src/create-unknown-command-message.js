'use strict';

const createUnknownCommandMessage = (command, supportedCommands) => (`Неизвестная команда ${command}.
Укажите одну из поддерживаемых команд: ${supportedCommands}`);

module.exports = createUnknownCommandMessage;
