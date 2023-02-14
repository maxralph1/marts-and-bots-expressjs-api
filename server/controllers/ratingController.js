const Rating = require('../models/Rating');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllRatings = async (req, res) => {
  const ratings = await Rating.find().sort('-created_at');
  if ((!ratings) || (ratings.length < 1)) return res.status(404).json({ "message": "No ratings found" });
};


const getRating = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "accurate rating ID required" });

  const rating = await rating.findOne({ _id: req.params.id }).exec();
  if (!rating) {
    return res.status(404).json({ "message": `No rating matches the rating ID ${req.params.id}` });
  }
  res.json(rating);
};


const createRating = [
  body('stars')
      .trim()
      .escape(),
  body('product')
      .trim()
      .escape(),
  body('users')
      .trim()
      .escape()
  ,
  async (req, res) => {
    if (req.body?.stars) req.body.stars;
    if (req.body?.product) req.body.product;
    if (req.body?.user) req.body.user;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const rating = await new Rating({
      stars: req.body.stars,
      product: req.body.product,
      user: req.body.user
    });

    rating.save((err) => {
      if (err) {
        res.status(400).json(err);
      }
      res.status(201).json(rating);
    });
  }
];


const updateRating = [
  body('stars')
      .trim()
      .escape(),
  body('product')
      .trim()
      .escape(),
  body('users')
      .trim()
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const rating = await Rating.findOne({ _id: req.params.id }).exec();
    if (!rating) {
      res.status(404).json({ "message": `The specified rating ${req.params.id} does not match our records` });
    };

    if (req.body?.stars) rating.stars = req.body.stars;
    if (req.body?.product) rating.product = req.body.product;
    if (req.body?.user) rating.user = req.body.user;

    const result = await rating.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteRating = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate rating required" });

  const rating = await Rating.findOne({ _id: req.params.id }).exec();
  if (!rating) {
    return res.status(404).json({ "message": `No rating matches ${req.params.id}` });
  }
  const result = await rating.deleteOne();
  res.json(result);
};



module.exports = {
 getAllRatings,
 getRating,
 createRating,
 updateRating,
 deleteRating
};