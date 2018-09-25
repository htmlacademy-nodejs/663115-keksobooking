const messages = {
  info: `
    Привет пользователь!
    Эта программа будет запускать сервер «Keksobooking».
    Автор: Александр Грищенко.`,

  version: `v0.0.1`,

  help: `
    Доступные команды:
    --help    — печатает этот текст;
    --version — печатает версию приложения;`
};

if (process.argv.length === 2) {
  console.log(messages['info']);

  process.exit(0);

} else if (process.argv.includes('--version')) {
  console.log(messages['version']);

  process.exit(0);

} else if (process.argv.includes('--help')) {
  console.log(messages['help']);

  process.exit(0);

} else {
  console.error(`
    Неизвестная команда ${process.argv[2]}.
    Чтобы прочитать правила использования приложения, наберите "--help"
  `);

  process.exit(1);
};
