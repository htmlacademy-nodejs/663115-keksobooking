'use strict';

const express = require(`express`);
const {generateEntity} = require(`../generate-entity.js`);
const NotFoundError = require(`../errors/not-found-error`);

const offersRouter = new express.Router();

const generateOffers = (date, count = 1) => {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(generateEntity(date));
  }
  return elements;
};

offersRouter.get(`/`, (req, res) => {
  res.send(generateOffers());
});

offersRouter.get(`/:date`, (req, res) => {
  const date = req.params.date;
  const offers = generateOffers(date);

  const offer = offers.find((item) => item.date >= date);
  if (!offer) {
    throw new NotFoundError(`Not found properities with date ${date}`);
  }

  res.send(offer);
});

module.exports = offersRouter;
