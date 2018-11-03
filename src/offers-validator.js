'use strict';

const matchingObject = {
  avatar: (value) => {
    return value.match(/^https:\/\/robohash.org\/[a-z0-9]+$/);
  }
};

const validate = (value, key) => {
  const result = matchingObject[key](value);
  if (result) {
    return null;
  }
  return `${key} field is have errors`;
};

const recursive = (offer) => {
  const errors = [];
  for (let key in offer) {
    if (typeof offer[key] === `object`) {
      const currentErrors = recursive(offer[key]);
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
