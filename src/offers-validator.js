'use strict';

const matchingObject = {
  avatar: (value) => {
    // return value.match(/^https:\/\/robohash.org\/[a-z0-9]+$/);
    return value.length > 0;
  },
  name: (value) => {
    return value.length > 0;
  },
  title: (value) => {
    return value.length > 0;
  },
  address: (value) => {
    return value.indexOf(`,`) > 0;
  },
  description: (value) => {
    return value.length > 0;
  },
  price: (value) => {
    return value > 0;
  },
  type: (value) => {
    return value.length > 0;
  },
  rooms: (value) => {
    return value > 0;
  },
  guests: (value) => {
    return value > 0;
  },
  checkin: (value) => {
    return value.length > 0;
  },
  checkout: (value) => {
    return value.length > 0;
  },
  features: (value) => {
    return value.length > 0;
  }
};

const validate = (value, key) => {
  const result = matchingObject[key](value);
  if (result) {
    return null;
  }
  return `${key} field is have errors`;
};

const checkForErrors = (offer) => {
  const errors = [];
  for (let key in offer) {
    if (typeof offer[key] === `object`) {
      const currentErrors = checkForErrors(offer[key]);
      if (currentErrors.length > 0) {
        errors.push(...currentErrors);
      }
    } else {
      const validationError = validate(offer[key], key); // -> null | {validate_error}
      if (validationError) {
        errors.push(validationError);
      }
    }
  }
  return errors;
};

module.exports = checkForErrors;
