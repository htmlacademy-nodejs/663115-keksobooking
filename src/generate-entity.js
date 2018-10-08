'use strict';

const X_MIN = 300;
const X_MAX = 900;
const Y_MIN = 150;
const Y_MAX = 500;
const PRICE_MIN = 1000;
const PRICE_MAX = 1000000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 5;
const RANGE_FOR_DATES = 7 * 24 * 60 * 60;

const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomSortArray = (ary) => {
  return ary.sort(function () {
    return 0.5 - Math.random();
  });
};

const mockAvatar = () => {
  return `https://robohash.org/${Math.random().toString(36).substring(2, 15)}`;
};

const mockTitle = () => {
  return randomItem([`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`, `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`, `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`]);
};

const mockAddress = (x, y) => {
  return x + `,` + y;
};

const mockPrice = (min, max) => {
  return randomInt(min, max);
};

const mockType = () => {
  return randomItem([`palace`, `flat`, `house`, `bungalo`]);
};

const mockRooms = () => {
  return randomInt(ROOMS_MIN, ROOMS_MAX);
};

const mockGuests = () => {
  return randomInt(ROOMS_MIN, ROOMS_MAX) * 2;
};

const mockCheckin = () => {
  return randomItem([`12:00`, `13:00`, `14:00`]);
};

const mockCheckout = () => {
  return randomItem([`12:00`, `13:00`, `14:00`]);
};

const mockFeatures = () => {
  const featuresData = randomSortArray([`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`]);
  const featuresSize = randomInt(1, featuresData.length);
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
  return randomSortArray([`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]);
};

const mockDate = () => {
  return Math.floor(new Date() / 1000 - Math.random(RANGE_FOR_DATES));
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
      address: mockAddress(locationX, locationY),
      price: mockPrice(PRICE_MIN, PRICE_MAX),
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

module.exports = generateEntity;
