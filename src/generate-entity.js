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
  TIME_MIN_OFFSET: 7 * 24 * 60 * 60
};


const generateEntity = () => {
  const locationX = random.integer(Param.X_MIN, Param.X_MAX);
  const locationY = random.integer(Param.Y_MIN, Param.Y_MAX);

  return {
    author: {
      avatar: mockAvatar()
    },
    offer: {
      title: mockTitle(),
      address: mockAddress(locationX, locationY),
      price: mockPrice(Param.PRICE_MIN, Param.PRICE_MAX),
      type: mockType(),
      rooms: mockRooms(),
      guests: mockGuests(),
      checkin: mockCheckin(),
      checkout: mockCheckout(),
      features: mockFeatures(),
      description: mockDescription(),
      photos: mockPhotos()
    },
    location: {
      x: locationX,
      y: locationY
    },
    date: mockDate()
  };
};


const mockAvatar = () => {
  return `https://robohash.org/${Math.random().toString(36).substring(2, 15)}`;
};

const mockTitle = () => {
  return random.item(Param.TITLE);
};

const mockAddress = (x, y) => {
  return x + `,` + y;
};

const mockPrice = (min, max) => {
  return random.integer(min, max);
};

const mockType = () => {
  return random.item(Param.TYPE);
};

const mockRooms = () => {
  return random.integer(Param.ROOMS_MIN, Param.ROOMS_MAX);
};

const mockGuests = () => {
  return random.integer(Param.ROOMS_MIN, Param.ROOMS_MAX) * 2;
};

const mockCheckin = () => {
  return random.item(Param.CHECKIN);
};

const mockCheckout = () => {
  return random.item(Param.CHECKOUT);
};

const mockFeatures = () => {
  const featuresData = random.sortArray(Param.FEATURES);
  const featuresSize = random.integer(1, featuresData.length);
  let features = [];
  for (let i = 0; i < featuresSize; i++) {
    features.push(featuresData[i]);
  }
  return features;
};

const mockDescription = () => {
  return ``;
};

const mockPhotos = () => {
  return random.sortArray(Param.PHOTOS);
};

const mockDate = () => {
  return Math.floor(new Date() / 1000 - Math.random(Param.TIME_MIN_OFFSET));
};


module.exports = {
  Param,
  generateEntity
};
