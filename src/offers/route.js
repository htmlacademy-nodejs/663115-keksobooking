'use strict';

const express = require(`express`);
const multer = require(`multer`);

const {generateEntity} = require(`../generate-entity.js`);
const NotFoundError = require(`../errors/not-found-error`);

const offersRouter = new express.Router();
const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

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

offersRouter.post(`/`, jsonParser, upload.single(`author[avatar]`), (req, res) => {
  const body = req.body;
  const avatar = req.file;
  if (avatar) {
    body.author = {avatar: avatar.originalname};
  }
  res.send(body);
});

module.exports = offersRouter;
