'use strict';

const Message = {
  INFO: `Привет пользователь!
Эта программа будет запускать сервер «Keksobooking».
Автор: Александр Грищенко.`,

  VERSION: `v0.0.1`,

  HELP: `Доступные команды:
--help    — печатает этот текст;
--version — печатает версию приложения;`
};

const createErrorMessage = (command) => (`Неизвестная команда ${command}.
Чтобы прочитать правила использования приложения, наберите "--help"`);

const params = {
  '--version': () => console.log(Message.VERSION),
  '--help': () => console.log(Message.HELP)
};

if (process.argv.length === 2) {
  console.log(Message.INFO);
  process.exit(0);
}

process.argv.slice(2).every((argument) => {
  if (argument in params) {
    params[argument]();
    return false;
  } else {
    console.error(createErrorMessage(argument));
    process.exit(1);
  }
  return true;
});

process.exit(0);
