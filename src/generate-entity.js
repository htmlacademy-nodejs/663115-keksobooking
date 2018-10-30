'use strict';

const random = require(`./utils/random`);

const Param = {
  X_MIN: 300,
  X_MAX: 900,
  Y_MIN: 150,
  Y_MAX: 500,
  PRICE_MIN: 1000,
  PRICE_MAX: 1000000,
  ROOMS_MIN: 1,
  ROOMS_MAX: 5,
  TITLE: [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`],
  TYPE: [`palace`, `flat`, `house`, `bungalo`],
  CHECKIN: [`12:00`, `13:00`, `14:00`],
  CHECKOUT: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
  TIME_MIN_OFFSET: 7 * 24 * 60 * 60 * 1000
};

const generateEntity = (customDate = undefined) => {
  const locationX = random.integer(Param.X_MIN, Param.X_MAX);
  const locationY = random.integer(Param.Y_MIN, Param.Y_MAX);

  return {
    author: {
      avatar: createAvatar()
    },
    offer: {
      title: random.item(Param.TITLE),
      address: locationX + `, ` + locationY,
      price: random.integer(Param.PRICE_MIN, Param.PRICE_MAX),
      type: random.item(Param.TYPE),
      rooms: random.integer(Param.ROOMS_MIN, Param.ROOMS_MAX),
      guests: random.integer(Param.ROOMS_MIN, Param.ROOMS_MAX) * 2,
      checkin: random.item(Param.CHECKIN),
      checkout: random.item(Param.CHECKOUT),
      features: createFeaturesList(),
      description: ``,
      photos: random.sortArray(Param.PHOTOS),
    },
    location: {
      x: locationX,
      y: locationY
    },
    date: parseInt(customDate, 10) || Math.floor((new Date() - Math.random(Param.TIME_MIN_OFFSET)) / 1000)
  };
};

const createAvatar = () => {
  return `https://robohash.org/${Math.random().toString(36).substring(2, 15)}`;
};

const createFeaturesList = () => {
  const featuresData = random.sortArray(Param.FEATURES);
  const featuresSize = random.integer(1, featuresData.length);
  const features = [];
  for (let i = 0; i < featuresSize; i++) {
    features.push(featuresData[i]);
  }
  return features;
};

module.exports = {
  Param,
  generateEntity
};
