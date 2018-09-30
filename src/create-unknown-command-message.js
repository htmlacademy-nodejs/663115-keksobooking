'use strict';

require(`colors`);

const createUnknownCommandMessage = (command, supportedCommands) => (`Неизвестная команда ${command}.
Укажите одну из поддерживаемых команд: ${Object.keys(supportedCommands).map((i) => supportedCommands[i][`name`])}`.red);

module.exports = createUnknownCommandMessage;
