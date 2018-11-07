'use strict';

const express = require(`express`);
const multer = require(`multer`);

const NotFoundError = require(`./errors/not-found-error`);
const checkForErrors = require(`./offers-validator`);
const connectAndRead = require(`./connect`);

const offersRouter = new express.Router();
const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

offersRouter.get(`/`, async (req, res) => {
  const offers = await connectAndRead();

  res.send(offers);
});

offersRouter.get(`/:date`, async (req, res) => {
  const date = req.params.date;

  const offers = await connectAndRead();

  const offer = offers.find((item) => item.date >= date);
  if (!offer) {
    throw new NotFoundError(`Not found properities with date ${date}`);
  }

  res.send(offer);
});

offersRouter.post(`/`, jsonParser, upload.single(`author[avatar]`), (req, res) => {
  const {body, file: avatar} = req;
  if (avatar) {
    body.author = {avatar: avatar.originalname};
  }
  const errors = checkForErrors(req.body);
  if (errors.length > 0) {
    // throw new NotFoundError(`You have errors: ${errors}`);
    return res.status(400).send(`You have errors: ${errors}`);
  }
  return res.send(body);
});

module.exports = offersRouter;
