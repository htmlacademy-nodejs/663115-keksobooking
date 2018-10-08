'use strict';

const item = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const integer = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const sortArray = (ary) => {
  return ary.sort(function () {
    return 0.5 - Math.random();
  });
};

module.exports = {
  item,
  integer,
  sortArray
};
