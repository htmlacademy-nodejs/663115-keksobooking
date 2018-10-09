'use strict';

const item = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const integer = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const sortArray = (items) => {
  return items.sort(function () {
    return 0.5 - Math.random();
  });
};

module.exports = {
  item,
  integer,
  sortArray
};
