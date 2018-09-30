'use strict';

const Message = require(`../message`);

module.exports = {
  name: `--help`,
  description: `Выводит помощь`,
  execute(args) {
    console.log(Message.HELP);
    for (let key in args) {
      if (args.hasOwnProperty(key)) {
        console.log(key, args[key].description);
      }
    }
  }
};
