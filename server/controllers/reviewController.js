const Review = require('../models/Review');
const { body, validationResult } = require('express-validator');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');



const getAllReviews = async (req, res) => {
  const reviews = await Review.find().sort('-created_at');
  if ((!reviews) || (reviews.length < 1)) return res.status(404).json({ "message": "No reviews found" });
  res.json(reviews);
};


const getReview = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate review ID required" });

  const review = await Review.findOne({ _id: req.params.id }).exec();
  if (!review) {
    return res.status(404).json({ "message": `No review matches the review ID ${req.params.id}` });
  }
  res.json(review);
};


const createReview = [
  body('title')
      .trim()
      .escape(),
  body('details')
      .trim()
      .escape(),
  body('product')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Product is required')
      .escape(),
  body('user')
      .trim()
      .isLength({ min: 1 })
      .withMessage('User is required')
      .escape()
  ,
  async (req, res) => {
    if (req.body?.title) req.body.title;
    if (req.body?.details) req.body.details;
    if (req.body?.product) req.body.product;
    if (req.body?.user) req.body.user;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const review = await Review({
      title: req.body.title,
      details: req.body.details,
      product: req.body.product,
      user: req.body.user
    });

    review.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(201).json(review);
    });
  }
];


const updateReview = [
  body('title')
      .trim()
      .escape(),
  body('details')
      .trim()
      .escape(),
  body('product')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Product is required')
      .escape(),
  body('user')
      .trim()
      .isLength({ min: 1 })
      .withMessage('User is required')
      .escape()
  ,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    };

    const review = await Review.findOne({ _id: req.params.id }).exec();
    if (!review) {
      return res.status(404).json({ "message": `The specified review ${req.body.review} does not match our records` });
    };
    
    if (req.body?.title) review.title = req.body.title;
    if (req.body?.details) review.details = req.body.details;
    if (req.body?.product) review.product = req.body.product;
    if (req.body?.user) review.user = req.body.user;

    const result = await review.save((err) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.json(result);
    });
  }
];


const deleteReview = async (req, res) => {
  if (!req?.params?.id) return res.status(400).json({ "message": "Accurate review required" });

  const review = await Review.findOne({ _id: req.params.id }).exec();
  if (!review) {
    return res.status(404).json({ "message": `No review matches ${req.params.id}` });
  }
  const result = await review.deleteOne();
  res.json(result);
};



module.exports = {
 getAllReviews,
 getReview,
 createReview,
 updateReview,
 deleteReview
};