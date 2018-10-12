'use strict';

require(`colors`);

const Message = {
  AUTHOR: `Александр Грищенко`,
  DESCRIPTION: `Привет пользователь!
Эта программа будет запускать сервер «Keksobooking».
Автор: Александр Грищенко.`,
  HELP: `Доступные команды:`,
  LICENSE: `ISC`,
  VERSION: `v0.0.1`
};

const createUnknownCommandMessage = (command, supportedCommands) => (`Неизвестная команда ${command}.
Укажите одну из поддерживаемых команд: ${Object.keys(supportedCommands).map((i) => supportedCommands[i][`name`])}`.red);

module.exports = {
  Message,
  createUnknownCommandMessage
};
