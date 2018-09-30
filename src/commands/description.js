'use strict';

const Message = require(`../message`);

module.exports = {
  name: `--description`,
  description: `Показывает описание программы`,
  execute() {
    console.log(Message.DESCRIPTION);
  }
};
