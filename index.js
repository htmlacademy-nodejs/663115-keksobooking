const message = {
  INFO: `
    Привет пользователь!
    Эта программа будет запускать сервер «Keksobooking».
    Автор: Александр Грищенко.`,

  VERSION: `v0.0.1`,

  HELP: `
    Доступные команды:
    --help    — печатает этот текст;
    --version — печатает версию приложения;`,

  error: (command) => (`
    Неизвестная команда ${command}.
    Чтобы прочитать правила использования приложения, наберите "--help"
  `)
};

if (process.argv.length === 2) {
  console.log(message.INFO);

  process.exit(0);

} else if (process.argv.includes('--version')) {
  console.log(message.VERSION);

  process.exit(0);

} else if (process.argv.includes('--help')) {
  console.log(message.HELP);

  process.exit(0);

} else {
  console.error(message.error(process.argv[2]));

  process.exit(1);
};
