'use strict';

const randomItem = require(`random-item`);
const randomInt = require(`random-int`);

const X_MIN = 300;
const X_MAX = 900;
const Y_MIN = 150;
const Y_MAX = 500;


const mockAvatar = () => {
  return `https://robohash.org/${Math.random().toString(36).substring(2, 15)}`;
};

const mockTitle = () => {
  return randomItem([`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`]);
};

const mockAddress = (x, y) => {
  return x + `,` + y;
};

const generateEntity = () => {
  const locationX = randomInt(X_MIN, X_MAX);
  const locationY = randomInt(Y_MIN, Y_MAX);

  return {
    author: {
      avatar: mockAvatar()
    },
    offer: {
      title: mockTitle(),
      address: mockAddress(locationX, locationY)
    }
  };
};

module.exports = generateEntity;
