'use strict';

const express = require(`express`);
const multer = require(`multer`);

const OfferStore = require(`./store`);
const NotFoundError = require(`../errors/not-found-error`);
const checkForErrors = require(`./validator`);
const connectAndRead = require(`../connect`);

const PAGE_DEFAULT_LIMIT = 10;

const offersRouter = new express.Router();
const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const toPage = async (cursor, skip = 0, limit = PAGE_DEFAULT_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();

  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

offersRouter.get(`/`, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip || 0, 10);
  const limit = parseInt(req.query.limit || PAGE_DEFAULT_LIMIT, 10);
  if (isNaN(skip) || isNaN(limit)) {
    throw new NotFoundError(`Illegal argument error here`); // tmp
  }
  res.send(await toPage(await OfferStore.getAllOffers(), skip, limit));
}));

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
